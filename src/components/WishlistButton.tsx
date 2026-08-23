import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

/**
 * Heart toggle that knows about sign-in. Signed out, it doesn't silently drop
 * the save — it says so and offers a way to log in, returning here afterwards.
 */
export default function WishlistButton({
  slug,
  name,
  className = "",
  size = 17,
}: {
  slug: string;
  name: string;
  className?: string;
  size?: number;
}) {
  const { user } = useAuth();
  const { has, toggle } = useWishlist();
  const { pathname, search } = useLocation();
  const [prompt, setPrompt] = useState(false);
  const liked = has(slug);

  useEffect(() => {
    if (!prompt) return;
    const t = window.setTimeout(() => setPrompt(false), 10000);
    return () => window.clearTimeout(t);
  }, [prompt]);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!user) {
            setPrompt(true);
            return;
          }
          toggle(slug);
        }}
        aria-pressed={user ? liked : undefined}
        aria-label={
          !user
            ? `Log in to save ${name} to your wishlist`
            : liked
            ? `Remove ${name} from wishlist`
            : `Save ${name} to wishlist`
        }
        className={className}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={user && liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 20s-7-4.35-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.65 12 20 12 20Z" strokeLinejoin="round" />
        </svg>
      </button>

      {prompt && (
        <div
          role="status"
          className="fixed inset-x-4 bottom-5 z-[90] mx-auto max-w-sm rounded-2xl bg-ink text-white
                     px-4 py-3.5 shadow-xl flex items-center gap-3 animate-[fade-in_.2s_ease-out]"
        >
          <span className="text-[14px] leading-snug flex-1">
            Log in to save favourites to your wishlist.
          </span>
          <Link
            to="/login"
            state={{ from: pathname + search }}
            className="shrink-0 bg-white text-ink text-[13px] font-medium px-4 py-2 rounded-full hover:bg-cream transition-colors"
          >
            Log in
          </Link>
          <button
            type="button"
            onClick={() => setPrompt(false)}
            aria-label="Dismiss"
            className="shrink-0 w-8 h-8 grid place-items-center rounded-full hover:bg-white/15 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
