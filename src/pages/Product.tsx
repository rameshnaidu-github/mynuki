import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct, getCategory, inr, familyLabels, familyPaths } from "../data/catalog";
import ImageLightbox from "../components/ImageLightbox";
import { useCart } from "../context/CartContext";
import WishlistButton from "../components/WishlistButton";

const badgeStyle: Record<string, string> = {
  "New": "bg-peach text-flame",
  "Sale": "bg-berry text-white",
};

export default function Product() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [view, setView] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

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
  // With a real photo we show just that shot (+ the 360 tab); the extra
  // view slots only exist for products still on placeholder art.
  const gallery = product.images ?? (product.image ? [product.image] : []);
  const views = gallery.length ? gallery : ["Front", "Angle", "Detail", "Contents"];

  function handleAdd() {
    add(product!.slug, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
      {/* breadcrumb */}
      <nav className="text-xs text-muted mb-6" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-flame">Home</Link>
        <span className="mx-1.5">/</span>
        {family && (
          <>
            <Link to={familyPaths[family]} className="hover:text-flame">
              {familyLabels[family]}
            </Link>
            <span className="mx-1.5">/</span>
          </>
        )}
        {cat && (
          <>
            <Link to={`/shop?category=${cat.slug}`} className="hover:text-flame">{cat.name}</Link>
            <span className="mx-1.5">/</span>
          </>
        )}
        <span className="text-inksoft">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* gallery */}
        <div>
          {gallery.length ? (
            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              aria-label={`Enlarge ${product.name}`}
              className="group relative block w-full aspect-square rounded-3xl border border-line overflow-hidden bg-white cursor-zoom-in"
            >
              <img
                src={gallery[view]}
                alt={`${product.name} — view ${view + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-ink/70 text-white text-[12px] px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.2-3.2M11 8v6M8 11h6" />
                </svg>
                Click to enlarge
              </span>
            </button>
          ) : (
            <div
              className="ph aspect-square rounded-3xl border border-line"
              data-label={`${product.name} — ${views[view]}`}
              style={{ ["--ph-a" as string]: product.tint[0], ["--ph-b" as string]: product.tint[1] }}
            />
          )}

          {/* thumbnails + 360 tab */}
          <div className="mt-4 flex gap-3">
            {views.map((v, i) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(i)}
                aria-label={`View ${i + 1}`}
                className={`w-16 h-16 rounded-xl border overflow-hidden ${view === i ? "border-flame" : "border-line"} ${gallery.length ? "bg-white" : "ph"}`}
                data-label=""
                style={{ ["--ph-a" as string]: product.tint[0], ["--ph-b" as string]: product.tint[1] }}
              >
                {gallery.length > 0 && (
                  <img src={gallery[i]} alt="" className="w-full h-full object-cover" />
                )}
              </button>
            ))}
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
            {product.specs.map((s) => (
              <Spec key={s.label} label={s.label} value={s.value} />
            ))}
          </dl>

          {/* quantity + actions */}
          <div className="mt-7 flex items-center gap-3">
            <div className="flex items-center border border-line rounded-full">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-10 h-10 text-lg text-flame hover:bg-peach rounded-l-full"
              >
                −
              </button>
              <span className="w-8 text-center tabular-nums" aria-live="polite">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-10 h-10 text-lg text-flame hover:bg-peach rounded-r-full"
              >
                +
              </button>
            </div>

            <button onClick={handleAdd} className="btn-primary flex-1">
              {added ? "Added ✓" : "Add to cart"}
            </button>

            <WishlistButton
              slug={product.slug}
              name={product.name}
              size={20}
              className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-flame hover:bg-peach"
            />
          </div>

          {/* description */}
          <div className="mt-8 border-t border-line pt-6">
            <h2 className="text-xl">{family === "kits" ? "What’s in the box" : "About this piece"}</h2>
            <p className="mt-2 text-inksoft font-light leading-relaxed">{product.description}</p>
          </div>

          {/* make it yours */}
          <div className="mt-6 bg-peach rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <div className="font-medium text-flame">Want it your way?</div>
              <div className="text-sm text-inksoft font-light">Request a custom colourway or scene.</div>
            </div>
            <Link to="/customize" className="btn-outline shrink-0">Make It Yours</Link>
          </div>
        </div>
      </div>

      {zoomOpen && gallery.length > 0 && (
        <ImageLightbox
          images={gallery}
          index={view}
          alt={product.name}
          onIndexChange={setView}
          onClose={() => setZoomOpen(false)}
        />
      )}
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
