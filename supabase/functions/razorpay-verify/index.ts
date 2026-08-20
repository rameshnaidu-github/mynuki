// Edge Function: razorpay-verify
// Verifies a Razorpay payment signature server-side (HMAC-SHA256 with the KEY
// SECRET). Returns { valid: boolean }. The frontend only records an order as
// paid once this returns valid — so a client can't fake a successful payment.
//
// Secret required: RAZORPAY_KEY_SECRET

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

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (!KEY_SECRET) return json({ error: "Razorpay secret not set" }, 500);

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return json({ valid: false, error: "Missing fields" }, 400);
    }

    const expected = await hmacSha256Hex(
      KEY_SECRET,
      `${razorpay_order_id}|${razorpay_payment_id}`
    );
    // Constant-time-ish compare (lengths are fixed hex strings here).
    const valid = expected === razorpay_signature;
    return json({ valid });
  } catch (e) {
    return json({ valid: false, error: String(e) }, 500);
  }
});
