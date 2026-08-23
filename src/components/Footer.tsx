import { Link } from "react-router-dom";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Shop All", to: "/shop" },
      { label: "3D Objects", to: "/objects" },
      { label: "DIY Miniature Kits", to: "/kits" },
      { label: "New Arrivals", to: "/shop" },
      { label: "Make It Yours", to: "/customize" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", to: "/story" },
      { label: "Contact", to: "/support#contact" },
      { label: "Track Order", to: "/account" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", to: "/support#shipping" },
      { label: "Support", to: "/support" },
      { label: "My Account", to: "/account" },
    ],
  },
];

function Social({ label, d, href = "#" }: { label: string; d: string; href?: string }) {
  return (
    <a href={href} target={href === "#" ? undefined : "_blank"} rel={href === "#" ? undefined : "noreferrer"} aria-label={label} className="text-white/85 hover:text-white transition-colors">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d={d} />
      </svg>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-bloom text-white mt-4">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div>
            <div className="font-display italic text-[32px] leading-none text-cream">
              Dabble &amp; Dahlia
            </div>
            <p className="mt-4 text-[15px] text-white/85 max-w-xs">
              Design Your Own World. Sculptural 3D-printed pieces and DIY kits, made in small
              batches in India.
            </p>
            <div className="mt-5 flex gap-4">
              <Social label="Instagram" href="https://www.instagram.com/dabbleanddahlia/" d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.22.6-.48 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.22-1-.48-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4Zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3Zm6.8-11.2a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5Z" />
              <Social label="YouTube" d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.85C18.2 4.9 12 4.9 12 4.9s-6.2 0-7.8.45A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.85c1.6.45 7.8.45 7.8.45s6.2 0 7.8-.45a2.6 2.6 0 0 0 1.8-1.85A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8ZM10 15.1V8.9l5.2 3.1Z" />
              <Social label="Facebook" d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.5-1.5h1.6V3.6c-.28-.04-1.24-.12-2.36-.12-2.34 0-3.94 1.43-3.94 4.05v2.26H7v3.1h2.8V21h3.7Z" />
            </div>
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <div className="font-display text-base font-semibold mb-3">{c.title}</div>
              <ul className="space-y-2 text-[15px] text-white/85">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/25 space-y-3">
          <nav className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-white/85" aria-label="Policies">
            <Link to="/policies/terms" className="hover:text-white">Terms</Link>
            <Link to="/policies/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/policies/refunds" className="hover:text-white">Refunds &amp; Cancellation</Link>
            <Link to="/policies/shipping" className="hover:text-white">Shipping</Link>
          </nav>
          <div className="flex flex-col sm:flex-row justify-between gap-2 text-[13px] text-white/85">
            <span>© {new Date().getFullYear()} Dabble &amp; Dahlia</span>
            <span>Secure checkout · Razorpay · INR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
