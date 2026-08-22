import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import PageBand from "../components/PageBand";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { categories } from "../data/catalog";

export default function Customize() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: (user?.user_metadata?.full_name as string) || "",
    email: user?.email || "",
    phone: "",
    category: "",
    budget: "",
    details: "",
  });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prefill name/email once auth resolves (session loads async after mount).
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      ...f,
      name: f.name || (user.user_metadata?.full_name as string) || "",
      email: f.email || user.email || "",
    }));
  }, [user]);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.email.trim() || !form.details.trim()) {
      setError("Please fill in your name, email, and what you have in mind.");
      return;
    }
    setBusy(true);
    if (supabase) {
      const { error: err } = await supabase.from("customization_requests").insert({
        user_id: user?.id ?? null,
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        category: form.category || null,
        budget: form.budget || null,
        details: form.details,
      });
      setBusy(false);
      if (err) {
        setError("Couldn’t submit just now — please try again in a moment.");
        return;
      }
    } else {
      setBusy(false);
    }
    setDone(true);
  }

  if (done) {
    return (
      <section className="max-w-xl mx-auto px-6 py-20 md:py-28 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-peach flex items-center justify-center text-flame">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-4xl mt-5">Request received</h1>
        <p className="mt-3 text-inksoft font-light">
          Thank you — we’ll look over your idea and email you a quote soon.
        </p>
        <Link to="/shop" className="btn-primary mt-7">Back to the shop</Link>
      </section>
    );
  }

  return (
    <div>
      <PageBand eyebrow="Make It Yours" title="Request a custom piece" blurb="Tell us the piece, the palette and the occasion — we’ll design it, print it and quote you before you pay." />
      <div className="max-w-2xl mx-auto px-6 py-12">


      <form onSubmit={onSubmit} className="mt-10 bg-card border border-line rounded-2xl p-7 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Your name">
            <input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
          </Field>
          <Field label="Email">
            <input className="input" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
          </Field>
          <Field label="Phone (optional)">
            <input className="input" value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
          </Field>
          <Field label="Interested in (optional)">
            <select className="input" value={form.category} onChange={(e) => set("category", e.target.value)}>
              <option value="">Any category</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Budget (optional)" className="sm:col-span-2">
            <select className="input" value={form.budget} onChange={(e) => set("budget", e.target.value)}>
              <option value="">No preference</option>
              <option value="under-1500">Under ₹1,500</option>
              <option value="1500-3000">₹1,500 – ₹3,000</option>
              <option value="3000-6000">₹3,000 – ₹6,000</option>
              <option value="6000-plus">₹6,000+</option>
            </select>
          </Field>
        </div>
        <Field label="What would you like us to make?">
          <textarea
            className="input min-h-32 resize-y"
            value={form.details}
            onChange={(e) => set("details", e.target.value)}
            placeholder="Describe the scene, colours, size, or any personal touches. Feel free to mention a kit you'd like as a starting point."
          />
        </Field>

        {error && <p role="alert" className="text-sm text-berry">{error}</p>}

        <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
          {busy ? "Sending…" : "Send request"}
        </button>
        <p className="text-xs text-muted text-center">No payment now — we’ll email you a quote first.</p>
      </form>
      </div>
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