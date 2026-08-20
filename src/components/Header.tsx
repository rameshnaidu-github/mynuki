import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const nav = [
  { to: "/shop", label: "Shop All" },
  { to: "/miniature", label: "DIY Miniature" },
  { to: "/other", label: "Other DIY" },
  { to: "/story", label: "Our Story" },
];

function Emblem() {
  return (
    <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M13 25c0-5 3-9 7-9s7 4 7 9M20 16c0-3 2-5 2-5M20 16c0-3-2-5-2-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header() {
  const { user } = useAuth();
  const { count } = useCart();
  return (
    <>
      {/* announcement bar */}
      <div className="bg-forest text-cream text-center text-[12px] tracking-wide py-2 px-4">
        Handmade with care · Complimentary gift wrapping on orders over ₹1,200
      </div>

      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-line">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* logo */}
          <Link to="/" className="flex items-center gap-2 text-forest shrink-0">
            <Emblem />
            <span className="font-serif text-2xl font-semibold leading-none">MyNuki</span>
          </Link>

          {/* centre nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-forest" : "text-inksoft hover:text-forest"
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
              className="text-sm font-medium text-inksoft hover:text-forest hidden sm:inline"
            >
              {user ? "Account" : "Log In"}
            </Link>
            <Link to="/cart" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`} className="relative text-forest hover:opacity-80">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 7h13l-1.2 9.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z" strokeLinejoin="round" />
                <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-clay text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
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
