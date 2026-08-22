import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const nav = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop all" },
  { to: "/story", label: "About" },
  { to: "/support", label: "Contact" },
];

export default function Header() {
  const { user } = useAuth();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

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
      <header className="sticky top-0 z-40 bg-navbar">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 h-[52px] flex items-center justify-between gap-3">
          {/* mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden -ml-2 w-11 h-11 flex items-center justify-center text-gold"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>

          <Link to="/" className="lg:hidden font-display italic text-[19px] text-gold leading-none">
            Dabble &amp; Dahlia
          </Link>

          {/* centred nav (desktop) */}
          <nav className="hidden lg:flex items-center mx-auto" aria-label="Primary">
            {nav.map((n, i) => (
              <span key={n.to} className="flex items-center">
                {i > 0 && <span aria-hidden="true" className="w-px h-4 bg-gold/60 mx-5" />}
                <NavLink
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) =>
                    `font-display italic text-[17px] transition-colors ${
                      isActive ? "text-ink" : "text-gold hover:text-white"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              </span>
            ))}
          </nav>

          {/* right icons */}
          <div className="flex items-center gap-1 shrink-0">
            <Link
              to={user ? "/account" : "/login"}
              aria-label={user ? "Account" : "Log in"}
              className="w-10 h-10 flex items-center justify-center text-gold hover:text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="12" cy="8" r="3.4" />
                <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" strokeLinecap="round" />
              </svg>
            </Link>
            <Link
              to="/cart"
              aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
              className="relative w-10 h-10 flex items-center justify-center text-gold hover:text-white"
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M6 7h13l-1.2 9.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z" strokeLinejoin="round" />
                <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" />
              </svg>
              {count > 0 && (
                <span className="absolute top-0.5 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-ink text-gold text-[10.5px] font-bold flex items-center justify-center tabular-nums">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {open && (
          <div id="mobile-nav" className="lg:hidden bg-navbar border-t border-gold/40">
            <nav className="max-w-6xl mx-auto px-5 py-2 flex flex-col" aria-label="Primary mobile">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.end}
                  className="py-3.5 font-display italic text-[18px] text-gold border-b border-gold/30 last:border-0"
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
