import type { SupabaseClient } from "@supabase/supabase-js";

export interface OrderItemSnapshot {
  slug: string;
  name: string;
  price: number;
  qty: number;
}

export interface ShippingInfo {
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderRow {
  id: string;
  status: string;
  total_amount: number;
  currency: string;
  items: OrderItemSnapshot[];
  shipping: ShippingInfo;
  payment_id: string | null;
  created_at: string;
}

export async function createOrder(
  supabase: SupabaseClient,
  input: {
    userId: string;
    items: OrderItemSnapshot[];
    total: number;
    shipping: ShippingInfo;
    status: "paid" | "pending";
    paymentId?: string | null;
  }
): Promise<{ data: OrderRow | null; error: string | null }> {
  const { data, error } = await supabase
    .from("orders")
    .insert({
      user_id: input.userId,
      status: input.status,
      total_amount: input.total,
      currency: "INR",
      items: input.items,
      shipping: input.shipping,
      payment_id: input.paymentId ?? null,
    })
    .select()
    .single();

  return { data: (data as OrderRow) ?? null, error: error?.message ?? null };
}

export async function listOrders(
  supabase: SupabaseClient,
  userId: string
): Promise<OrderRow[]> {
  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return (data as OrderRow[]) ?? [];
}
