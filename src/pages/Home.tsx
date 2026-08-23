import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/catalog";
import ProductCard from "../components/ProductCard";

// Ordered as on the storefront: the apartment leads, then the objects.
const FEATURED_ORDER = [
  "purple-door-apartment",
  "petal-vanity-organiser",
  "armchair-trinket-stand",
  "wavy-photo-frame",
];
const featured = [
  ...FEATURED_ORDER.map((s) => products.find((p) => p.slug === s)).filter(Boolean),
  ...products.filter((p) => !FEATURED_ORDER.includes(p.slug)),
].slice(0, 8) as typeof products;

export default function Home() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(updateArrows, [updateArrows]);

  function scrollRail(dir: 1 | -1) {
    const el = railRef.current;
    if (!el) return;
    // move by whole cards so the rail always lands on a card edge
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  }

  return (
    <div>
      {/* 1 · HERO — fills the screen below the nav, so nothing else shows until you scroll */}
      <section className="relative h-[calc(100svh-52px)] min-h-[560px] overflow-hidden">
        <img
          src="/hero-art.jpg"
          alt="A miniature house set in a painted, Van Gogh-style landscape, captioned: God sends us pieces of art so that we may see ourselves in them"
          className="absolute inset-0 w-full h-full object-cover object-[72%_top]"
        />

        <div className="absolute inset-0">
          <div className="max-w-[1352px] mx-auto h-full px-[5.5%] flex items-center">
            <div
              className="w-[74%] sm:w-[52%] md:w-[41%] max-w-[545px] md:aspect-[545/742] max-h-[calc(100svh-120px)]
                         bg-heroblock/[0.88] border-[3px] border-gold rounded-[22px]
                         px-[9%] py-[8%] flex flex-col justify-center gap-[10%]"
            >
              <h1 className="font-display italic font-normal text-gold text-center leading-[1.04]
                             text-[clamp(40px,6.3vw,88px)]">
                Dabble<br />And<br />Dahlia
              </h1>

              <div>
                <p className="text-babypink font-medium text-[clamp(14px,1.3vw,17px)] leading-[1.6]">
                  Colour-drenched homeware and build-it-yourself miniature worlds. Every
                  piece is designed in our studio, 3D-printed to order and finished by
                  hand — so what lands on your desk is yours alone.
                </p>
                <div className="mt-[9%] text-center">
                  <Link
                    to="/shop"
                    className="inline-block bg-gold text-royal font-display italic
                               text-[clamp(15px,1.5vw,21px)] px-[1.6em] py-[0.42em] rounded-full
                               hover:brightness-105 transition"
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* One ground runs behind every band below the hero, so the colour
          moves gradually down the page instead of stepping at each edge. */}
      <div
        style={{
          background:
            "linear-gradient(180deg, #fff8fc 0%, #ffeef6 12%, #ffe0ee 26%, #ffd2e3 40%," +
            " #ffcdd6 52%, #ffd0c4 64%, #ffdcc4 76%, #ffe8cc 88%, #fff5e4 100%)",
        }}
      >
        {/* 2 · SHOP BY FAMILY */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <h2 data-reveal className="font-display italic text-flame text-[28px] md:text-[34px]">
              Two ways to make a world
            </h2>
            <div className="mt-8 grid sm:grid-cols-2 gap-5 md:gap-7">
              <Link to="/kits" data-reveal className="group block">
                <div className="relative overflow-hidden rounded-[22px] border-2 border-line group-hover:border-flame transition-colors">
                  <img
                    src="/products/purple-door-apartment.jpg"
                    alt="The Purple Door Apartment miniature room box"
                    className="w-full aspect-[16/10] object-cover card-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <span className="font-display italic text-cream text-[26px] md:text-[32px] leading-none">
                      DIY Miniature
                    </span>
                    <p className="mt-1.5 text-[14px] text-cream/90">
                      Room boxes and little worlds you build yourself, lights and all.
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/objects" data-reveal style={{ ["--reveal-delay" as string]: "90ms" }} className="group block">
                <div className="relative overflow-hidden rounded-[22px] border-2 border-line group-hover:border-flame transition-colors">
                  <img
                    src="/products/dabble-dock.jpg"
                    alt="Dabble Dock desk and vanity organiser"
                    className="w-full aspect-[16/10] object-cover card-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <span className="font-display italic text-cream text-[26px] md:text-[32px] leading-none">
                      3D Objects
                    </span>
                    <p className="mt-1.5 text-[14px] text-cream/90">
                      Sculptural pieces for the desk, the wall and the dressing table.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 3 · ALL PRODUCTS — horizontally scrolled rail with arrows */}
        <section className="pb-12 pt-4">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <div className="flex items-end justify-between gap-4 pb-4">
              <h2 data-reveal className="font-display italic text-[28px] md:text-[34px] text-flame">All Products</h2>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollRail(-1)}
                  aria-label="Scroll products left"
                  className="w-10 h-10 rounded-full border-2 border-ink text-ink grid place-items-center
                             hover:bg-ink hover:text-white transition-colors disabled:opacity-30
                             disabled:hover:bg-transparent disabled:hover:text-ink"
                  disabled={!canLeft}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollRail(1)}
                  aria-label="Scroll products right"
                  className="w-10 h-10 rounded-full border-2 border-ink text-ink grid place-items-center
                             hover:bg-ink hover:text-white transition-colors disabled:opacity-30
                             disabled:hover:bg-transparent disabled:hover:text-ink"
                  disabled={!canRight}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={railRef}
              onScroll={updateArrows}
              className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 snap-x scroll-smooth"
            >
              {featured.map((p) => (
                <div key={p.slug} className="w-[210px] sm:w-[240px] shrink-0 snap-start">
                  <ProductCard p={p} showAddToCart />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 · OUR STORY — gradient band */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <h2 data-reveal className="font-display italic text-flame text-[32px] md:text-[40px]">Our Story</h2>
            <div className="mt-5 grid md:grid-cols-2 gap-8 text-inksoft text-[15px] leading-relaxed max-w-4xl">
              <p>
                Dabble &amp; Dahlia started on a kitchen table with one small printer and a
                stubborn idea: the everyday things around us should be a little more fun to
                look at.
              </p>
              <p>
                We draw each piece ourselves, print it in small batches and finish it by hand
                — so the object on your desk was made for you, not stamped out by the
                thousand.
              </p>
            </div>
            <Link
              to="/story"
              className="inline-block mt-8 border-2 border-ink text-ink text-[13px] px-7 py-2.5 rounded-full hover:bg-ink hover:text-white transition-colors"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* 6 · GALLERY — continues the Our Story gradient, lightened */}
        <section className="py-14 md:py-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <div className="grid sm:grid-cols-3 gap-6">
              <figure data-reveal>
                <img src="/products/petal-vanity-organiser.jpg" alt="Petal vanity organiser on a dresser" className="w-full aspect-[4/3] object-cover rounded-2xl" />
                <figcaption className="mt-3">
                  <span className="font-display italic text-bloom text-[19px]">Made to be used</span>
                  <p className="mt-1 text-[14px] text-inksoft leading-relaxed">
                    Drawers that actually slide, trays that hold what you own.
                  </p>
                </figcaption>
              </figure>
              <figure data-reveal style={{ ["--reveal-delay" as string]: "90ms" }}>
                <img src="/products/bloom-memo-board.jpg" alt="Bloom memo board styled on a wall" className="w-full aspect-[4/3] object-cover rounded-2xl" />
                <figcaption className="mt-3">
                  <span className="font-display italic text-bloom text-[19px]">Yours, if you want it</span>
                  <p className="mt-1 text-[14px] text-inksoft leading-relaxed">
                    Every piece can be made in your palette — we quote before you pay.
                  </p>
                </figcaption>
              </figure>
              <figure data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
                <img src="/products/wave-magazine-holder.jpg" alt="Wave magazine holder filled with magazines" className="w-full aspect-[4/3] object-cover rounded-2xl" />
                <figcaption className="mt-3">
                  <span className="font-display italic text-bloom text-[19px]">Colour, first</span>
                  <p className="mt-1 text-[14px] text-inksoft leading-relaxed">
                    Shades picked to lift a corner of a room. Nothing beige.
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
