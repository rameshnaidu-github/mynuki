import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/catalog";
import ProductCard from "../components/ProductCard";
import { supabase } from "../lib/supabase";

const featured = products.slice(0, 8);

const faqs = [
  { q: "How long does an order take?", a: "Every piece is printed to order, so allow 2–3 working days before dispatch, then 4–7 days in transit." },
  { q: "Can I choose my own colours?", a: "Yes — that is the whole idea. Send us the piece and the palette and we'll quote you before you pay." },
  { q: "What are the pieces made from?", a: "Plant-based PLA, printed in small batches and finished by hand in our studio." },
  { q: "Do you take returns?", a: "Unopened pieces can come back within 7 days. If something arrives damaged we'll replace it, no fuss." },
];

export default function Home() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ first: "", last: "", email: "", message: "" });

  async function onContact(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    if (supabase) {
      await supabase.from("customization_requests").insert({
        name: `${form.first} ${form.last}`.trim(),
        email: form.email,
        details: form.message,
      });
    }
    setSending(false);
    setSent(true);
  }

  return (
    <div>
      {/* 1 · HERO */}
      <section className="relative min-h-[440px] md:min-h-[620px] flex items-center overflow-hidden">
        <img
          src="/hero-art.jpg"
          alt="A miniature house set in a painted, Van Gogh-style landscape, captioned: God sends us pieces of art so that we may see ourselves in them"
          className="absolute inset-0 w-full h-full object-cover object-[72%_top]"
        />
        <div className="relative max-w-6xl mx-auto w-full px-5 sm:px-6 py-10 md:py-14 flex items-center">
          {/* framed orange card */}
          <div className="bg-flame border-2 border-cream/70 p-7 sm:p-9 max-w-sm">
            <h1 className="font-display italic text-cream text-[38px] sm:text-[46px] leading-[1.06]">
              Dabble<br />And<br />Dahlia
            </h1>
            <p className="mt-4 text-cream/90 text-[13px] leading-relaxed">
              Sculptural, 3D-printed objects and DIY kits for the desk, the wall and the
              dressing table — designed and printed in small batches.
            </p>
            <Link
              to="/shop"
              className="inline-block mt-6 bg-cream text-flame text-[13px] px-6 py-2.5 hover:bg-white transition-colors"
            >
              Shop now
            </Link>
          </div>

        </div>
      </section>

      {/* 2 · YELLOW BAND */}
      <section className="bg-sun">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-6 flex items-center justify-between gap-4">
          <h2 className="font-display italic text-flame text-[26px] sm:text-[32px]">Loved by Makers</h2>
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
          <h3 className="text-[15px] font-semibold text-ink pb-4">All Products</h3>
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
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 grid md:grid-cols-2 gap-x-10 gap-y-12 items-center">
          <img src="/products/petal-vanity-organiser.jpg" alt="Petal Vanity Organiser on a dresser" className="w-full aspect-[4/3] object-cover" />
          <div>
            <div className="font-display italic text-bloom text-[22px]">Made to be used</div>
            <p className="mt-2 text-[14px] text-inksoft leading-relaxed">
              Drawers that actually slide, trays that hold what you own. Sculptural, but
              built for a real desk.
            </p>
          </div>

          <div className="md:order-4">
            <div className="font-display italic text-bloom text-[22px]">Colour, first</div>
            <p className="mt-2 text-[14px] text-inksoft leading-relaxed">
              We pick shades that lift a corner of a room. Nothing beige, nothing you have
              seen a hundred times before.
            </p>
          </div>
          <img src="/products/wave-magazine-holder.jpg" alt="Wave Magazine Holder holding magazines" className="w-full aspect-[4/3] object-cover md:order-3" />

          <img src="/products/bloom-memo-board.jpg" alt="Bloom Memo Board styled on a wall" className="w-full aspect-[4/3] object-cover" />
          <div>
            <div className="font-display italic text-bloom text-[22px]">Yours, if you want it</div>
            <p className="mt-2 text-[14px] text-inksoft leading-relaxed">
              Every piece can be made in your palette. Tell us what you have in mind and
              we'll quote you before you pay a rupee.
            </p>
          </div>
        </div>
      </section>

      {/* 6 · FAQ — red band */}
      <section className="bg-berry text-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <h2 className="font-display italic text-[30px] md:text-[38px] text-white">FAQs</h2>
          <div className="mt-7 grid md:grid-cols-2 gap-x-10 gap-y-7">
            {faqs.map((f) => (
              <div key={f.q}>
                <div className="text-[15px] font-semibold">{f.q}</div>
                <p className="mt-1.5 text-[14px] text-white/90 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · CONTACT */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-5 sm:px-6">
          <h2 className="font-display italic text-bloom text-[30px] md:text-[38px]">Contact Us</h2>
          {sent ? (
            <p className="mt-6 text-[15px] text-inksoft">
              Thank you — your message is with us. We'll reply by email shortly.
            </p>
          ) : (
            <form onSubmit={onContact} className="mt-7 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <label className="block">
                  <span className="block text-[12.5px] text-bloom mb-1">First name</span>
                  <input required value={form.first} onChange={(e) => setForm({ ...form, first: e.target.value })}
                    className="w-full border-0 border-b border-bloom/50 focus:border-bloom outline-none py-1.5 text-[14px] bg-transparent" />
                </label>
                <label className="block">
                  <span className="block text-[12.5px] text-bloom mb-1">Last name</span>
                  <input value={form.last} onChange={(e) => setForm({ ...form, last: e.target.value })}
                    className="w-full border-0 border-b border-bloom/50 focus:border-bloom outline-none py-1.5 text-[14px] bg-transparent" />
                </label>
              </div>
              <label className="block">
                <span className="block text-[12.5px] text-bloom mb-1">Email *</span>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border-0 border-b border-bloom/50 focus:border-bloom outline-none py-1.5 text-[14px] bg-transparent" />
              </label>
              <label className="block">
                <span className="block text-[12.5px] text-bloom mb-1">Write a message</span>
                <textarea required rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border-0 border-b border-bloom/50 focus:border-bloom outline-none py-1.5 text-[14px] bg-transparent resize-y" />
              </label>
              <button type="submit" disabled={sending}
                className="border border-bloom text-bloom text-[13px] px-8 py-2 rounded-full hover:bg-bloom hover:text-white transition-colors disabled:opacity-60">
                {sending ? "Sending…" : "Submit"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
