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
                <Link
                  to="/shop"
                  className="inline-block mt-[9%] bg-gold text-royal font-display italic
                             text-[clamp(15px,1.5vw,21px)] px-[1.6em] py-[0.42em] rounded-full
                             hover:brightness-105 transition"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · YELLOW BAND */}
      <section className="bg-sun">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-6 flex items-center justify-between gap-4">
          <h2 className="font-display italic text-[#a83c12] text-[26px] sm:text-[32px]">Loved by Makers</h2>
          <Link
            to="/shop"
            className="bg-flame text-white text-[12.5px] px-6 py-2.5 rounded-full hover:bg-flamedeep transition-colors shrink-0"
          >
            Order Now
          </Link>
        </div>
      </section>

      {/* 3 · ALL PRODUCTS */}
      <section className="bg-sun/95 pb-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <h3 className="font-display italic text-[22px] text-ink pb-4">All Products</h3>
          <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 snap-x">
            {featured.map((p) => (
              <div key={p.slug} className="w-[210px] sm:w-[240px] shrink-0 snap-start">
                <ProductCard p={p} showAddToCart />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · OUR STORY — gradient band */}
      <section
        className="py-16 md:py-20"
        style={{
          background:
            "linear-gradient(100deg, #ffeaf3 0%, #ff6fb0 32%, #ff7a2f 68%, #ffd84a 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <h2 className="font-display italic text-white text-[30px] md:text-[38px]">Our Story</h2>
          <div className="mt-5 grid md:grid-cols-2 gap-8 text-white/95 text-[15px] leading-relaxed max-w-4xl">
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
            className="inline-block mt-8 border border-white text-white text-[13px] px-7 py-2.5 rounded-full hover:bg-white hover:text-flame transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* 5 · GALLERY */}
      <section className="bg-white py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            <figure>
              <img src="/products/petal-vanity-organiser.jpg" alt="Petal vanity organiser on a dresser" className="w-full aspect-[4/3] object-cover rounded-2xl" />
              <figcaption className="mt-3">
                <span className="font-display italic text-bloom text-[19px]">Made to be used</span>
                <p className="mt-1 text-[14px] text-inksoft leading-relaxed">
                  Drawers that actually slide, trays that hold what you own.
                </p>
              </figcaption>
            </figure>
            <figure>
              <img src="/products/bloom-memo-board.jpg" alt="Bloom memo board styled on a wall" className="w-full aspect-[4/3] object-cover rounded-2xl" />
              <figcaption className="mt-3">
                <span className="font-display italic text-bloom text-[19px]">Yours, if you want it</span>
                <p className="mt-1 text-[14px] text-inksoft leading-relaxed">
                  Every piece can be made in your palette — we quote before you pay.
                </p>
              </figcaption>
            </figure>
            <figure>
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
  );
}
