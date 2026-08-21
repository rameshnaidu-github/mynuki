import { Link } from "react-router-dom";

const values = [
  { title: "Made to be made", body: "Every kit is designed for the pleasure of building it — clear steps, forgiving fit, and a few quiet hours well spent." },
  { title: "Everything in the box", body: "Laser-cut parts, miniature details, tools, glue and an illustrated manual. Open it, and you have all you need." },
  { title: "Kind to keep", body: "Real materials and a finish worth leaving on a shelf. A little world you made, that lasts." },
];

export default function Story() {
  return (
    <div>
      <section className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 pb-8 text-center">
        <span className="eyebrow">Our Story</span>
        <h1 className="text-4xl md:text-6xl mt-3">Objects worth making</h1>
        <p className="mt-6 text-inksoft font-light text-lg leading-relaxed">
          Dabble & Dahlia began with a simple pleasure — the quiet focus of making something small
          and complete with your own two hands. A miniature shop that lights up. A candle
          you poured. A scene you built, piece by piece, on a slow afternoon.
        </p>
      </section>

      <section className="bg-peach">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <div className="space-y-6 text-inksoft font-light leading-relaxed">
            <p>
              We make DIY kits for people who find calm in making. Our flagship miniature
              build-kits let you assemble and light tiny shops, homes and seasonal scenes —
              and our wider range spans painting, resin, clay, candles, embroidery, jewellery
              and India’s own craft traditions.
            </p>
            <p>
              Everything we design starts from the same question: <em className="text-flame not-italic font-medium">will this be a joy to make?</em>
              We fuss over the fit of every part, the clarity of every step, and the little
              details that make a finished piece feel like yours.
            </p>
            <p>
              And when a standard kit isn’t quite right, we’ll make it yours — a colourway,
              a scene, a personal touch. Handmade, in India, one little world at a time.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl text-center">Our gentle standard</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="bg-cloud rounded-2xl p-7 text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-paper flex items-center justify-center text-flame">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl mt-4">{v.title}</h3>
              <p className="mt-2 text-sm text-inksoft font-light">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-3xl">Start something small</h2>
        <p className="mt-3 text-inksoft font-light">Pick a kit, or tell us what you have in mind.</p>
        <div className="mt-7 flex gap-3 justify-center">
          <Link to="/shop" className="btn-primary">Shop the collection</Link>
          <Link to="/customize" className="btn-outline">Make It Yours</Link>
        </div>
      </section>
    </div>
  );
}
