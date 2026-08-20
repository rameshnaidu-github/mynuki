import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

interface AuthResult {
  error?: string;
  needsConfirmation?: boolean;
}

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  configured: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const NOT_CONFIGURED: AuthResult = {
  error: "Sign-in isn’t connected yet — add your Supabase keys to .env.local.",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // If we're returning from an OAuth redirect, the URL carries a code that the
    // client exchanges for a session asynchronously. Don't settle to "logged out"
    // in that window, or a protected landing route (e.g. /account) bounces to /login
    // before the session arrives.
    const url = new URL(window.location.href);
    const oauthPending =
      url.searchParams.has("code") || url.hash.includes("access_token");

    let settled = false;
    const settle = (s: Session | null) => {
      settled = true;
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      if (!s && oauthPending && !settled && event === "INITIAL_SESSION") return;
      settle(s);
    });

    supabase.auth.getSession().then(({ data }) => {
      if (settled) return;
      if (data.session || !oauthPending) settle(data.session);
      // else: wait for onAuthStateChange to fire once the code is exchanged
    });

    // Safety net so the app never hangs on a stuck exchange.
    const timeout = window.setTimeout(() => {
      if (!settled) setLoading(false);
    }, 8000);

    return () => {
      sub.subscription.unsubscribe();
      window.clearTimeout(timeout);
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      configured: isSupabaseConfigured,

      async signUp(email, password, fullName) {
        if (!supabase) return NOT_CONFIGURED;
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) return { error: error.message };
        // If email confirmation is on, there's no active session yet.
        return { needsConfirmation: !data.session };
      },

      async signIn(email, password) {
        if (!supabase) return NOT_CONFIGURED;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return error ? { error: error.message } : {};
      },

      async signInWithGoogle() {
        if (!supabase) return NOT_CONFIGURED;
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: window.location.origin + "/account" },
        });
        return error ? { error: error.message } : {};
      },

      async signOut() {
        if (!supabase) return;
        await supabase.auth.signOut();
      },
    }),
    [user, session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
