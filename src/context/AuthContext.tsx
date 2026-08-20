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

    let resolved = false;
    const finish = (s: Session | null) => {
      resolved = true;
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    };

    // After the initial resolution, reflect every auth change (incl. sign-out).
    // Before it, only a real session settles us — a transient null is ignored so a
    // protected landing route doesn't bounce mid OAuth-callback.
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, s) => {
      if (resolved) {
        setSession(s);
        setUser(s?.user ?? null);
      } else if (s) {
        finish(s);
      }
    });

    const cleanUrl = () =>
      window.history.replaceState(null, "", window.location.pathname);

    (async () => {
      // Implicit OAuth flow: tokens arrive in the URL hash.
      if (window.location.hash.includes("access_token")) {
        const p = new URLSearchParams(window.location.hash.replace(/^#/, ""));
        const access_token = p.get("access_token");
        const refresh_token = p.get("refresh_token");
        if (access_token && refresh_token) {
          const { data, error } = await supabase!.auth.setSession({
            access_token,
            refresh_token,
          });
          cleanUrl();
          if (!error && data.session) return finish(data.session);
        }
      }

      // PKCE OAuth flow: ?code= in the query string.
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        const { data, error } = await supabase!.auth.exchangeCodeForSession(code);
        cleanUrl();
        if (!error && data.session) return finish(data.session);
      }

      // Normal load: use any persisted session.
      const { data } = await supabase!.auth.getSession();
      if (!resolved) finish(data.session);
    })();

    return () => authListener.subscription.unsubscribe();
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
