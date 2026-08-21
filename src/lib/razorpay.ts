// Razorpay integration.
//
// Secure production flow (when the Edge Functions are deployed):
//   1. razorpay-create-order  → create a Razorpay order server-side (uses secret)
//   2. Checkout opens with that order_id
//   3. razorpay-verify        → verify the payment signature server-side
//   4. only then is the order recorded as paid
//
// If the functions aren't deployed yet, createServerOrder() returns null and the
// caller falls back to a key-only test checkout (no order_id, no verification).
// The Key SECRET never touches this file or the browser.

import type { SupabaseClient } from "@supabase/supabase-js";

export const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID as
  | string
  | undefined;

export const isRazorpayConfigured = Boolean(razorpayKeyId);

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number; // paise
  currency: string;
  name: string;
  description?: string;
  order_id?: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
  }) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

let scriptPromise: Promise<boolean> | null = null;

export function loadRazorpay(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true);
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
  return scriptPromise;
}

/** Ask the Edge Function to create a Razorpay order. null if not deployed/failed. */
export async function createServerOrder(
  supabase: SupabaseClient,
  amountInr: number,
  receipt: string
): Promise<{ orderId: string; keyId: string } | null> {
  try {
    const { data, error } = await supabase.functions.invoke("razorpay-create-order", {
      body: { amount: Math.round(amountInr * 100), receipt },
    });
    if (error || !data?.orderId) return null;
    return { orderId: data.orderId, keyId: data.keyId ?? razorpayKeyId! };
  } catch {
    return null;
  }
}

/** Verify a payment signature via the Edge Function. */
export async function verifyPayment(
  supabase: SupabaseClient,
  payload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke("razorpay-verify", {
      body: payload,
    });
    return !error && data?.valid === true;
  } catch {
    return false;
  }
}

interface OpenCheckoutArgs {
  amountInr: number;
  name: string;
  email: string;
  contact: string;
  razorpayOrderId?: string;
  keyId?: string;
  onSuccess: (r: {
    paymentId: string;
    orderId?: string;
    signature?: string;
  }) => void;
  onDismiss?: () => void;
}

/** Opens the Razorpay checkout. Throws if the SDK can't load. */
export async function openCheckout(args: OpenCheckoutArgs): Promise<void> {
  const key = args.keyId ?? razorpayKeyId;
  if (!key) throw new Error("Razorpay key not configured");
  const ok = await loadRazorpay();
  if (!ok || !window.Razorpay) throw new Error("Couldn’t load Razorpay");

  const options: RazorpayOptions = {
    key,
    amount: Math.round(args.amountInr * 100),
    currency: "INR",
    name: "Dabble & Dahlia",
    description: "DIY kit order",
    prefill: { name: args.name, email: args.email, contact: args.contact },
    theme: { color: "#f4531f" },
    handler: (res) =>
      args.onSuccess({
        paymentId: res.razorpay_payment_id,
        orderId: res.razorpay_order_id,
        signature: res.razorpay_signature,
      }),
    modal: { ondismiss: () => args.onDismiss?.() },
  };
  if (args.razorpayOrderId) options.order_id = args.razorpayOrderId;

  new window.Razorpay(options).open();
}
