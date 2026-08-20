import { Link } from "react-router-dom";
import { inr, type Product } from "../data/catalog";
import { useWishlist } from "../context/WishlistContext";

const badgeStyle: Record<string, string> = {
  "New": "bg-foresttint text-forest",
  "Best Seller": "bg-forest text-cream",
  "Sale": "bg-clay text-white",
};

export default function ProductCard({ p }: { p: Product }) {
  const { has, toggle } = useWishlist();
  const liked = has(p.slug);

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => toggle(p.slug)}
        aria-pressed={liked}
        aria-label={liked ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-cream/85 backdrop-blur flex items-center justify-center text-forest hover:bg-cream transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 20s-7-4.35-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.65 12 20 12 20Z" strokeLinejoin="round" />
        </svg>
      </button>

      <Link to={`/product/${p.slug}`} className="block">
        <div
          className={`relative aspect-square rounded-2xl border border-line overflow-hidden ${p.image ? "" : "ph"}`}
          data-label={p.image ? undefined : p.name}
          style={{ ["--ph-a" as string]: p.tint[0], ["--ph-b" as string]: p.tint[1] }}
        >
          {p.image && (
            <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
          )}
          {p.badge && (
            <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${badgeStyle[p.badge]}`}>
              {p.badge}
            </span>
          )}
        </div>
        <div className="mt-3">
          <div className="text-sm font-medium text-ink group-hover:text-forest transition-colors">
            {p.name}
          </div>
          <div className="mt-1 text-sm tabular-nums">
            <span className="font-semibold text-ink">{inr(p.price)}</span>
            {p.compareAt && (
              <span className="ml-2 text-muted line-through font-light">{inr(p.compareAt)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
