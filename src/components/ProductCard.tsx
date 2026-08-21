import { Link } from "react-router-dom";
import { useState } from "react";
import { inr, type Product } from "../data/catalog";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const badgeStyle: Record<string, string> = {
  "New": "bg-bloom text-white",
  "Best Seller": "bg-ink text-white",
  "Sale": "bg-berry text-white",
};

export default function ProductCard({
  p,
  showAddToCart = false,
}: {
  p: Product;
  showAddToCart?: boolean;
}) {
  const { has, toggle } = useWishlist();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const liked = has(p.slug);

  function handleAdd() {
    add(p.slug, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="group relative flex flex-col">
      <button
        type="button"
        onClick={() => toggle(p.slug)}
        aria-pressed={liked}
        aria-label={liked ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-bloom hover:bg-white transition-colors shadow-sm"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M12 20s-7-4.35-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.65 12 20 12 20Z" strokeLinejoin="round" />
        </svg>
      </button>

      <Link to={`/product/${p.slug}`} className="block">
        <div
          className={`relative aspect-square rounded-[22px] border-2 border-line overflow-hidden group-hover:border-flame transition-colors ${p.image ? "" : "ph"}`}
          data-label={p.image ? undefined : p.name}
          style={{ ["--ph-a" as string]: p.tint[0], ["--ph-b" as string]: p.tint[1] }}
        >
          {p.image && (
            <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
          )}
          {p.badge && (
            <span
              className={`absolute top-3 left-3 font-display text-[11.5px] font-semibold px-3 py-1 rounded-full ${badgeStyle[p.badge]}`}
            >
              {p.badge}
            </span>
          )}
        </div>
        <div className="mt-3">
          <div className="font-display text-[15.5px] font-medium text-ink group-hover:text-flame transition-colors leading-snug">
            {p.name}
          </div>
          <div className="mt-1 text-[15px] tabular-nums">
            <span className="font-semibold text-ink">{inr(p.price)}</span>
            {p.compareAt && (
              <span className="ml-2 text-muted line-through">{inr(p.compareAt)}</span>
            )}
          </div>
        </div>
      </Link>

      {showAddToCart && (
        <button
          type="button"
          onClick={handleAdd}
          className="btn-primary mt-3 w-full !rounded-xl"
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      )}
    </div>
  );
}
