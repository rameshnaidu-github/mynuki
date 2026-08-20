// Edge Function: send-order-email
// Sends a branded order-confirmation email via Resend (https://resend.com).
// No-ops (sent:false, skipped:true) until configured, so the app works without it.
//
// Secrets required to activate:
//   RESEND_API_KEY        — from resend.com
//   ORDER_EMAIL_FROM      — e.g. "MyNuki <orders@yourdomain.com>" (verified sender)
//                           (defaults to Resend's onboarding sender for testing)

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const FROM = Deno.env.get("ORDER_EMAIL_FROM") ?? "MyNuki <onboarding@resend.dev>";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}
const esc = (s: string) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
const inr = (n: number) => "₹" + Number(n).toLocaleString("en-IN");

interface Item { name: string; price: number; qty: number }

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (!RESEND_API_KEY) return json({ sent: false, skipped: true });

  try {
    const { to, name, orderId, items, total } = await req.json();
    if (!to || !orderId || !Array.isArray(items)) return json({ sent: false, error: "Missing fields" }, 400);

    const ref = String(orderId).slice(0, 8).toUpperCase();
    const rows = (items as Item[])
      .map(
        (i) =>
          `<tr><td style="padding:6px 0;color:#2a2a24">${esc(i.name)} × ${i.qty}</td>` +
          `<td align="right" style="padding:6px 0;color:#2a2a24">${inr(i.price * i.qty)}</td></tr>`
      )
      .join("");

    const html = `
      <div style="font-family:Helvetica,Arial,sans-serif;background:#f4f0e8;padding:32px">
        <div style="max-width:520px;margin:0 auto;background:#fbf9f3;border:1px solid #e4ddce;border-radius:16px;padding:28px">
          <div style="font-family:Georgia,serif;font-size:26px;color:#2e3d31">MyNuki</div>
          <h1 style="font-family:Georgia,serif;font-size:22px;color:#2e3d31;margin:18px 0 4px">Thank you${name ? ", " + esc(name) : ""} — happy making!</h1>
          <p style="color:#615c51;font-size:14px;margin:0 0 18px">Your order <b>${ref}</b> is confirmed. We'll email you again when it ships.</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;border-top:1px solid #e4ddce">${rows}</table>
          <table style="width:100%;border-collapse:collapse;font-size:15px;border-top:1px solid #e4ddce;margin-top:6px">
            <tr><td style="padding:10px 0;font-weight:bold;color:#2a2a24">Total</td>
            <td align="right" style="padding:10px 0;font-weight:bold;color:#2a2a24">${inr(total)}</td></tr>
          </table>
          <p style="color:#918b7d;font-size:12px;margin-top:18px">Little worlds, made by hand.</p>
        </div>
      </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to, subject: `Your MyNuki order ${ref}`, html }),
    });
    const data = await res.json();
    return json(res.ok ? { sent: true, id: data.id } : { sent: false, error: data }, res.ok ? 200 : 400);
  } catch (e) {
    return json({ sent: false, error: String(e) }, 500);
  }
});
