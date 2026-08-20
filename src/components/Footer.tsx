import { Link } from "react-router-dom";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "DIY Miniature", to: "/miniature" },
      { label: "Other DIY", to: "/other" },
      { label: "New Arrivals", to: "/shop" },
      { label: "Shop All", to: "/shop" },
    ],
  },
  {
    title: "Make",
    links: [
      { label: "Make It Yours", to: "/customize" },
      { label: "Gifting", to: "/customize" },
      { label: "How It Works", to: "/story" },
      { label: "Our Standard", to: "/story" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", to: "/story" },
      { label: "Contact", to: "/support#contact" },
      { label: "FAQ", to: "/support#faq" },
      { label: "Track Order", to: "/account" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", to: "/support#shipping" },
      { label: "Returns", to: "/support#returns" },
      { label: "Support", to: "/support" },
      { label: "My Account", to: "/account" },
    ],
  },
];

function Social({ label, d }: { label: string; d: string }) {
  return (
    <a href="#" aria-label={label} className="text-cream/80 hover:text-cream">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d={d} />
      </svg>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-forestdeep text-cream mt-4">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="font-serif text-2xl font-semibold">MyNuki</div>
            <p className="mt-3 text-sm text-cream/70 max-w-xs font-light">
              Little worlds, made by hand. DIY miniature build-kits and the wider craft of making.
            </p>
            <div className="mt-5 flex gap-4">
              <Social label="Instagram" d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.22.6-.48 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.22-1-.48-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4Zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3Zm6.8-11.2a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5Z" />
              <Social label="Pinterest" d="M12 2a10 10 0 0 0-3.6 19.3c-.08-.8-.15-2 .03-2.9.17-.8 1.1-4.7 1.1-4.7s-.28-.56-.28-1.4c0-1.3.76-2.3 1.7-2.3.8 0 1.2.6 1.2 1.3 0 .8-.5 2-.78 3.2-.22.9.47 1.7 1.4 1.7 1.7 0 2.9-2.2 2.9-4.7 0-1.9-1.3-3.4-3.7-3.4a4.2 4.2 0 0 0-4.4 4.2c0 .8.3 1.4.7 1.8.06.08.07.15.05.24l-.2.85c-.03.14-.1.17-.25.1-1-.46-1.5-1.8-1.5-3.2 0-2.6 2.2-5.3 6-5.3 3.1 0 5.2 2.2 5.2 4.6 0 3.2-1.8 5.6-4.4 5.6-.9 0-1.7-.5-2-1l-.5 2c-.2.7-.6 1.5-.9 2A10 10 0 1 0 12 2Z" />
              <Social label="Facebook" d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.5-1.5h1.6V3.6c-.28-.04-1.24-.12-2.36-.12-2.34 0-3.94 1.43-3.94 4.05v2.26H7v3.1h2.8V21h3.7Z" />
            </div>
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <div className="text-sm font-semibold mb-3">{c.title}</div>
              <ul className="space-y-2 text-sm text-cream/70">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="hover:text-cream">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-cream/15 space-y-3">
          <nav className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-cream/60" aria-label="Policies">
            <Link to="/policies/terms" className="hover:text-cream">Terms</Link>
            <Link to="/policies/privacy" className="hover:text-cream">Privacy</Link>
            <Link to="/policies/refunds" className="hover:text-cream">Refunds &amp; Cancellation</Link>
            <Link to="/policies/shipping" className="hover:text-cream">Shipping</Link>
          </nav>
          <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs text-cream/60">
            <span>© {new Date().getFullYear()} MyNuki. Made by hand, in India.</span>
            <span>Secure checkout · Razorpay · INR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
