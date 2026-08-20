// Edge Function: razorpay-create-order
// Creates a Razorpay order server-side using the KEY SECRET (never exposed to
// the browser). Returns the Razorpay order id, which the frontend passes to
// Checkout so the payment can be signature-verified afterwards.
//
// Secrets required (supabase secrets set ...):
//   RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET

const KEY_ID = Deno.env.get("RAZORPAY_KEY_ID") ?? "";
const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET") ?? "";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (!KEY_ID || !KEY_SECRET) return json({ error: "Razorpay keys not set" }, 500);

  try {
    const { amount, receipt } = await req.json(); // amount in paise
    if (!Number.isInteger(amount) || amount <= 0) {
      return json({ error: "Invalid amount" }, 400);
    }

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${KEY_ID}:${KEY_SECRET}`),
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: receipt ?? `rcpt_${Date.now()}`,
      }),
    });

    const data = await res.json();
    if (!res.ok) return json({ error: data }, 400);

    return json({
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
      keyId: KEY_ID,
    });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
