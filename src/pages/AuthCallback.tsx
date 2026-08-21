import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

/**
 * OAuth landing route (unprotected). The Supabase client parses the redirect URL
 * during init, so getSession() resolves with the new session here. On success we
 * move to /account; on failure we show the actual error instead of silently
 * bouncing to /login.
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function resolve() {
      if (!supabase) {
        navigate("/login", { replace: true });
        return;
      }

      // Surface a provider error passed back in the URL (hash or query).
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const query = new URLSearchParams(window.location.search);
      const providerError =
        hash.get("error_description") || query.get("error_description");
      if (providerError) {
        if (active) setError(providerError);
        return;
      }

      // getSession() awaits the client's URL parsing (detectSessionInUrl).
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      if (data.session) {
        navigate("/account", { replace: true });
        return;
      }

      // Belt-and-suspenders: retry once in case the parse is still settling.
      const { data: retry } = await supabase.auth.getSession();
      if (!active) return;
      if (retry.session) {
        navigate("/account", { replace: true });
      } else {
        setError("Sign-in didn’t complete. Please try again.");
      }
    }

    resolve();
    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <section className="max-w-md mx-auto px-6 py-24 text-center">
      {error ? (
        <>
          <h1 className="text-3xl">Sign-in problem</h1>
          <p className="mt-3 text-inksoft font-light">{error}</p>
          <Link to="/login" className="btn-primary mt-7">Back to log in</Link>
        </>
      ) : (
        <>
          <div
            className="mx-auto w-8 h-8 rounded-full border-2 border-line border-t-forest animate-spin"
            role="status"
            aria-label="Completing sign-in"
          />
          <p className="mt-5 text-inksoft font-light">Completing sign-in…</p>
        </>
      )}
    </section>
  );
}
