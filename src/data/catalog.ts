// Mock catalog for the catalog slice. Swapped for Supabase queries later; the
// shape here mirrors the planned `products` / `categories` tables. Prices in INR.

export type Family = "miniature" | "other";

export interface Category {
  slug: string;
  name: string;
  family: Family;
  blurb: string;
  tint: [string, string]; // placeholder gradient a→b
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
  pieces: number;
  buildTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export const familyLabels: Record<Family, string> = {
  miniature: "DIY Miniature",
  other: "Other DIY",
};

export const categories: Category[] = [
  { slug: "shops-cafes", name: "Shops & Cafés", family: "miniature", blurb: "Tiny storefronts and cosy cafés you build and light up.", tint: ["#e7ebe2", "#cdd6c6"] },
  { slug: "houses", name: "Houses", family: "miniature", blurb: "Little homes, room by room.", tint: ["#f1e8e2", "#e2cfc4"] },
  { slug: "rooms-boxes", name: "Rooms & Boxes", family: "miniature", blurb: "Single-room scenes and keepsake boxes.", tint: ["#efe7c4", "#ddd0a0"] },
  { slug: "seasonal", name: "Seasonal Scenes", family: "miniature", blurb: "Festive and seasonal miniatures.", tint: ["#e7e5df", "#d3cdbd"] },
  { slug: "painting", name: "Painting", family: "other", blurb: "Paint-by-number and canvas kits.", tint: ["#e7ebe2", "#c9d3c2"] },
  { slug: "indian-art", name: "Indian Art", family: "other", blurb: "Madhubani, Warli and more.", tint: ["#f1e8e2", "#e3ccbe"] },
  { slug: "candles", name: "Candles", family: "other", blurb: "Pour, scent and set your own.", tint: ["#efe7c4", "#ded09e"] },
  { slug: "resin", name: "Resin", family: "other", blurb: "Coasters, keepsakes and jewellery.", tint: ["#e7e5df", "#d1cabb"] },
  { slug: "clay", name: "Clay", family: "other", blurb: "Air-dry and polymer clay sets.", tint: ["#f1e8e2", "#dfc9bd"] },
  { slug: "jewellery", name: "Jewellery", family: "other", blurb: "Beads, wire and charms.", tint: ["#e7ebe2", "#ccd5c4"] },
  { slug: "embroidery", name: "Embroidery", family: "other", blurb: "Hoops, thread and patterns.", tint: ["#efe7c4", "#dccf9c"] },
  { slug: "decor", name: "Décor", family: "other", blurb: "Make-it-yourself home pieces.", tint: ["#e7e5df", "#d3cdbd"] },
  { slug: "model-building", name: "Model Building", family: "other", blurb: "Mechanical and architectural models.", tint: ["#e7ebe2", "#c9d3c2"] },
  { slug: "festive", name: "Festive", family: "other", blurb: "Diwali, Christmas and celebration kits.", tint: ["#f1e8e2", "#e3ccbe"] },
];

const D =
  "A complete, self-contained kit — every laser-cut part, miniature detail, tool and a step-by-step illustrated manual arrive in one box. Made for slow, mindful building and a keepsake worth displaying.";

export const products: Product[] = [
  { slug: "petals-and-posies", name: "Petals & Posies Flower Shop", price: 2499, compareAt: 2999, category: "shops-cafes", badge: "Best Seller", tint: ["#e7ebe2", "#cdd6c6"], image: "/products/petals-and-posies.svg", blurb: "A sunlit corner florist with a striped awning.", description: D, pieces: 220, buildTime: "3–4 hours", difficulty: "Intermediate" },
  { slug: "corner-coffee-house", name: "Corner Coffee House", price: 2699, category: "shops-cafes", badge: "New", tint: ["#f1e8e2", "#e2cfc4"], blurb: "A warm little café with working lights.", description: D, pieces: 240, buildTime: "4 hours", difficulty: "Intermediate" },
  { slug: "old-town-bookstore", name: "Old Town Bookstore", price: 2399, category: "shops-cafes", tint: ["#efe7c4", "#ddd0a0"], blurb: "Shelves of tiny books and a reading nook.", description: D, pieces: 210, buildTime: "3–4 hours", difficulty: "Intermediate" },

  { slug: "modern-luxury-house", name: "Modern Luxury House", price: 3299, category: "houses", badge: "New", tint: ["#f1e8e2", "#e2cfc4"], blurb: "A two-storey modern home, fully furnished.", description: D, pieces: 320, buildTime: "5–6 hours", difficulty: "Advanced" },
  { slug: "sunday-cottage", name: "Sunday Cottage", price: 2599, category: "houses", tint: ["#e7ebe2", "#cdd6c6"], blurb: "A cosy countryside cottage with a garden.", description: D, pieces: 260, buildTime: "4 hours", difficulty: "Intermediate" },

  { slug: "cozy-book-nook", name: "Cozy Book Nook", price: 1899, category: "rooms-boxes", badge: "Best Seller", tint: ["#efe7c4", "#ddd0a0"], blurb: "A shelf-insert alley that glows from within.", description: D, pieces: 180, buildTime: "3 hours", difficulty: "Beginner" },
  { slug: "artists-studio-box", name: "Artist’s Studio Box", price: 1999, category: "rooms-boxes", tint: ["#e7e5df", "#d3cdbd"], blurb: "A tiny studio scene in a keepsake box.", description: D, pieces: 190, buildTime: "3 hours", difficulty: "Beginner" },

  { slug: "winter-wonderland", name: "Winter Wonderland Scene", price: 2199, category: "seasonal", badge: "New", tint: ["#e7e5df", "#d3cdbd"], blurb: "A snowy village that lights up warm.", description: D, pieces: 200, buildTime: "3–4 hours", difficulty: "Intermediate" },
  { slug: "diwali-courtyard", name: "Diwali Courtyard", price: 2299, category: "seasonal", tint: ["#f1e8e2", "#e3ccbe"], blurb: "A festival courtyard with diyas aglow.", description: D, pieces: 210, buildTime: "3–4 hours", difficulty: "Intermediate" },

  { slug: "coastal-canvas", name: "Coastal Sunrise Canvas", price: 899, category: "painting", tint: ["#e7ebe2", "#c9d3c2"], blurb: "Paint-by-number on premium canvas.", description: D, pieces: 24, buildTime: "2–3 hours", difficulty: "Beginner" },
  { slug: "madhubani-canvas", name: "Madhubani Canvas Kit", price: 999, category: "indian-art", badge: "New", tint: ["#e7ebe2", "#c9d3c2"], blurb: "Traditional Madhubani, guided step by step.", description: D, pieces: 30, buildTime: "3 hours", difficulty: "Beginner" },
  { slug: "warli-wall-set", name: "Warli Wall Art Set", price: 949, category: "indian-art", tint: ["#f1e8e2", "#e3ccbe"], blurb: "Two Warli pieces for a gallery wall.", description: D, pieces: 28, buildTime: "3 hours", difficulty: "Beginner" },

  { slug: "sakura-candle-kit", name: "Sakura Candle-Making Kit", price: 799, compareAt: 1099, category: "candles", badge: "Sale", tint: ["#f1e8e2", "#e3ccbe"], blurb: "Pour three soy candles, cherry-blossom scent.", description: D, pieces: 12, buildTime: "1–2 hours", difficulty: "Beginner" },
  { slug: "ocean-resin-coasters", name: "Ocean Resin Coaster Set", price: 1199, category: "resin", tint: ["#e7e5df", "#d1cabb"], blurb: "Make four ocean-wave resin coasters.", description: D, pieces: 20, buildTime: "2 hours + cure", difficulty: "Intermediate" },
  { slug: "terrazzo-clay-trinket", name: "Terrazzo Clay Trinket Dishes", price: 849, category: "clay", tint: ["#f1e8e2", "#dfc9bd"], blurb: "Air-dry clay dishes with a terrazzo finish.", description: D, pieces: 16, buildTime: "2 hours", difficulty: "Beginner" },
  { slug: "beaded-charm-bracelets", name: "Beaded Charm Bracelet Kit", price: 699, category: "jewellery", tint: ["#e7ebe2", "#ccd5c4"], blurb: "Design three bracelets, mix-and-match charms.", description: D, pieces: 60, buildTime: "1–2 hours", difficulty: "Beginner" },
  { slug: "wildflower-hoop", name: "Wildflower Embroidery Hoop", price: 749, category: "embroidery", badge: "Best Seller", tint: ["#efe7c4", "#dccf9c"], blurb: "A blooming hoop with pre-printed pattern.", description: D, pieces: 14, buildTime: "3–4 hours", difficulty: "Beginner" },
  { slug: "macrame-wall-hanging", name: "Macramé Wall Hanging", price: 1049, category: "decor", tint: ["#e7e5df", "#d3cdbd"], blurb: "A boho wall piece with natural cotton cord.", description: D, pieces: 10, buildTime: "3 hours", difficulty: "Intermediate" },
  { slug: "clockwork-orrery", name: "Clockwork Orrery Model", price: 1899, category: "model-building", badge: "New", tint: ["#e7ebe2", "#c9d3c2"], blurb: "A moving mechanical solar-system model.", description: D, pieces: 150, buildTime: "4–5 hours", difficulty: "Advanced" },
  { slug: "festive-lantern-set", name: "Festive Lantern Set", price: 999, category: "festive", tint: ["#f1e8e2", "#e3ccbe"], blurb: "Three glowing paper-and-wood lanterns.", description: D, pieces: 40, buildTime: "2 hours", difficulty: "Beginner" },
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
