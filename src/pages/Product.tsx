import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct, getCategory, inr, familyLabels } from "../data/catalog";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Turntable360 from "../components/Turntable360";

const badgeStyle: Record<string, string> = {
  "New": "bg-foresttint text-forest",
  "Best Seller": "bg-forest text-cream",
  "Sale": "bg-clay text-white",
};

export default function Product() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [view, setView] = useState(0);

  if (!product) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl">Kit not found</h1>
        <Link to="/shop" className="btn-primary mt-6">Back to shop</Link>
      </section>
    );
  }

  const cat = getCategory(product.category);
  const family = cat?.family;
  const liked = has(product.slug);
  const views = ["Front", "Angle", "Detail", "Contents"];

  function handleAdd() {
    add(product!.slug, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
      {/* breadcrumb */}
      <nav className="text-xs text-muted mb-6" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-forest">Home</Link>
        <span className="mx-1.5">/</span>
        {family && (
          <>
            <Link to={family === "miniature" ? "/miniature" : "/other"} className="hover:text-forest">
              {familyLabels[family]}
            </Link>
            <span className="mx-1.5">/</span>
          </>
        )}
        {cat && (
          <>
            <Link to={`/shop?category=${cat.slug}`} className="hover:text-forest">{cat.name}</Link>
            <span className="mx-1.5">/</span>
          </>
        )}
        <span className="text-inksoft">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* gallery */}
        <div>
          {view < 4 ? (
            product.image && view === 0 ? (
              <div className="aspect-square rounded-3xl border border-line overflow-hidden">
                <img src={product.image} alt={`${product.name} — front`} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div
                className="ph aspect-square rounded-3xl border border-line"
                data-label={`${product.name} — ${views[view]}`}
                style={{ ["--ph-a" as string]: product.tint[0], ["--ph-b" as string]: product.tint[1] }}
              />
            )
          ) : (
            <Turntable360 label={product.name} tint={product.tint} />
          )}

          {/* thumbnails + 360 tab */}
          <div className="mt-4 flex gap-3">
            {views.map((v, i) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(i)}
                aria-label={`View ${v}`}
                className={`w-16 h-16 rounded-xl border overflow-hidden ${view === i ? "border-forest" : "border-line"} ${product.image && i === 0 ? "" : "ph"}`}
                data-label=""
                style={{ ["--ph-a" as string]: product.tint[0], ["--ph-b" as string]: product.tint[1] }}
              >
                {product.image && i === 0 && (
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                )}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setView(4)}
              className={`w-16 h-16 rounded-xl border text-[11px] font-semibold text-forest flex items-center justify-center ${
                view === 4 ? "border-forest bg-foresttint" : "border-line bg-card"
              }`}
            >
              360°
            </button>
          </div>
        </div>

        {/* info */}
        <div>
          {product.badge && (
            <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${badgeStyle[product.badge]}`}>
              {product.badge}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl mt-3">{product.name}</h1>
          <p className="mt-2 text-inksoft font-light">{product.blurb}</p>

          <div className="mt-5 text-2xl tabular-nums">
            <span className="font-semibold text-ink">{inr(product.price)}</span>
            {product.compareAt && (
              <span className="ml-3 text-lg text-muted line-through font-light">{inr(product.compareAt)}</span>
            )}
          </div>

          {/* specs */}
          <dl className="mt-6 grid grid-cols-3 gap-3">
            <Spec label="Pieces" value={String(product.pieces)} />
            <Spec label="Build time" value={product.buildTime} />
            <Spec label="Level" value={product.difficulty} />
          </dl>

          {/* quantity + actions */}
          <div className="mt-7 flex items-center gap-3">
            <div className="flex items-center border border-line rounded-full">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-10 h-10 text-lg text-forest hover:bg-foresttint rounded-l-full"
              >
                −
              </button>
              <span className="w-8 text-center tabular-nums" aria-live="polite">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-10 h-10 text-lg text-forest hover:bg-foresttint rounded-r-full"
              >
                +
              </button>
            </div>

            <button onClick={handleAdd} className="btn-primary flex-1">
              {added ? "Added ✓" : "Add to cart"}
            </button>

            <button
              type="button"
              onClick={() => toggle(product.slug)}
              aria-pressed={liked}
              aria-label={liked ? "Remove from wishlist" : "Save to wishlist"}
              className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-forest hover:bg-foresttint"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7">
                <path d="M12 20s-7-4.35-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.65 12 20 12 20Z" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* description */}
          <div className="mt-8 border-t border-line pt-6">
            <h2 className="text-xl">What’s in the box</h2>
            <p className="mt-2 text-inksoft font-light leading-relaxed">{product.description}</p>
          </div>

          {/* make it yours */}
          <div className="mt-6 bg-foresttint rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <div className="font-medium text-forest">Want it your way?</div>
              <div className="text-sm text-inksoft font-light">Request a custom colourway or scene.</div>
            </div>
            <Link to="/customize" className="btn-outline shrink-0">Make It Yours</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card border border-line rounded-xl px-3 py-2.5">
      <dt className="text-[11px] uppercase tracking-wide text-muted">{label}</dt>
      <dd className="text-sm font-medium text-ink mt-0.5">{value}</dd>
    </div>
  );
}
