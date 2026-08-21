import { Link } from "react-router-dom";
import { categories, products } from "../data/catalog";
import ProductCard from "../components/ProductCard";

const featuredCats = ["desk-vanity", "frames", "planters", "lighting"]
  .map((s) => categories.find((c) => c.slug === s)!)
  .filter(Boolean);

const standards = [
  {
    title: "Designed, then made",
    body: "Every piece starts as a drawing and ends on a print bed in our studio. Small batches, tuned by hand.",
    tint: "bg-blush",
  },
  {
    title: "Colour you can't ignore",
    body: "We don't do beige. Each object is finished in shades picked to lift the corner of a room.",
    tint: "bg-peach",
  },
  {
    title: "Built to be used",
    body: "Sturdy, practical and repairable — objects meant for daily life, not a display shelf.",
    tint: "bg-cloud",
  },
];

export default function Home() {
  return (
    <div>
      {/* 1 · HERO — image with an offset orange block */}
      <section className="relative">
        <div
          className="ph min-h-[460px] md:min-h-[600px]"
          data-label="Hero photo — styled product scene"
          style={{ ["--ph-a" as string]: "#dfe9d8", ["--ph-b" as string]: "#f7cfc0" }}
        />
        <div className="absolute inset-0">
          <div className="max-w-6xl mx-auto px-6 h-full flex items-center">
            <div className="bg-flame rounded-[28px] p-8 md:p-11 max-w-md shadow-xl">
              <h1 className="font-display text-[44px] md:text-[62px] leading-[0.95] font-semibold text-bloom">
                Dabble<br />&amp; Dahlia
              </h1>
              <p className="mt-5 text-white/95 text-[16px] md:text-[17px] leading-relaxed">
                Bold 3D-printed objects and DIY kits for people who like their homes
                a little louder. Designed and made in small batches.
              </p>
              <Link to="/shop" className="btn-primary mt-7">Shop the collection</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · FEATURED PRODUCTS */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display-tilt text-[38px] md:text-[46px] text-flame">Loved by makers</h2>
          <Link to="/shop" className="btn-outline shrink-0">Shop all</Link>
        </div>
        <div className="mt-9 grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-9">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} p={p} showAddToCart />
          ))}
        </div>
      </section>

      {/* 3 · OUR STORY — full-bleed red band */}
      <section className="bg-berry text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <h2 className="display-tilt text-[38px] md:text-[46px] text-bloom">Our story</h2>
          <div className="mt-7 grid md:grid-cols-2 gap-8 text-[16px] leading-relaxed text-white/95">
            <p>
              Dabble &amp; Dahlia began on a kitchen table with one small 3D printer and
              a stubborn idea: the everyday objects around us should be a bit more fun.
              A desk organiser worth looking at. A frame that makes you smile.
            </p>
            <p>
              We design each piece ourselves, print it in small batches, and finish it by
              hand. Alongside our objects we make DIY kits, so you can have the pleasure
              of building something yourself — and keep it when you're done.
            </p>
          </div>
          <Link
            to="/story"
            className="inline-flex items-center gap-2 mt-8 bg-white text-berry font-display font-medium text-[15px] px-6 py-3 rounded-full hover:bg-blush transition-colors"
          >
            Learn more
          </Link>
        </div>
      </section>

      {/* 4 · SHOP BY CATEGORY */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <h2 className="display-tilt text-[38px] md:text-[46px] text-bloom">Shop by category</h2>
        <div className="mt-9 grid grid-cols-2 md:grid-cols-4 gap-5">
          {featuredCats.map((c) => (
            <Link key={c.slug} to={`/shop?category=${c.slug}`} className="group block">
              <div
                className="ph aspect-[4/5] rounded-[22px] border-2 border-line group-hover:border-flame transition-colors"
                data-label={c.name}
                style={{ ["--ph-a" as string]: c.tint[0], ["--ph-b" as string]: c.tint[1] }}
              />
              <div className="mt-3 text-center font-display text-[16px] font-medium text-ink group-hover:text-flame transition-colors">
                {c.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5 · MAKE IT YOURS */}
      <section className="bg-peach">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
          <span className="eyebrow text-flame">Make it yours</span>
          <h2 className="text-[34px] md:text-[44px] mt-3">
            Want it in your colours? We take custom orders.
          </h2>
          <p className="mt-4 text-inksoft text-[16px]">
            Tell us the piece, the palette and the occasion — we'll design it, print it and
            send you a quote before you pay a rupee.
          </p>
          <Link to="/customize" className="btn-brand mt-7">Start a request</Link>
        </div>
      </section>

      {/* 6 · WHY */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <h2 className="display-tilt text-[38px] md:text-[46px] text-flame">Why Dabble &amp; Dahlia</h2>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {standards.map((s) => (
            <div key={s.title} className={`${s.tint} rounded-[22px] p-7`}>
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-flame">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-[21px] mt-4">{s.title}</h3>
              <p className="mt-2 text-[15px] text-inksoft leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7 · NEWSLETTER */}
      <section className="bg-ink text-white">
        <div className="max-w-2xl mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="text-[34px] md:text-[44px] text-bloom">Join the studio list</h2>
          <p className="mt-3 text-white/80 text-[16px]">
            New drops, restocks and the occasional behind-the-scenes misprint.
          </p>
          <form
            className="mt-7 flex flex-col sm:flex-row gap-3 justify-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input
              id="nl-email"
              type="email"
              required
              placeholder="Enter your email"
              className="rounded-full px-5 py-3 text-ink bg-white w-full sm:w-72 outline-none border-2 border-transparent focus:border-bloom"
            />
            <button type="submit" className="btn-brand">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
