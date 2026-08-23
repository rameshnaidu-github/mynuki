import { Link } from "react-router-dom";
import { useState } from "react";
import { inr, type Product } from "../data/catalog";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function ProductCard({
  p,
  showAddToCart = false,
}: {
  p: Product;
  showAddToCart?: boolean;
}) {
  const { has, toggle } = useWishlist();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const liked = has(p.slug);
  const showImage = Boolean(p.image) && !imgFailed;

  function handleAdd() {
    add(p.slug, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="group card-lift relative flex flex-col h-full bg-white border border-line rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => toggle(p.slug)}
        aria-pressed={liked}
        aria-label={liked ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
        className="absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-bloom hover:bg-white transition-colors"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M12 20s-7-4.35-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.65 12 20 12 20Z" strokeLinejoin="round" />
        </svg>
      </button>

      <Link to={`/product/${p.slug}`} className="block">
        <div
          className={`relative aspect-square overflow-hidden ${showImage ? "" : "ph"}`}
          data-label={showImage ? undefined : p.name}
          style={{ ["--ph-a" as string]: p.tint[0], ["--ph-b" as string]: p.tint[1] }}
        >
          {showImage && (
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover card-zoom"
            />
          )}
          {p.badge && (
            <span className="absolute top-2.5 left-2.5 bg-ink text-white text-[10.5px] font-semibold tracking-wide px-3 py-1 rounded-full">
              {p.badge}
            </span>
          )}
        </div>
        <div className="px-3 pt-3">
          <div className="font-display italic text-[15px] text-flame leading-snug">{p.name}</div>
          <div className="mt-1 font-display italic text-[14px] tabular-nums flex items-center gap-2">
            {p.compareAt && <span className="text-flame/80 line-through">{inr(p.compareAt)}</span>}
            <span className="text-berry">{inr(p.price)}</span>
          </div>
        </div>
      </Link>

      {showAddToCart && (
        <div className="mt-auto px-3 pb-3 pt-3">
          <div className="flex items-center justify-between border border-line rounded-full mb-2">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label={`Decrease ${p.name} quantity`}
              className="w-11 h-11 flex items-center justify-center text-[18px] leading-none text-inksoft hover:text-ink disabled:opacity-40"
              disabled={qty <= 1}
            >
              −
            </button>
            <span className="text-[14px] tabular-nums" aria-live="polite">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              aria-label={`Increase ${p.name} quantity`}
              className="w-11 h-11 flex items-center justify-center text-[18px] leading-none text-inksoft hover:text-ink"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="w-full bg-ink text-white text-[13px] tracking-wide h-10 rounded-full hover:bg-black transition-colors"
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      )}
    </div>
  );
}
