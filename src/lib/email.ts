import type { SupabaseClient } from "@supabase/supabase-js";
import type { OrderItemSnapshot } from "./orders";

/**
 * Fire-and-forget order-confirmation email via the send-order-email Edge Function.
 * Safe to call always — the function no-ops until RESEND_API_KEY is configured,
 * and any failure here must never block the order.
 */
export async function sendOrderEmail(
  supabase: SupabaseClient,
  payload: {
    to: string;
    name: string;
    orderId: string;
    items: OrderItemSnapshot[];
    total: number;
  }
): Promise<void> {
  try {
    await supabase.functions.invoke("send-order-email", { body: payload });
  } catch {
    // Non-blocking: the order is already placed.
  }
}
