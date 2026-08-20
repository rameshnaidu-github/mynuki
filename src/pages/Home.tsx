import { Link } from "react-router-dom";
import { categories, products } from "../data/catalog";
import ProductCard from "../components/ProductCard";

const featuredCats = ["shops-cafes", "houses", "candles", "painting"]
  .map((s) => categories.find((c) => c.slug === s)!)
  .filter(Boolean);

const standards = [
  { title: "Everything in the box", body: "Laser-cut parts, miniature details, tools, glue, LED lighting and an illustrated manual. Open, and begin." },
  { title: "Made to be made", body: "Beginner-friendly and unhurried — around three hours of calm, satisfying assembly." },
  { title: "Crafted to last", body: "Real wood, quality materials and a finish worth keeping on the shelf for years." },
];

export default function Home() {
  return (
    <div>
      {/* 3 · HERO */}
      <section className="relative">
        <div
          className="ph min-h-[440px] md:min-h-[560px]"
          data-label="Lifestyle build scene — hero photo"
          style={{ ["--ph-a" as string]: "#e7e5df", ["--ph-b" as string]: "#cdc4b2" }}
        />
        <div className="absolute inset-0">
          <div className="max-w-6xl mx-auto px-6 h-full flex items-center">
            <div className="bg-butter/95 rounded-3xl p-8 md:p-10 max-w-sm shadow-sm">
              <span className="eyebrow">DIY Miniature</span>
              <h1 className="text-4xl md:text-5xl mt-3">Little worlds, made by hand</h1>
              <p className="mt-4 text-inksoft font-light">
                Build and light your own tiny shop, home or scene — a curated world of
                hand-crafted kits for slow, mindful making.
              </p>
              <Link to="/shop" className="btn-primary mt-6">Shop the collection</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 · CATEGORY GRID */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl">Curated for calm making</h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">
          {featuredCats.map((c) => (
            <Link key={c.slug} to={`/shop?category=${c.slug}`} className="group block">
              <div
                className="ph aspect-[4/5] rounded-2xl border border-line"
                data-label={c.name}
                style={{ ["--ph-a" as string]: c.tint[0], ["--ph-b" as string]: c.tint[1] }}
              />
              <div className="mt-3 text-center text-sm font-medium text-ink group-hover:text-forest transition-colors">
                {c.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5 · MAKE IT YOURS (customization) */}
      <section className="bg-foresttint">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
          <span className="eyebrow">Make It Yours</span>
          <h2 className="text-3xl md:text-4xl mt-3">
            Request a custom kit — your colours, your scene, your little world
          </h2>
          <p className="mt-4 text-inksoft font-light">
            Tell us what you have in mind and we’ll put together a bespoke build. Send a
            reference, pick a palette, and we’ll quote you back.
          </p>
          <Link to="/customize" className="btn-primary mt-7">Start a request</Link>
        </div>
      </section>

      {/* 6 · FEATURED PRODUCTS */}
      <section className="bg-blush">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl md:text-4xl">Loved by makers</h2>
            <Link to="/shop" className="btn-outline shrink-0">View all</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {products.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 7 · WHY MYNUKI */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl text-center">Our gentle standard</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {standards.map((s) => (
            <div key={s.title} className="bg-mist rounded-2xl p-7 text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-cream flex items-center justify-center text-forest">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl mt-4">{s.title}</h3>
              <p className="mt-2 text-sm text-inksoft font-light">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8 · A MAKER'S NOTE */}
      <section className="max-w-3xl mx-auto px-6 pb-16 md:pb-20 text-center">
        <h2 className="text-3xl md:text-4xl">A maker’s note</h2>
        <p className="mt-4 text-inksoft font-light text-lg leading-relaxed">
          We believe the things we make by hand hold a little more of us. MyNuki is an
          invitation to slow down, to build something small and complete, and to keep the
          quiet joy of it on your shelf.
        </p>
      </section>

      {/* 9 · NEWSLETTER */}
      <section className="bg-forest text-cream">
        <div className="max-w-2xl mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl text-cream">Join the workshop</h2>
          <p className="mt-3 text-cream/75 font-light">
            Early access to new kits, seasonal drops and the occasional making tip.
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
              className="rounded-full px-5 py-3 text-ink bg-cream w-full sm:w-72 outline-none"
            />
            <button type="submit" className="btn-primary bg-butter text-forest hover:bg-sand">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
