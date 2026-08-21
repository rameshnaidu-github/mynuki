import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const nav = [
  { to: "/shop", label: "Shop All" },
  { to: "/miniature", label: "DIY Miniature" },
  { to: "/other", label: "Other DIY" },
  { to: "/story", label: "Our Story" },
];

export default function Header() {
  const { user } = useAuth();
  const { count } = useCart();

  return (
    <>
      {/* announcement bar */}
      <div className="bg-ink text-white text-center text-[12.5px] tracking-wide py-2 px-4 font-medium">
        Made in small batches · Free shipping on orders over ₹1,200
      </div>

      <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b-2 border-line">
        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between gap-4">
          {/* logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
              <rect width="64" height="64" rx="16" fill="#f4531f" />
              <circle cx="32" cy="24" r="7.5" fill="#ff3fa4" />
              <path d="M32 31.5c0 8-5.5 13-13 13 0-8 5.5-13 13-13Z" fill="#ff3fa4" />
              <path d="M32 31.5c0 8 5.5 13 13 13 0-8-5.5-13-13-13Z" fill="#ffd0c2" />
              <rect x="30" y="38" width="4" height="14" rx="2" fill="#fffbf7" />
            </svg>
            <span className="font-display text-[26px] leading-none font-semibold text-flame group-hover:text-bloom transition-colors">
              Dabble <span className="text-bloom group-hover:text-flame transition-colors">&amp;</span> Dahlia
            </span>
          </Link>

          {/* centre nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `font-display text-[15px] font-medium transition-colors ${
                    isActive ? "text-flame" : "text-ink hover:text-bloom"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          {/* actions */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to={user ? "/account" : "/login"}
              className="font-display text-[15px] font-medium text-ink hover:text-bloom hidden sm:inline"
            >
              {user ? "Account" : "Log In"}
            </Link>
            <Link
              to="/cart"
              aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
              className="relative text-ink hover:text-flame transition-colors"
            >
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M6 7h13l-1.2 9.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z" strokeLinejoin="round" />
                <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[19px] h-[19px] px-1 rounded-full bg-bloom text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
