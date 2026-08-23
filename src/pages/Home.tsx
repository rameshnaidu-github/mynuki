import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* 1 · HERO — fills the screen below the nav, so nothing else shows until you scroll */}
      <section className="relative h-[calc(100svh-60px)] min-h-[560px] overflow-hidden">
        {/* The frame matches the artwork's own box, so every overlay below is
            positioned in percentages of the painting rather than of the screen. */}
        <div className="hero-frame">
          <img
            src="/hero-art.jpg"
            alt="A miniature house set in a painted, Van Gogh-style landscape, captioned: God sends us pieces of art so that we may see ourselves in them"
            className="block w-full h-full"
          />

          {/* sky — eddies turning in place, plus the sun's rays */}
          <div className="hero-sky" aria-hidden="true">
            <span className="hero-swirl" style={{ left: "5%", top: "4%", width: "24%", ["--dur" as string]: "78s" }} />
            <span className="hero-swirl" style={{ left: "28%", top: "-6%", width: "30%", ["--dur" as string]: "96s", ["--dir" as string]: "reverse" }} />
            <span className="hero-swirl" style={{ left: "54%", top: "8%", width: "22%", ["--dur" as string]: "66s" }} />
            <span className="hero-swirl" style={{ left: "1%", top: "48%", width: "20%", ["--dur" as string]: "88s", ["--dir" as string]: "reverse" }} />
            <span className="hero-swirl" style={{ left: "38%", top: "44%", width: "26%", ["--dur" as string]: "112s" }} />
            <span className="hero-swirl" style={{ left: "70%", top: "52%", width: "20%", ["--dur" as string]: "74s", ["--dir" as string]: "reverse" }} />
          </div>
          <div className="hero-sun" aria-hidden="true" />

          {/* the two falls and the spray at the plunge pool */}
          <div className="hero-fall" aria-hidden="true" style={{ left: "62%", top: "63%", width: "15%", height: "23%", opacity: 0.5 }} />
          <div className="hero-spray" aria-hidden="true" style={{ left: "60%", top: "80%", width: "19%", height: "9%" }} />
          <div
            className="hero-fall"
            aria-hidden="true"
            style={{ left: "37%", top: "88%", width: "22%", height: "10%", opacity: 0.34, animationDuration: "0.85s" }}
          />
        </div>

        <div className="absolute inset-0">
          <div className="max-w-[1352px] mx-auto h-full px-[5.5%] flex items-center">
            <div className="hero-float w-[74%] sm:w-[52%] md:w-[41%] max-w-[545px] md:aspect-[545/742] max-h-[calc(100svh-120px)]">
              <div
                className="hero-card w-full h-full bg-heroblock/[0.88] border-[3px] border-gold rounded-[22px]
                           px-[9%] py-[8%] flex flex-col justify-center gap-[10%]"
              >
                <h1 className="font-display italic font-normal text-gold text-center leading-[1.04]
                               text-[clamp(40px,6.3vw,88px)]">
                  <span className="hero-in block" style={{ ["--d" as string]: "220ms" }}>Dabble</span>
                  <span className="hero-in block" style={{ ["--d" as string]: "340ms" }}>And</span>
                  <span className="hero-in block" style={{ ["--d" as string]: "460ms" }}>Dahlia</span>
                </h1>

                <div>
                  <p
                    className="hero-in text-babypink font-medium text-center text-balance
                               text-[clamp(14px,1.3vw,17px)] leading-[1.6]"
                    style={{ ["--d" as string]: "600ms" }}
                  >
                    Colour-drenched homeware and build-it-yourself miniature worlds. Every
                    piece is designed in our studio, 3D-printed to order and finished by
                    hand — so what lands on your desk is yours alone.
                  </p>
                  <div className="hero-in mt-[9%] text-center" style={{ ["--d" as string]: "740ms" }}>
                    <Link
                      to="/shop"
                      className="hero-cta inline-block bg-gold text-royal font-display italic
                                 text-[clamp(15px,1.5vw,21px)] px-[1.6em] py-[0.42em] rounded-full"
                    >
                      Shop now
                    </Link>
                  </div>
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

        {/* 3 · OUR STORY — gradient band */}
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

        {/* 4 · GALLERY — continues the Our Story gradient, lightened */}
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
