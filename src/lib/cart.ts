import { getProduct, type Product } from "../data/catalog";
import type { CartItem } from "../context/CartContext";

export interface CartLine {
  product: Product;
  qty: number;
  lineTotal: number;
}

export const SHIPPING_FREE_OVER = 1200;
export const SHIPPING_FEE = 99;

export function buildLines(items: CartItem[]): CartLine[] {
  return items
    .map((i) => {
      const product = getProduct(i.slug);
      return product ? { product, qty: i.qty, lineTotal: product.price * i.qty } : null;
    })
    .filter((l): l is CartLine => l !== null);
}

export function summarize(lines: CartLine[]) {
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const shipping = subtotal === 0 || subtotal >= SHIPPING_FREE_OVER ? 0 : SHIPPING_FEE;
  return { subtotal, shipping, total: subtotal + shipping };
}
