import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const nav = [
  { to: "/shop", label: "Shop All" },
  { to: "/objects", label: "3D Objects" },
  { to: "/kits", label: "DIY Kits" },
  { to: "/customize", label: "Custom" },
  { to: "/story", label: "Our Story" },
];

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[26px] leading-none text-flame ${className}`}>
      Dabble <span className="text-berry">&amp;</span> Dahlia
    </span>
  );
}

export default function Header() {
  const { user } = useAuth();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the menu on navigation, and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="bg-ink text-cream text-center text-[12.5px] tracking-wide py-2 px-4">
        Made in small batches · Free shipping on orders over ₹1,200
      </div>

      <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-line">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 h-[68px] flex items-center justify-between gap-3">
          {/* menu button — mobile only */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden -ml-2 w-11 h-11 flex items-center justify-center text-ink hover:text-flame transition-colors"
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>

          <Link to="/" className="flex items-center gap-2 shrink-0 group" aria-label="Dabble & Dahlia — home">
            <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true" className="shrink-0 hidden sm:block">
              <rect width="64" height="64" rx="14" fill="#e01b22" />
              <circle cx="32" cy="24" r="7.5" fill="#ff3fa4" />
              <path d="M32 31.5c0 8-5.5 13-13 13 0-8 5.5-13 13-13Z" fill="#ff3fa4" />
              <path d="M32 31.5c0 8 5.5 13 13 13 0-8-5.5-13-13-13Z" fill="#ffc93c" />
              <rect x="30" y="38" width="4" height="14" rx="2" fill="#fff4e0" />
            </svg>
            <Wordmark className="group-hover:text-berry transition-colors" />
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `text-[15px] transition-colors ${isActive ? "text-flame" : "text-ink hover:text-berry"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link
              to={user ? "/account" : "/login"}
              className="text-[15px] text-ink hover:text-berry hidden sm:inline"
            >
              {user ? "Account" : "Log In"}
            </Link>
            <Link
              to="/cart"
              aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
              className="relative w-11 h-11 flex items-center justify-center text-ink hover:text-flame transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M6 7h13l-1.2 9.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z" strokeLinejoin="round" />
                <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" />
              </svg>
              {count > 0 && (
                <span className="absolute top-1 right-0 min-w-[19px] h-[19px] px-1 rounded-full bg-berry text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* mobile drawer */}
        {open && (
          <div id="mobile-nav" className="lg:hidden border-t border-line bg-paper">
            <nav className="max-w-6xl mx-auto px-5 py-3 flex flex-col" aria-label="Primary mobile">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    `py-3.5 text-[19px] font-display border-b border-line ${
                      isActive ? "text-flame" : "text-ink"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              <Link to={user ? "/account" : "/login"} className="py-3.5 text-[19px] font-display text-ink">
                {user ? "Account" : "Log In"}
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
