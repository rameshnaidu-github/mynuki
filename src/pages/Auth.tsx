import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Show the Google button only once you've enabled the Google provider in
// Supabase and set VITE_ENABLE_GOOGLE_AUTH=true. Otherwise it errors.
const googleEnabled = import.meta.env.VITE_ENABLE_GOOGLE_AUTH === "true";

export default function Auth({ mode }: { mode: "login" | "register" }) {
  const isRegister = mode === "register";
  const { signIn, signUp, signInWithGoogle, configured } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    const res = isRegister
      ? await signUp(email, password, fullName)
      : await signIn(email, password);
    setBusy(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    if (res.needsConfirmation) {
      setNotice("Almost there — check your inbox to confirm your email, then log in.");
      return;
    }
    navigate("/account");
  }

  async function onGoogle() {
    setError(null);
    const res = await signInWithGoogle();
    if (res.error) setError(res.error);
  }

  return (
    <section className="max-w-md mx-auto px-6 py-16 md:py-24">
      <div className="text-center">
        <span className="eyebrow">{isRegister ? "Join Dabble & Dahlia" : "Welcome back"}</span>
        <h1 className="text-4xl mt-3">
          {isRegister ? "Create your account" : "Log in"}
        </h1>
      </div>

      {!configured && (
        <p className="mt-6 text-sm text-center bg-peach/70 text-flamedeep rounded-xl px-4 py-3">
          Preview mode — sign-in activates once Supabase keys are added.
        </p>
      )}

      <div className="mt-8 bg-card border border-line rounded-2xl p-7 shadow-sm">
        {googleEnabled && (
          <>
            <button type="button" onClick={onGoogle} className="btn-outline w-full">
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.5 12.2c0-.7-.06-1.4-.18-2H12v3.9h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2-1.9 3.3-4.7 3.3-7.9Z" />
                <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.6H2v2.8A11 11 0 0 0 12 23Z" />
                <path fill="#FBBC05" d="M5.7 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2a11 11 0 0 0 0 9.8l3.7-2.8Z" />
                <path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.2 1.6l3.1-3.1A11 11 0 0 0 2 7.1l3.7 2.8C6.6 7.3 9.1 5.4 12 5.4Z" />
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 my-5 text-xs text-muted">
              <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
            </div>
          </>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {isRegister && (
            <Field label="Full name" id="name">
              <input
                id="name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input"
                autoComplete="name"
              />
            </Field>
          )}
          <Field label="Email" id="email">
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              autoComplete="email"
            />
          </Field>
          <Field label="Password" id="password">
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              autoComplete={isRegister ? "new-password" : "current-password"}
            />
          </Field>

          {error && (
            <p role="alert" className="text-sm text-berry">{error}</p>
          )}
          {notice && (
            <p className="text-sm text-flame">{notice}</p>
          )}

          <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
            {busy ? "Please wait…" : isRegister ? "Create account" : "Log in"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-inksoft">
        {isRegister ? (
          <>Already have an account? <Link to="/login" className="text-flame font-medium underline">Log in</Link></>
        ) : (
          <>New to Dabble & Dahlia? <Link to="/register" className="text-flame font-medium underline">Create an account</Link></>
        )}
      </p>
    </section>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-inksoft mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
