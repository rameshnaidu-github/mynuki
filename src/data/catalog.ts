// Catalog data. Mock for now — mirrors the planned Supabase `products` /
// `categories` tables. Prices in INR.
//
// NOTE: these are placeholder products until the real range + photography
// arrive. Set `image` to a file in /public to swap in a real photo.

export type Family = "objects" | "kits";

export interface Category {
  slug: string;
  name: string;
  family: Family;
  blurb: string;
  tint: [string, string]; // placeholder gradient a→b
  image?: string;         // category tile photo
}

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  category: string; // category slug
  badge?: "New" | "Best Seller" | "Sale";
  tint: [string, string];
  image?: string; // real product image; falls back to tinted placeholder
  blurb: string;
  description: string;
  specs: Spec[];
}

export const familyLabels: Record<Family, string> = {
  objects: "3D Objects",
  kits: "DIY Kits",
};

export const familyPaths: Record<Family, string> = {
  objects: "/objects",
  kits: "/kits",
};

export const familyBlurbs: Record<Family, string> = {
  objects: "Sculptural, useful pieces — designed by us and 3D-printed in small batches.",
  kits: "Everything in one box, and a few good hours of making ahead of you.",
};

/* palette rotation for placeholder tiles */
const PINK: [string, string] = ["#ffd6e8", "#ff9ec9"];
const ORANGE: [string, string] = ["#ffdcc4", "#ffab7a"];
const YELLOW: [string, string] = ["#fff0c2", "#ffd772"];
const LILAC: [string, string] = ["#e3dbff", "#b9a5f5"];
const MINT: [string, string] = ["#d2f2e2", "#96dcb8"];
const BLUE: [string, string] = ["#d4e6ff", "#9dc4f7"];

export const categories: Category[] = [
  // ── 3D Objects (hero family) ─────────────────────────────────────────────
  { image: "/products/daisy-desk-clock.jpg", slug: "desk-office", name: "Desk & Office", family: "objects", blurb: "Pieces that make a working desk worth sitting at.", tint: PINK },
  { image: "/products/petal-vanity-organiser.jpg", slug: "vanity-storage", name: "Vanity & Storage", family: "objects", blurb: "Drawers, trays and stands for small treasures.", tint: LILAC },
  { image: "/products/bloom-wall-hooks.jpg", slug: "wall", name: "Wall & Decor", family: "objects", blurb: "Hooks, boards and pieces that lift a bare wall.", tint: BLUE },
  { image: "/products/wavy-photo-frame.jpg", slug: "frames", name: "Frames", family: "objects", blurb: "Sculptural frames for the pictures worth showing.", tint: ORANGE },

  // ── DIY Kits ─────────────────────────────────────────────────────────────
  { slug: "miniature-kits", name: "Miniature Kits", family: "kits", blurb: "Tiny shops, homes and scenes you build and light up.", tint: PINK },
  { slug: "painting", name: "Painting", family: "kits", blurb: "Paint-by-number and canvas kits.", tint: MINT },
  { slug: "indian-art", name: "Indian Art", family: "kits", blurb: "Madhubani, Warli and more.", tint: ORANGE },
  { slug: "candles", name: "Candles", family: "kits", blurb: "Pour, scent and set your own.", tint: YELLOW },
  { slug: "resin", name: "Resin", family: "kits", blurb: "Coasters, keepsakes and jewellery.", tint: BLUE },
  { slug: "clay", name: "Clay", family: "kits", blurb: "Air-dry and polymer clay sets.", tint: LILAC },
  { slug: "jewellery", name: "Jewellery", family: "kits", blurb: "Beads, wire and charms.", tint: PINK },
  { slug: "embroidery", name: "Embroidery", family: "kits", blurb: "Hoops, thread and patterns.", tint: MINT },
  { slug: "festive", name: "Festive", family: "kits", blurb: "Diwali, Christmas and celebration kits.", tint: ORANGE },
];

const OBJ_DESC =
  "Designed in our studio and 3D-printed in small batches, then hand-finished and checked before it ships. Made from durable plant-based PLA — sturdy enough for daily use, and recyclable at end of life.";
const KIT_DESC =
  "A complete, self-contained kit — every part, tool and a step-by-step illustrated manual arrive in one box. Made for slow, satisfying building and a keepsake worth displaying.";

const objSpecs = (size: string, colour: string): Spec[] => [
  { label: "Material", value: "PLA" },
  { label: "Size", value: size },
  { label: "Finish", value: colour },
];
const kitSpecs = (pieces: number, time: string, level: string): Spec[] => [
  { label: "Pieces", value: String(pieces) },
  { label: "Build time", value: time },
  { label: "Level", value: level },
];

export const products: Product[] = [
  // ── 3D Objects — real range, photographed ────────────────────────────────
  { slug: "petal-vanity-organiser", name: "Petal Vanity Organiser", price: 2499, category: "vanity-storage", badge: "Best Seller", tint: LILAC, image: "/products/petal-vanity-organiser.jpg", blurb: "A flower-topped tower with two wavy drawers and a brush well.", description: OBJ_DESC, specs: objSpecs("16 × 16 × 14 cm", "Lilac · pink · blue") },
  { slug: "pebble-drawer-organiser", name: "Pebble Five-Drawer Organiser", price: 2799, category: "vanity-storage", tint: PINK, image: "/products/pebble-drawer-organiser.jpg", blurb: "Five pebble-shaped drawers in a soft pink shell.", description: OBJ_DESC, specs: objSpecs("22 × 20 × 9 cm", "Pink · multi drawers") },
  { slug: "armchair-trinket-stand", name: "Armchair Trinket Stand", price: 1799, category: "vanity-storage", tint: PINK, image: "/products/armchair-trinket-stand.jpg", blurb: "A tiny armchair for your rings, with a drawer underneath.", description: OBJ_DESC, specs: objSpecs("13 × 12 × 17 cm", "Pink · mint drawer") },
  { slug: "bloom-memo-board", name: "Bloom Memo Board with Shelf", price: 2399, category: "wall", badge: "New", tint: PINK, image: "/products/bloom-memo-board.jpg", blurb: "A wavy pin board with flower magnets and a floating shelf.", description: OBJ_DESC, specs: objSpecs("34 × 40 cm", "Pink · mint shelf") },
  { slug: "bloom-wall-hooks", name: "Bloom Cloud Wall Hooks", price: 1499, category: "wall", tint: BLUE, image: "/products/bloom-wall-hooks.jpg", blurb: "Four flower hooks on a cloud — for coats, bags and keys.", description: OBJ_DESC, specs: objSpecs("38 × 18 cm · 4 hooks", "Cobalt · multi flowers") },
  { slug: "wavy-photo-frame", name: "Wavy Bloom Photo Frame", price: 1199, category: "frames", badge: "New", tint: ORANGE, image: "/products/wavy-photo-frame.jpg", blurb: "Layered wavy borders and two flowers, for a 4 × 6 print.", description: OBJ_DESC, specs: objSpecs("Fits 4 × 6 in", "Purple · blue · pink") },
  { slug: "daisy-desk-clock", name: "Daisy Desk Clock", price: 1999, category: "desk-office", tint: MINT, image: "/products/daisy-desk-clock.jpg", blurb: "A flower-faced clock balanced on two chunky pebbles.", description: OBJ_DESC, specs: objSpecs("18 × 8 × 24 cm", "Sage · pink · orange") },
  { slug: "wave-magazine-holder", name: "Wave Magazine Holder", price: 1899, category: "desk-office", tint: ORANGE, image: "/products/wave-magazine-holder.jpg", blurb: "Ribbed, wavy walls that keep magazines standing up straight.", description: OBJ_DESC, specs: objSpecs("26 × 12 × 30 cm", "Orange · lilac · red") },
  { slug: "bloom-disc-notebook", name: "Bloom Disc Notebook", price: 1299, category: "desk-office", tint: PINK, image: "/products/bloom-disc-notebook.jpg", blurb: "A refillable disc-bound cover in wavy pink, orange and mint.", description: OBJ_DESC, specs: objSpecs("A5 · 9 discs", "Pink · orange · mint") },
  { slug: "wave-zip-pouch", name: "Wave Zip Pouch", price: 1149, compareAt: 1499, category: "desk-office", badge: "Sale", tint: LILAC, image: "/products/wave-zip-pouch.jpg", blurb: "A ribbed, rounded case with a flower zip pull.", description: OBJ_DESC, specs: objSpecs("21 × 9 × 7 cm", "Pink · purple · blue") },

  // ── DIY Kits (placeholder — real range pending) ─────────────────────────
  { slug: "petals-and-posies", name: "Petals & Posies Flower Shop", price: 2499, compareAt: 2999, category: "miniature-kits", badge: "Best Seller", tint: PINK, blurb: "A sunlit corner florist with a striped awning.", description: KIT_DESC, specs: kitSpecs(220, "3–4 hours", "Intermediate") },
  { slug: "corner-coffee-house", name: "Corner Coffee House", price: 2699, category: "miniature-kits", badge: "New", tint: ORANGE, blurb: "A warm little café with working lights.", description: KIT_DESC, specs: kitSpecs(240, "4 hours", "Intermediate") },
  { slug: "cozy-book-nook", name: "Cozy Book Nook", price: 1899, category: "miniature-kits", tint: YELLOW, blurb: "A shelf-insert alley that glows from within.", description: KIT_DESC, specs: kitSpecs(180, "3 hours", "Beginner") },
  { slug: "sakura-candle-kit", name: "Sakura Candle-Making Kit", price: 799, compareAt: 1099, category: "candles", badge: "Sale", tint: PINK, blurb: "Pour three soy candles, cherry-blossom scent.", description: KIT_DESC, specs: kitSpecs(12, "1–2 hours", "Beginner") },
  { slug: "ocean-resin-coasters", name: "Ocean Resin Coaster Set", price: 1199, category: "resin", tint: BLUE, blurb: "Make four ocean-wave resin coasters.", description: KIT_DESC, specs: kitSpecs(20, "2 hours + cure", "Intermediate") },
  { slug: "madhubani-canvas", name: "Madhubani Canvas Kit", price: 999, category: "indian-art", badge: "New", tint: ORANGE, blurb: "Traditional Madhubani, guided step by step.", description: KIT_DESC, specs: kitSpecs(30, "3 hours", "Beginner") },
  { slug: "terrazzo-clay-trinket", name: "Terrazzo Clay Trinket Dishes", price: 849, category: "clay", tint: LILAC, blurb: "Air-dry clay dishes with a terrazzo finish.", description: KIT_DESC, specs: kitSpecs(16, "2 hours", "Beginner") },
  { slug: "wildflower-hoop", name: "Wildflower Embroidery Hoop", price: 749, category: "embroidery", badge: "Best Seller", tint: MINT, blurb: "A blooming hoop with pre-printed pattern.", description: KIT_DESC, specs: kitSpecs(14, "3–4 hours", "Beginner") },
  { slug: "beaded-charm-bracelets", name: "Beaded Charm Bracelet Kit", price: 699, category: "jewellery", tint: PINK, blurb: "Design three bracelets, mix-and-match charms.", description: KIT_DESC, specs: kitSpecs(60, "1–2 hours", "Beginner") },
  { slug: "coastal-canvas", name: "Coastal Sunrise Canvas", price: 899, category: "painting", tint: MINT, blurb: "Paint-by-number on premium canvas.", description: KIT_DESC, specs: kitSpecs(24, "2–3 hours", "Beginner") },
  { slug: "festive-lantern-set", name: "Festive Lantern Set", price: 999, category: "festive", tint: ORANGE, blurb: "Three glowing paper-and-wood lanterns.", description: KIT_DESC, specs: kitSpecs(40, "2 hours", "Beginner") },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export const getCategory = (slug: string) => categoryBySlug.get(slug);
export const familyOf = (categorySlug: string): Family | undefined =>
  categoryBySlug.get(categorySlug)?.family;
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const categoriesInFamily = (family: Family) =>
  categories.filter((c) => c.family === family);

export function filterProducts(opts: { family?: Family; category?: string }): Product[] {
  return products.filter((p) => {
    if (opts.category) return p.category === opts.category;
    if (opts.family) return familyOf(p.category) === opts.family;
    return true;
  });
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";
export function sortProducts(list: Product[], key: SortKey): Product[] {
  const out = [...list];
  switch (key) {
    case "price-asc": return out.sort((a, b) => a.price - b.price);
    case "price-desc": return out.sort((a, b) => b.price - a.price);
    case "name": return out.sort((a, b) => a.name.localeCompare(b.name));
    default: return out; // featured = source order
  }
}
