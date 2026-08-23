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
  { image: "/products/bubble-bloom.jpg", slug: "vases", name: "Vases & Planters", family: "objects", blurb: "Bubbled, ribbed vessels built for a handful of stems.", tint: MINT },
  { image: "/products/glow-stack.jpg", slug: "lighting", name: "Lamps & Lighting", family: "objects", blurb: "Sculpted shades and stacked bases that throw a warm glow.", tint: YELLOW },

  // ── DIY Kits ─────────────────────────────────────────────────────────────
  { slug: "miniature-kits", name: "Miniature Kits", family: "kits", blurb: "Room boxes and little worlds you build yourself, lights and all.", tint: LILAC, image: "/products/purple-door-apartment.jpg" },
];

const OBJ_DESC =
  "Designed in our studio and 3D-printed in small batches, then hand-finished and checked before it ships. Made from durable plant-based PLA — sturdy enough for daily use, and recyclable at end of life.";

const LAMP_DESC =
  "Designed in our studio and 3D-printed in small batches, then hand-finished and wired before it ships. The shade is printed in translucent plant-based PLA so the light spreads evenly rather than glaring, and it arrives with a warm LED and an inline switch.";

const lampSpecs = (finish: string, kind = "Table lamp"): Spec[] => [
  { label: "Material", value: "PLA" },
  { label: "Finish", value: finish },
  { label: "Type", value: kind },
];

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
  // ── 3D Objects — second range, named and priced by the studio ────────────
  { slug: "dabble-dock", name: "Dabble Dock – Desk & Vanity Organizer", price: 2499, compareAt: 2899, category: "desk-office", badge: "Best Seller", tint: PINK, image: "/products/dabble-dock.jpg", blurb: "One colourful station for pens, brushes and everything else on the desk.", description: OBJ_DESC, specs: [{ label: "Material", value: "PLA" }, { label: "Finish", value: "Pink · orange · green" }, { label: "Made", value: "Printed to order" }] },
  { slug: "cubby-pop", name: "Cubby Pop – Multi-Drawer Organizer", price: 2799, compareAt: 3199, category: "vanity-storage", badge: "Sale", tint: PINK, image: "/products/cubby-pop.jpg", blurb: "Seven little drawers, every one a different colour.", description: OBJ_DESC, specs: [{ label: "Material", value: "PLA" }, { label: "Finish", value: "Pink · multi drawers" }, { label: "Made", value: "Printed to order" }] },
  { slug: "dotty-pods", name: "Dotty Pods – Storage Canisters, Set of 3", price: 1599, compareAt: 1899, category: "vanity-storage", badge: "Sale", tint: ORANGE, image: "/products/dotty-pods.jpg", blurb: "Three lidded pots with flower handles, on a matching tray.", description: OBJ_DESC, specs: [{ label: "Material", value: "PLA" }, { label: "Set", value: "3 canisters + tray" }, { label: "Made", value: "Printed to order" }] },
  { slug: "bubble-bloom", name: "Bubble Bloom – Sculptural Vase Set of 3", price: 1999, compareAt: 2399, category: "vases", badge: "New", tint: MINT, image: "/products/bubble-bloom.jpg", blurb: "Bubbled, ribbed vases in three heights and three colours.", description: OBJ_DESC, specs: [{ label: "Material", value: "PLA" }, { label: "Set", value: "3 vases" }, { label: "Finish", value: "Orange · blush · pink" }] },
  { slug: "petal-oclock", name: "Petal O’Clock – Flower Wall Clock", price: 1799, compareAt: 2199, category: "wall", badge: "Best Seller", tint: PINK, image: "/products/petal-oclock.jpg", blurb: "A layered flower that happens to tell the time.", description: OBJ_DESC, specs: [{ label: "Material", value: "PLA" }, { label: "Finish", value: "Red · pink · apricot" }, { label: "Made", value: "Printed to order" }] },
  { slug: "glow-stack", name: "Glow Stack – Sculptural Table Lamp", price: 3499, compareAt: 3999, category: "lighting", badge: "New", tint: PINK, image: "/products/glow-stack.jpg", blurb: "Four ribbed orbs stacked under a pleated shade.", description: OBJ_DESC, specs: [{ label: "Material", value: "PLA" }, { label: "Finish", value: "Pink · amber · sage" }, { label: "Made", value: "Printed to order" }] },
  { slug: "page-perch", name: "Page Perch – Book & Tablet Organizer with Drawers", price: 2299, compareAt: 2699, category: "desk-office", badge: "Sale", tint: PINK, image: "/products/page-perch.jpg", blurb: "Props up a book or a tablet, with two drawers underneath.", description: OBJ_DESC, specs: [{ label: "Material", value: "PLA" }, { label: "Drawers", value: "2" }, { label: "Made", value: "Printed to order" }] },
  { slug: "petal-pages", name: "Petal Pages – Refillable Ring Notebook", price: 1299, compareAt: 1499, category: "desk-office", badge: "New", tint: ORANGE, image: "/products/petal-pages.jpg", blurb: "A raised floral cover on rings, so the pages refill.", description: OBJ_DESC, specs: [{ label: "Material", value: "PLA cover" }, { label: "Binding", value: "Refillable rings" }, { label: "Made", value: "Printed to order" }] },
  { slug: "vanity-garden", name: "Vanity Garden – Makeup & Jewellery Organizer", price: 2499, compareAt: 2899, category: "vanity-storage", badge: "Best Seller", tint: ORANGE, image: "/products/vanity-garden.jpg", blurb: "Trays, pots and a ring holder that group into one garden.", description: OBJ_DESC, specs: [{ label: "Material", value: "PLA" }, { label: "Finish", value: "Cream · coral · mint" }, { label: "Made", value: "Printed to order" }] },
  { slug: "desk-sidekicks", name: "Desk Sidekicks – 3-Piece Desk Organizer Set", price: 1999, compareAt: 2399, category: "desk-office", badge: "New", tint: MINT, image: "/products/desk-sidekicks.jpg", blurb: "A phone stand, a pen pot and a drawer box that match.", description: OBJ_DESC, specs: [{ label: "Material", value: "PLA" }, { label: "Set", value: "3 pieces" }, { label: "Made", value: "Printed to order" }] },


  // ── Lamps — third range ──────────────────────────────────────────────────
  { slug: "ribbon-twist-lamp", name: "Ribbon Twist – Table Lamp", price: 2999, compareAt: 3599, category: "lighting", badge: "New", tint: PINK, image: "/products/ribbon-twist-lamp.jpg", blurb: "A ribbon of colour curled into a base, under a scalloped shade.", description: LAMP_DESC, specs: lampSpecs("Pink · coral · violet") },
  { slug: "tulip-glow-lamp", name: "Tulip Glow – Petal Table Lamp", price: 3299, compareAt: 3899, category: "lighting", badge: "Best Seller", tint: PINK, image: "/products/tulip-glow-lamp.jpg", blurb: "Open petals around a warm bulb, on a soft green stem.", description: LAMP_DESC, specs: lampSpecs("Pink · orange · sage") },
  { slug: "toadstool-lamp", name: "Toadstool – Scalloped Table Lamp", price: 3499, compareAt: 3999, category: "lighting", badge: "Best Seller", tint: PINK, image: "/products/toadstool-lamp.jpg", blurb: "A scalloped pink cap on a ribbed, bobbled orange stem.", description: LAMP_DESC, specs: lampSpecs("Pink cap · orange stem") },
  { slug: "pebble-stack-lamp", name: "Pebble Stack – Orb Table Lamp", price: 3199, compareAt: 3799, category: "lighting", badge: "New", tint: BLUE, image: "/products/pebble-stack-lamp.jpg", blurb: "Balanced pebbles in six colours, topped with a glowing orb.", description: LAMP_DESC, specs: lampSpecs("Lilac · blue · lime · pink") },
  { slug: "cloudbloom-lamp", name: "Cloudbloom – Panel Table Lamp", price: 2999, compareAt: 3599, category: "lighting", badge: "Sale", tint: LILAC, image: "/products/cloudbloom-lamp.jpg", blurb: "Layered cloud petals throwing a soft panel of light.", description: LAMP_DESC, specs: lampSpecs("Orange · pink · violet") },
  { slug: "lily-trumpet-lamp", name: "Lily Trumpet – Stem Table Lamp", price: 3399, compareAt: 3999, category: "lighting", badge: "New", tint: PINK, image: "/products/lily-trumpet-lamp.jpg", blurb: "A trumpet bloom on a long curved stem, light pooling upward.", description: LAMP_DESC, specs: lampSpecs("Pink · cobalt · sage") },
  { slug: "loop-de-loop-lamp", name: "Loop de Loop – Sculptural Lamp", price: 3799, compareAt: 4499, category: "lighting", badge: "New", tint: PINK, image: "/products/loop-de-loop-lamp.jpg", blurb: "One continuous loop with the light running through its centre.", description: LAMP_DESC, specs: lampSpecs("Magenta · lilac") },
  { slug: "daisy-days-lamp", name: "Daisy Days – Flower Table Lamp", price: 2799, compareAt: 3299, category: "lighting", badge: "Sale", tint: ORANGE, image: "/products/daisy-days-lamp.jpg", blurb: "A single daisy on a leaning green stem, rooted in a pink puddle.", description: LAMP_DESC, specs: lampSpecs("Orange · green · pink") },
  { slug: "duneglow-lamp", name: "Duneglow – Ribbed Table Lamp", price: 3299, compareAt: 3899, category: "lighting", badge: "Sale", tint: LILAC, image: "/products/duneglow-lamp.jpg", blurb: "Ribbed dunes of colour with light spilling from the top.", description: LAMP_DESC, specs: lampSpecs("Lilac · purple · orange · blue") },
  { slug: "coral-bloom-floor-lamp", name: "Coral Bloom – Sculptural Floor Lamp", price: 7999, compareAt: 9499, category: "lighting", badge: "Best Seller", tint: PINK, image: "/products/coral-bloom-floor-lamp.jpg", blurb: "A floor-standing coral form, lit from inside at every opening.", description: LAMP_DESC, specs: lampSpecs("Magenta · coral · cobalt", "Floor lamp") },

  // ── DIY Kits ─────────────────────────────────────────────────────────────
  { slug: "fallingwater-kit", name: "Fallingwater House – DIY Miniature Kit", price: 2499, compareAt: 3999, category: "miniature-kits", badge: "Sale", tint: MINT,
    image: "/products/fallingwater-kit.jpg",
    images: [
      "/products/fallingwater-kit.jpg",
      "/products/fallingwater-kit-night.jpg",
      "/products/fallingwater-kit-box.jpg",
      "/products/fallingwater-kit-parts.jpg",
      "/products/fallingwater-kit-sheets.jpg",
    ],
    blurb: "Build an architectural masterpiece in miniature — a relaxing, rewarding evening's work.",
    description: "Eight laser-cut sheets of 3 mm MDF (210 × 148 mm) assemble by tab and slot into the cantilevered terraces and stone chimney. The kit includes window frames and railings, moulded acrylic for the waterfall and pool, rocks, pebbles and moss, trees and shrubs, a USB LED light string so the model glows after dark, a brass nameplate and a full illustrated assembly manual.",
    specs: [{ label: "Pieces", value: "290" }, { label: "Level", value: "Advanced" }, { label: "Ages", value: "14+" }] },
  { slug: "the-office-kit", name: "The Office Series – DIY Miniature Kit", price: 2999, compareAt: 3999, category: "miniature-kits", badge: "Best Seller", tint: MINT,
    image: "/products/the-office-kit.jpg",
    images: [
      "/products/the-office-kit.jpg",
      "/products/the-office-kit-night.jpg",
      "/products/the-office-kit-size.jpg",
      "/products/the-office-kit-box.jpg",
      "/products/the-office-kit-parts.jpg",
    ],
    blurb: "Recreate the Dunder Mifflin Scranton office exterior — a tribute to your favourite workplace.",
    description: "Everything arrives in one box: precision laser-cut eco-friendly MDF, window glazing, the Scranton Business Park sign, tree and shrub landscaping, gravel and stone, warm LED lighting with wiring and a battery box, tools, and a step-by-step instruction manual. The finished model measures 24 × 18 × 11.5 cm (9.45 × 7.1 × 4.5 in).",
    specs: [{ label: "Pieces", value: "280" }, { label: "Level", value: "Moderate" }, { label: "Ages", value: "14+" }] },
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
