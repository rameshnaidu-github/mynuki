import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True once real Supabase credentials are present in .env.local. */
export const isSupabaseConfigured = Boolean(url && anon);

/**
 * The Supabase client, or null until credentials are configured.
 * Keeping it nullable lets the app render (and the auth UI preview) before
 * keys are added, instead of crashing on boot.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anon as string)
  : null;
