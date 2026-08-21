import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

/**
 * OAuth landing route (unprotected). Establishes the session from the redirect
 * URL, then routes to /account. On failure it shows the exact error instead of a
 * silent bounce, so problems are diagnosable.
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function run() {
      if (!supabase) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
        const query = new URLSearchParams(window.location.search);

        // A provider-side error is passed back in the URL.
        const providerError =
          hash.get("error_description") || query.get("error_description");
        if (providerError) {
          if (active) setError("Provider error: " + providerError);
          return;
        }

        // 1) The client's built-in handler may already have set the session.
        const existing = await supabase.auth.getSession();
        if (!active) return;
        if (existing.data.session) {
          navigate("/account", { replace: true });
          return;
        }

        // 2) Establish it explicitly from the implicit-flow hash tokens.
        const access_token = hash.get("access_token");
        const refresh_token = hash.get("refresh_token");
        if (access_token && refresh_token) {
          const { data, error: setErr } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });
          if (!active) return;
          if (setErr) {
            const status = (setErr as { status?: number }).status;
            const code = (setErr as { code?: string }).code;
            const detail = [setErr.message, code && `(${code})`, status && `[${status}]`]
              .filter(Boolean)
              .join(" ");
            console.error("[Dabble & Dahlia auth] setSession failed:", setErr);
            setError(detail);
            return;
          }
          if (data.session) {
            navigate("/account", { replace: true });
            return;
          }
        }

        // 3) PKCE fallback (?code=), in case the flow ever changes.
        const code = query.get("code");
        if (code) {
          const { data, error: exErr } = await supabase.auth.exchangeCodeForSession(code);
          if (!active) return;
          if (exErr) {
            console.error("[Dabble & Dahlia auth] exchangeCodeForSession failed:", exErr);
            setError(exErr.message);
            return;
          }
          if (data.session) {
            navigate("/account", { replace: true });
            return;
          }
        }

        setError("No session was returned in the sign-in link.");
      } catch (e) {
        console.error("[Dabble & Dahlia auth] callback exception:", e);
        if (active) setError(e instanceof Error ? e.message : String(e));
      }
    }

    run();
    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <section className="max-w-lg mx-auto px-6 py-24 text-center">
      {error ? (
        <>
          <h1 className="text-3xl">Sign-in problem</h1>
          <p className="mt-4 text-sm text-berry break-words bg-card border border-line rounded-xl px-4 py-3">
            {error}
          </p>
          <Link to="/login" className="btn-primary mt-7">Back to log in</Link>
        </>
      ) : (
        <>
          <div
            className="mx-auto w-8 h-8 rounded-full border-2 border-line border-t-flame animate-spin"
            role="status"
            aria-label="Completing sign-in"
          />
          <p className="mt-5 text-inksoft font-light">Completing sign-in…</p>
        </>
      )}
    </section>
  );
}
