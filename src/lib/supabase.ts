import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;

const supabasePublishableKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY
) as string | undefined;

export const supabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);
export const supabaseConfigurationError = "Supabase non è configurato: imposta VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY nell’ambiente di build.";

// An absent deployment variable must not prevent the public portfolio from
// mounting. Requests fail explicitly while local/default content stays usable.
const configuredFetch = async (input: RequestInfo | URL, options: RequestInit = {}): Promise<Response> => {
  if (!supabaseConfigured) throw new Error(supabaseConfigurationError);
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (options.signal?.aborted) abort();
  else options.signal?.addEventListener("abort", abort, { once: true });
  const isUpload = /\/storage\/v1\/object/.test(String(input)) && options.method !== "GET";
  const timeout = window.setTimeout(abort, isUpload ? 120000 : 10000);
  try {
    return await fetch(input, { ...options, signal: controller.signal });
  } finally {
    window.clearTimeout(timeout);
    options.signal?.removeEventListener("abort", abort);
  }
};

export const BOOK_BUCKET = "book-pages";
export const MODEL_BUCKET = "models-3d";
export const CHARACTER_BUCKET = "characters-3d";

export const supabase = createClient(
  supabaseUrl || "https://supabase-not-configured.invalid",
  supabasePublishableKey || "not-configured",
  {
    global: { fetch: configuredFetch },
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
