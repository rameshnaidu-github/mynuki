import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";
import { inr } from "../data/catalog";
import { buildLines, summarize, SHIPPING_FREE_OVER } from "../lib/cart";
import { createOrder, type ShippingInfo } from "../lib/orders";
import { sendOrderEmail } from "../lib/email";
import {
  isRazorpayConfigured,
  openCheckout,
  createServerOrder,
  verifyPayment,
} from "../lib/razorpay";

const empty: ShippingInfo = {
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

export default function Checkout() {
  const { user } = useAuth();
  const { items, clear } = useCart();
  const navigate = useNavigate();

  const lines = useMemo(() => buildLines(items), [items]);
  const { subtotal, shipping, total } = summarize(lines);

  const [form, setForm] = useState<ShippingInfo>({
    ...empty,
    fullName: (user?.user_metadata?.full_name as string) || "",
  });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (lines.length === 0) {
    return (
      <section className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl">Your cart is empty</h1>
        <button onClick={() => navigate("/shop")} className="btn-primary mt-6">Browse the shop</button>
      </section>
    );
  }

  function set<K extends keyof ShippingInfo>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): string | null {
    if (!form.fullName.trim()) return "Please enter your name.";
    if (!/^\d{10}$/.test(form.phone)) return "Enter a valid 10-digit phone number.";
    if (!form.line1.trim()) return "Please enter your address.";
    if (!form.city.trim() || !form.state.trim()) return "Please enter your city and state.";
    if (!/^\d{6}$/.test(form.pincode)) return "Enter a valid 6-digit pincode.";
    return null;
  }

  async function placeOrder(status: "paid" | "pending", paymentId: string | null) {
    if (!supabase || !user) {
      setError("You need to be logged in to place an order.");
      setBusy(false);
      return;
    }
    const snapshot = lines.map((l) => ({
      slug: l.product.slug,
      name: l.product.name,
      price: l.product.price,
      qty: l.qty,
    }));
    const { data, error: err } = await createOrder(supabase, {
      userId: user.id,
      items: snapshot,
      total,
      shipping: form,
      status,
      paymentId,
    });
    setBusy(false);
    if (err || !data) {
      setError(err || "Could not place the order.");
      return;
    }
    // Order-confirmation email (no-ops until the email function is configured).
    if (user?.email) {
      void sendOrderEmail(supabase, {
        to: user.email,
        name: form.fullName,
        orderId: data.id,
        items: snapshot,
        total,
      });
    }
    clear();
    navigate(`/order/${data.id}`, { replace: true });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setBusy(true);

    if (!isRazorpayConfigured) {
      // Demo mode — no Razorpay key yet. Place a test order without payment.
      await placeOrder("paid", "demo");
      return;
    }

    try {
      // Secure flow: ask the Edge Function for a Razorpay order id. If the
      // functions aren't deployed yet, this returns null and we fall back to a
      // key-only test checkout (no server-side signature verification).
      const server = supabase
        ? await createServerOrder(supabase, total, `mynuki_${Date.now()}`)
        : null;

      await openCheckout({
        amountInr: total,
        name: form.fullName,
        email: user?.email ?? "",
        contact: form.phone,
        razorpayOrderId: server?.orderId,
        keyId: server?.keyId,
        onSuccess: async ({ paymentId, orderId, signature }) => {
          // When we have a server order, verify the signature before trusting it.
          if (server && orderId && signature && supabase) {
            const valid = await verifyPayment(supabase, {
              razorpay_order_id: orderId,
              razorpay_payment_id: paymentId,
              razorpay_signature: signature,
            });
            if (!valid) {
              setError("Payment could not be verified. You were not charged.");
              setBusy(false);
              return;
            }
          }
          await placeOrder("paid", paymentId);
        },
        onDismiss: () => setBusy(false),
      });
    } catch (err) {
      setBusy(false);
      setError(err instanceof Error ? err.message : "Payment could not start.");
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl">Checkout</h1>

      {!isRazorpayConfigured && (
        <p className="mt-5 text-sm bg-butter/70 text-forestdeep rounded-xl px-4 py-3 max-w-2xl">
          Demo mode — add your Razorpay test key to take real test payments. For now,
          placing an order records it without a payment step.
        </p>
      )}

      <form onSubmit={onSubmit} className="mt-8 grid lg:grid-cols-[1fr_320px] gap-10 items-start">
        {/* shipping form */}
        <div>
          <h2 className="text-xl">Shipping details</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <Field label="Full name" className="sm:col-span-2">
              <input className="input" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} autoComplete="name" />
            </Field>
            <Field label="Phone (10 digits)">
              <input className="input" value={form.phone} inputMode="numeric" onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
            </Field>
            <Field label="Pincode">
              <input className="input" value={form.pincode} inputMode="numeric" onChange={(e) => set("pincode", e.target.value)} autoComplete="postal-code" />
            </Field>
            <Field label="Address line 1" className="sm:col-span-2">
              <input className="input" value={form.line1} onChange={(e) => set("line1", e.target.value)} autoComplete="address-line1" />
            </Field>
            <Field label="Address line 2 (optional)" className="sm:col-span-2">
              <input className="input" value={form.line2} onChange={(e) => set("line2", e.target.value)} autoComplete="address-line2" />
            </Field>
            <Field label="City">
              <input className="input" value={form.city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level2" />
            </Field>
            <Field label="State">
              <input className="input" value={form.state} onChange={(e) => set("state", e.target.value)} autoComplete="address-level1" />
            </Field>
          </div>
        </div>

        {/* summary */}
        <aside className="bg-card border border-line rounded-2xl p-6 lg:sticky lg:top-24">
          <h2 className="text-xl">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {lines.map((l) => (
              <li key={l.product.slug} className="flex justify-between gap-3 text-sm">
                <span className="text-inksoft">
                  {l.product.name} <span className="text-muted">× {l.qty}</span>
                </span>
                <span className="tabular-nums shrink-0">{inr(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 pt-4 border-t border-line space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-inksoft">Subtotal</dt><dd className="tabular-nums">{inr(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-inksoft">Shipping</dt><dd className="tabular-nums">{shipping === 0 ? "Free" : inr(shipping)}</dd></div>
            {shipping > 0 && <p className="text-xs text-muted">Free shipping over {inr(SHIPPING_FREE_OVER)}.</p>}
          </dl>
          <div className="mt-4 pt-4 border-t border-line flex justify-between items-baseline">
            <span className="font-medium">Total</span>
            <span className="text-xl font-semibold tabular-nums">{inr(total)}</span>
          </div>

          {error && <p role="alert" className="mt-4 text-sm text-clay">{error}</p>}

          <button type="submit" disabled={busy} className="btn-primary w-full mt-5 disabled:opacity-60">
            {busy ? "Processing…" : isRazorpayConfigured ? `Pay ${inr(total)}` : `Place order · ${inr(total)}`}
          </button>
          <p className="text-xs text-muted text-center mt-3">Secured by Razorpay · test mode</p>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="block text-sm font-medium text-inksoft mb-1.5">{label}</span>
      {children}
    </label>
  );
}
