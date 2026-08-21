import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Strip any stray non-printable / non-ASCII characters that can sneak in when a
// key is pasted into a dashboard (e.g. a zero-width space). HTTP header values
// must be Latin-1, so a hidden character in the anon key makes every Supabase
// request throw "String contains non ISO-8859-1 code point".
const clean = (v: string | undefined) => (v ?? "").replace(/[^\x21-\x7E]/g, "");

const url = clean(import.meta.env.VITE_SUPABASE_URL as string | undefined);
const anon = clean(import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);

/** True once real Supabase credentials are present in .env.local. */
export const isSupabaseConfigured = Boolean(url && anon);

/**
 * The Supabase client, or null until credentials are configured.
 * Keeping it nullable lets the app render (and the auth UI preview) before
 * keys are added, instead of crashing on boot.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anon as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        // The OAuth callback is handled explicitly in AuthCallback (setSession from
        // the implicit-flow hash), with full error surfacing. We disable the
        // built-in URL detection so there's a single, controlled code path.
        detectSessionInUrl: false,
      },
    })
  : null;
