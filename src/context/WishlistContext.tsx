import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

interface WishlistContextValue {
  slugs: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const KEY = "mynuki.wishlist";

function loadLocal(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [slugs, setSlugs] = useState<string[]>(loadLocal);

  // On login/logout: signed in → load from Supabase (merging any local items up
  // first, so a wishlist built while logged out isn't lost). Signed out → local.
  useEffect(() => {
    let active = true;
    (async () => {
      if (user && supabase) {
        const local = loadLocal();
        if (local.length) {
          await supabase
            .from("wishlists")
            .upsert(local.map((s) => ({ user_id: user.id, product_slug: s })));
        }
        const { data } = await supabase
          .from("wishlists")
          .select("product_slug")
          .eq("user_id", user.id);
        const server = (data ?? []).map((r) => r.product_slug as string);
        const merged = Array.from(new Set([...server, ...local]));
        if (active) {
          setSlugs(merged);
          localStorage.removeItem(KEY);
        }
      } else {
        if (active) setSlugs(loadLocal());
      }
    })();
    return () => {
      active = false;
    };
  }, [user]);

  // Persist to localStorage only while signed out.
  useEffect(() => {
    if (!user) localStorage.setItem(KEY, JSON.stringify(slugs));
  }, [slugs, user]);

  const value = useMemo<WishlistContextValue>(
    () => ({
      slugs,
      count: slugs.length,
      has: (slug) => slugs.includes(slug),
      toggle: (slug) => {
        setSlugs((prev) => {
          const has = prev.includes(slug);
          // Optimistic; server write is fire-and-forget when signed in.
          if (user && supabase) {
            if (has) {
              supabase
                .from("wishlists")
                .delete()
                .eq("user_id", user.id)
                .eq("product_slug", slug);
            } else {
              supabase.from("wishlists").insert({ user_id: user.id, product_slug: slug });
            }
          }
          return has ? prev.filter((s) => s !== slug) : [...prev, slug];
        });
      },
    }),
    [slugs, user]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
