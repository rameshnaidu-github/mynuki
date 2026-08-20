import { Link } from "react-router-dom";

const faqs = [
  { q: "Do I need any tools or experience?", a: "No experience needed — each kit includes the tools and glue you need, plus an illustrated step-by-step manual. Most kits are beginner-friendly; the product page notes the level." },
  { q: "How long does a kit take to build?", a: "Anywhere from an hour to a relaxed afternoon, depending on the kit. The build time is listed on every product page." },
  { q: "Can I customise a kit?", a: "Yes — use “Make It Yours” to request a custom colourway, scene or personal detail and we’ll quote you back." },
  { q: "What ages are the kits for?", a: "Most kits suit ages 14+ due to small parts. Some simpler craft kits are fine for younger makers with a hand." },
];

export default function Support() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
      <header className="text-center">
        <span className="eyebrow">Help &amp; Support</span>
        <h1 className="text-4xl md:text-5xl mt-3">We’re here to help</h1>
        <p className="mt-4 text-inksoft font-light">Shipping, returns and the questions we hear most.</p>
      </header>

      <section id="shipping" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl">Shipping</h2>
        <div className="mt-3 bg-card border border-line rounded-2xl p-6 text-inksoft font-light space-y-2">
          <p>We ship across India. Orders are dispatched within 2–3 business days and usually arrive within 4–7 days.</p>
          <p>Shipping is a flat ₹99 — and <span className="text-forest font-medium">free on orders over ₹1,200</span>.</p>
        </div>
      </section>

      <section id="returns" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl">Returns</h2>
        <div className="mt-3 bg-card border border-line rounded-2xl p-6 text-inksoft font-light space-y-2">
          <p>Unopened kits can be returned within 7 days of delivery for a full refund. If a kit arrives damaged or with a missing part, email us and we’ll put it right — no fuss.</p>
        </div>
      </section>

      <section id="faq" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl">Frequently asked</h2>
        <div className="mt-3 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="bg-card border border-line rounded-2xl p-5 group">
              <summary className="cursor-pointer font-medium text-ink list-none flex justify-between items-center gap-3">
                {f.q}
                <span className="text-sage transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-sm text-inksoft font-light">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contact" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl">Contact</h2>
        <div className="mt-3 bg-foresttint rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="text-inksoft font-light">
            Still need a hand? Email <a href="mailto:hello@mynuki.example" className="text-forest font-medium">hello@mynuki.example</a> — or send us your idea.
          </div>
          <Link to="/customize" className="btn-primary shrink-0">Make It Yours</Link>
        </div>
      </section>
    </div>
  );
}
