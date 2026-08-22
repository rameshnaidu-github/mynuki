// Catalog data. Mock for now — mirrors the planned Supabase `products` /
// `categories` tables. Prices in INR.
//
// The 3D objects carry real photography; their names, prices and dimensions
// are still drafts pending the owner's figures. The Purple Door Apartment is
// fully real (name, price, copy and gallery taken from the packaging).

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
  image?: string;    // primary image; falls back to a tinted placeholder
  images?: string[]; // full gallery, when a product has been photographed properly
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
  { slug: "miniature-kits", name: "Miniature Kits", family: "kits", blurb: "Room boxes and little worlds you build yourself, lights and all.", tint: LILAC, image: "/products/purple-door-apartment.jpg" },
];

const OBJ_DESC =
  "Designed in our studio and 3D-printed in small batches, then hand-finished and checked before it ships. Made from durable plant-based PLA — sturdy enough for daily use, and recyclable at end of life.";

const objSpecs = (size: string, colour: string): Spec[] => [
  { label: "Material", value: "PLA" },
  { label: "Size", value: size },
  { label: "Finish", value: colour },
];

export const products: Product[] = [
  // ── 3D Objects — real range, photographed ────────────────────────────────
  { slug: "petal-vanity-organiser", name: "PetalSort: Desk & Vanity Organizer", price: 1999, compareAt: 2499, category: "vanity-storage", badge: "Sale", tint: LILAC, image: "/products/petal-vanity-organiser.jpg", blurb: "A flower-topped tower with two wavy drawers and a brush well.", description: OBJ_DESC, specs: objSpecs("16 × 16 × 14 cm", "Lilac · pink · blue") },
  { slug: "pebble-drawer-organiser", name: "Pebble Five-Drawer Organiser", price: 2799, category: "vanity-storage", tint: PINK, image: "/products/pebble-drawer-organiser.jpg", blurb: "Five pebble-shaped drawers in a soft pink shell.", description: OBJ_DESC, specs: objSpecs("22 × 20 × 9 cm", "Pink · multi drawers") },
  { slug: "armchair-trinket-stand", name: "DeskNest with Drawer", price: 1699, compareAt: 1999, category: "vanity-storage", tint: PINK, image: "/products/armchair-trinket-stand.jpg", blurb: "A tiny armchair for your rings, with a drawer underneath.", description: OBJ_DESC, specs: objSpecs("13 × 12 × 17 cm", "Pink · mint drawer") },
  { slug: "bloom-memo-board", name: "Bloom Memo Board with Shelf", price: 2399, category: "wall", badge: "New", tint: PINK, image: "/products/bloom-memo-board.jpg", blurb: "A wavy pin board with flower magnets and a floating shelf.", description: OBJ_DESC, specs: objSpecs("34 × 40 cm", "Pink · mint shelf") },
  { slug: "bloom-wall-hooks", name: "Bloom Cloud Wall Hooks", price: 1499, category: "wall", tint: BLUE, image: "/products/bloom-wall-hooks.jpg", blurb: "Four flower hooks on a cloud — for coats, bags and keys.", description: OBJ_DESC, specs: objSpecs("38 × 18 cm · 4 hooks", "Cobalt · multi flowers") },
  { slug: "wavy-photo-frame", name: "Wavy Bloom Photo Frame", price: 1199, category: "frames", badge: "New", tint: ORANGE, image: "/products/wavy-photo-frame.jpg", blurb: "Layered wavy borders and two flowers, for a 4 × 6 print.", description: OBJ_DESC, specs: objSpecs("Fits 4 × 6 in", "Purple · blue · pink") },
  { slug: "daisy-desk-clock", name: "Daisy Desk Clock", price: 1999, category: "desk-office", tint: MINT, image: "/products/daisy-desk-clock.jpg", blurb: "A flower-faced clock balanced on two chunky pebbles.", description: OBJ_DESC, specs: objSpecs("18 × 8 × 24 cm", "Sage · pink · orange") },
  { slug: "wave-magazine-holder", name: "Wave Magazine Holder", price: 1899, category: "desk-office", tint: ORANGE, image: "/products/wave-magazine-holder.jpg", blurb: "Ribbed, wavy walls that keep magazines standing up straight.", description: OBJ_DESC, specs: objSpecs("26 × 12 × 30 cm", "Orange · lilac · red") },
  { slug: "bloom-disc-notebook", name: "Bloom Disc Notebook", price: 1299, category: "desk-office", tint: PINK, image: "/products/bloom-disc-notebook.jpg", blurb: "A refillable disc-bound cover in wavy pink, orange and mint.", description: OBJ_DESC, specs: objSpecs("A5 · 9 discs", "Pink · orange · mint") },
  { slug: "wave-zip-pouch", name: "Wave Zip Pouch", price: 1149, compareAt: 1499, category: "desk-office", badge: "Sale", tint: LILAC, image: "/products/wave-zip-pouch.jpg", blurb: "A ribbed, rounded case with a flower zip pull.", description: OBJ_DESC, specs: objSpecs("21 × 9 × 7 cm", "Pink · purple · blue") },

  // ── DIY Kits ─────────────────────────────────────────────────────────────
  { slug: "purple-door-apartment", name: "Purple Door Apartment", price: 3499, compareAt: 4999, category: "miniature-kits", badge: "New", tint: LILAC,
    image: "/products/purple-door-apartment.jpg",
    images: [
      "/products/purple-door-apartment.jpg",
      "/products/purple-door-apartment-lit.jpg",
      "/products/purple-door-apartment-contents.jpg",
      "/products/purple-door-apartment-box.jpg",
      "/products/purple-door-apartment-parts.jpg",
    ],
    blurb: "A cozy city apartment filled with charm, colour and beautiful details — yours to build.",
    description: "Precision laser-cut from eco-friendly MDF, with warm LED lighting, furniture and décor included, and a step-by-step assembly guide. The kitchen, the living room, the purple door and every little detail arrive in one box.",
    specs: [{ label: "Scale", value: "1:12" }, { label: "Level", value: "Moderate" }, { label: "Ages", value: "14+" }] },
];

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
