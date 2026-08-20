import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { inr } from "../data/catalog";
import type { OrderRow } from "../lib/orders";

export default function OrderConfirmation() {
  const { id = "" } = useParams();
  const [order, setOrder] = useState<OrderRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data } = await supabase.from("orders").select("*").eq("id", id).single();
      if (active) {
        setOrder((data as OrderRow) ?? null);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <section className="max-w-xl mx-auto px-6 py-16 md:py-24 text-center">
      <div className="mx-auto w-14 h-14 rounded-full bg-foresttint flex items-center justify-center text-forest">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="eyebrow mt-5 inline-block">Order placed</span>
      <h1 className="text-4xl mt-2">Thank you — happy making!</h1>
      <p className="mt-3 text-inksoft font-light">
        We’ve received your order. A confirmation will reach your inbox shortly.
      </p>

      {loading ? (
        <p className="mt-8 text-muted">Loading your order…</p>
      ) : order ? (
        <div className="mt-8 bg-card border border-line rounded-2xl p-6 text-left">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-muted">Order</span>
            <span className="text-sm font-mono">{order.id.slice(0, 8).toUpperCase()}</span>
          </div>
          <ul className="mt-4 space-y-2 border-t border-line pt-4">
            {order.items.map((it) => (
              <li key={it.slug} className="flex justify-between text-sm">
                <span className="text-inksoft">{it.name} <span className="text-muted">× {it.qty}</span></span>
                <span className="tabular-nums">{inr(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-line flex justify-between items-baseline">
            <span className="font-medium">Total paid</span>
            <span className="text-lg font-semibold tabular-nums">{inr(order.total_amount)}</span>
          </div>
          <div className="mt-2 text-xs text-muted capitalize">Status: {order.status}</div>
        </div>
      ) : (
        <p className="mt-8 text-muted">We couldn’t load the order details, but it was placed.</p>
      )}

      <div className="mt-8 flex gap-3 justify-center">
        <Link to="/account" className="btn-outline">View my orders</Link>
        <Link to="/shop" className="btn-primary">Keep shopping</Link>
      </div>
    </section>
  );
}
