// Read-only diagnostic. Never prints keys, tokens, user data, or database rows.
// Run from the project folder: node scripts/check-supabase.mjs
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const variables = { ...process.env };
try {
  const file = await readFile(resolve(root, ".env.local"), "utf8");
  for (const line of file.split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match || variables[match[1]] !== undefined) continue;
    const raw = match[2];
    variables[match[1]] = /^(["']).*\1$/.test(raw)
      ? raw.slice(1, -1)
      : raw.replace(/\s+#.*$/, "").trim();
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const base = variables.VITE_SUPABASE_URL;
const key = variables.VITE_SUPABASE_PUBLISHABLE_KEY || variables.VITE_SUPABASE_ANON_KEY;
if (!base || !key) {
  console.error("Manca la configurazione Supabase in .env.local (URL e chiave pubblica).");
  process.exitCode = 1;
} else {
  let url;
  try {
    url = new URL(base);
    if (!/^https?:$/.test(url.protocol) || url.username || url.password || url.search || url.hash) throw new Error();
  } catch {
    throw new Error("VITE_SUPABASE_URL non e' un URL Supabase valido.");
  }
  console.log(`Il sito si collega a: ${url.origin}`);
  try {
    const config = await readFile(resolve(root, "supabase/config.toml"), "utf8");
    const configuredRef = config.match(/^project_id\s*=\s*"([^"]+)"/m)?.[1];
    const siteRef = url.hostname.endsWith(".supabase.co") ? url.hostname.split(".")[0] : null;
    if (siteRef && configuredRef && siteRef !== configuredRef) {
      console.log("ATTENZIONE: supabase/config.toml indica un altro progetto. Non usare comandi CLI di modifica finche' il riferimento non e' stato verificato.");
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const endpoints = [
    ["Servizio login", "/auth/v1/health"],
    ["Libri", "/rest/v1/books?select=id&limit=0"],
    ["Pagine", "/rest/v1/book_pages?select=id&limit=0"],
    ["Modelli 3D", "/rest/v1/models_3d?select=id&limit=0"],
    ["Nuove impostazioni", "/rest/v1/site_settings?select=id&limit=0"],
    ["Artworks", "/rest/v1/artworks?select=id&limit=0"],
  ];
  const results = await Promise.all(endpoints.map(async ([name, path]) => {
    try {
      const response = await fetch(new URL(path, url.origin), {
        headers: { apikey: key },
        signal: AbortSignal.timeout(12000),
      });
      let message = response.ok ? "OK" : `HTTP ${response.status}`;
      if (response.status === 402) message += " - restrizione di quota/fatturazione";
      if (response.status === 401 || response.status === 403) message += " - verificare chiave pubblica e permessi";
      if (response.status === 404) message += " - tabella non presente o schema API non aggiornato";
      if (response.status === 540) message += " - progetto ancora in pausa";
      if (response.status === 503) message += " - servizio temporaneamente non disponibile o ripristino in corso";
      await response.arrayBuffer();
      return { name, ok: response.ok, message };
    } catch (error) {
      const code = error.cause?.code;
      const reason = code === "ENOTFOUND" || code === "EAI_AGAIN"
        ? "nome del progetto non raggiungibile via DNS"
        : error.name === "TimeoutError" ? "tempo di attesa scaduto" : "connessione non riuscita";
      return { name, ok: false, message: reason };
    }
  }));
  results.forEach(({ name, message }) => console.log(`${name}: ${message}`));
  if (results.some((result) => !result.ok)) process.exitCode = 1;
  console.log("Controllo in sola lettura: nessun dato modificato. OK verifica l'accessibilita', non il contenuto o il ruolo amministratore.");
}
