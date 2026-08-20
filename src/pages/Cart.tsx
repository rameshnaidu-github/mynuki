import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { inr } from "../data/catalog";
import { buildLines, summarize, SHIPPING_FREE_OVER } from "../lib/cart";

export default function Cart() {
  const { items, setQty, remove } = useCart();
  const lines = buildLines(items);
  const { subtotal, shipping, total } = summarize(lines);

  if (lines.length === 0) {
    return (
      <section className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl">Your cart is empty</h1>
        <p className="mt-3 text-inksoft font-light">
          Little worlds are waiting to be built.
        </p>
        <Link to="/shop" className="btn-primary mt-7">Browse the shop</Link>
      </section>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl">Your cart</h1>

      <div className="mt-10 grid lg:grid-cols-[1fr_320px] gap-10 items-start">
        {/* line items */}
        <ul className="divide-y divide-line border-y border-line">
          {lines.map(({ product, qty, lineTotal }) => (
            <li key={product.slug} className="py-5 flex gap-4">
              <Link
                to={`/product/${product.slug}`}
                className="ph w-24 h-24 rounded-xl border border-line shrink-0"
                data-label=""
                style={{ ["--ph-a" as string]: product.tint[0], ["--ph-b" as string]: product.tint[1] }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-3">
                  <Link to={`/product/${product.slug}`} className="font-medium text-ink hover:text-forest">
                    {product.name}
                  </Link>
                  <span className="font-semibold tabular-nums shrink-0">{inr(lineTotal)}</span>
                </div>
                <div className="text-sm text-muted mt-1 tabular-nums">{inr(product.price)} each</div>

                <div className="mt-3 flex items-center gap-4">
                  <div className="flex items-center border border-line rounded-full">
                    <button
                      type="button"
                      onClick={() => setQty(product.slug, qty - 1)}
                      aria-label={`Decrease ${product.name} quantity`}
                      className="w-9 h-9 text-forest hover:bg-foresttint rounded-l-full"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(product.slug, qty + 1)}
                      aria-label={`Increase ${product.name} quantity`}
                      className="w-9 h-9 text-forest hover:bg-foresttint rounded-r-full"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(product.slug)}
                    className="text-sm text-muted hover:text-clay underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* summary */}
        <aside className="bg-card border border-line rounded-2xl p-6 lg:sticky lg:top-24">
          <h2 className="text-xl">Order summary</h2>
          <dl className="mt-4 space-y-2.5 text-sm">
            <Row label="Subtotal" value={inr(subtotal)} />
            <Row
              label="Shipping"
              value={shipping === 0 ? "Free" : inr(shipping)}
            />
            {shipping > 0 && (
              <p className="text-xs text-muted">
                Free shipping over {inr(SHIPPING_FREE_OVER)}.
              </p>
            )}
          </dl>
          <div className="mt-4 pt-4 border-t border-line flex justify-between items-baseline">
            <span className="font-medium">Total</span>
            <span className="text-xl font-semibold tabular-nums">{inr(total)}</span>
          </div>
          <Link to="/checkout" className="btn-primary w-full mt-6">Proceed to checkout</Link>
          <Link to="/shop" className="block text-center text-sm text-inksoft mt-3 hover:text-forest">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-inksoft">{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
