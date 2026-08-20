import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { supabase } from "../lib/supabase";
import { listOrders, type OrderRow } from "../lib/orders";
import { inr, getProduct } from "../data/catalog";

export default function Account() {
  const { user, signOut } = useAuth();
  const { slugs } = useWishlist();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderRow[] | null>(null);

  const name =
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email?.split("@")[0] ||
    "there";

  useEffect(() => {
    if (!supabase || !user) return;
    listOrders(supabase, user.id).then(setOrders);
  }, [user]);

  function handleSignOut() {
    // Leave the protected page first so ProtectedRoute doesn't bounce to /login,
    // then clear the session.
    navigate("/");
    void signOut();
  }

  const wishlistProducts = slugs.map(getProduct).filter(Boolean);

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <span className="eyebrow">Your account</span>
      <div className="flex items-end justify-between gap-4 mt-3">
        <h1 className="text-4xl">Hello, {name}</h1>
        <button onClick={handleSignOut} className="btn-outline shrink-0">Sign out</button>
      </div>

      <div className="mt-6 bg-card border border-line rounded-2xl p-6">
        <h2 className="text-lg">Profile</h2>
        <p className="mt-1 text-sm text-inksoft break-words">{user?.email}</p>
      </div>

      {/* Orders */}
      <div className="mt-6">
        <h2 className="text-2xl">Your orders</h2>
        {orders === null ? (
          <p className="mt-3 text-muted">Loading…</p>
        ) : orders.length === 0 ? (
          <div className="mt-3 bg-card border border-line rounded-2xl p-6 text-inksoft font-light">
            No orders yet. <Link to="/shop" className="text-forest underline">Start browsing →</Link>
          </div>
        ) : (
          <ul className="mt-3 space-y-3">
            {orders.map((o) => (
              <li key={o.id} className="bg-card border border-line rounded-2xl p-5">
                <div className="flex flex-wrap justify-between gap-2 items-baseline">
                  <span className="font-mono text-sm">{o.id.slice(0, 8).toUpperCase()}</span>
                  <span className="text-xs text-muted">
                    {new Date(o.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                <div className="mt-2 text-sm text-inksoft">
                  {o.items.map((it) => `${it.name} ×${it.qty}`).join(", ")}
                </div>
                <div className="mt-2 flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-wide text-forest bg-foresttint rounded-full px-2.5 py-0.5">{o.status}</span>
                  <span className="font-semibold tabular-nums">{inr(o.total_amount)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Wishlist */}
      <div className="mt-8">
        <h2 className="text-2xl">Wishlist</h2>
        {wishlistProducts.length === 0 ? (
          <div className="mt-3 bg-card border border-line rounded-2xl p-6 text-inksoft font-light">
            Nothing saved yet — tap the heart on any kit.
          </div>
        ) : (
          <ul className="mt-3 grid sm:grid-cols-2 gap-3">
            {wishlistProducts.map((p) => (
              <li key={p!.slug}>
                <Link to={`/product/${p!.slug}`} className="flex items-center gap-3 bg-card border border-line rounded-2xl p-3 hover:border-forest">
                  <span
                    className="ph w-14 h-14 rounded-lg shrink-0"
                    data-label=""
                    style={{ ["--ph-a" as string]: p!.tint[0], ["--ph-b" as string]: p!.tint[1] }}
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink truncate">{p!.name}</span>
                    <span className="block text-sm text-inksoft tabular-nums">{inr(p!.price)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
