import { supabase } from "@/lib/supabase";
import { orderedMenuDefaults } from "@/lib/siteMenu";
import { normalizeOceanEnvironment } from "@/types/oceanEnvironment";
import type {
  ArtworkItem,
  ContentSource,
  MenuItem,
  ModelCategory,
  SiteSettings,
} from "@/types/siteContent";

export const SITE_CONTENT_EVENT = "studierzimmer:site-content-change";
// Drafts remain the default on local origins. The owner can explicitly opt in
// to real Supabase saves after applying the CMS SQL migration, without deploying
// the new frontend. Existing local drafts are never published automatically.
const contentMode = import.meta.env.VITE_SITE_CONTENT_MODE;
export const LOCAL_CONTENT_MODE = contentMode === "local" || (contentMode !== "remote" && (import.meta.env.DEV || (
  typeof window !== "undefined" && (
    /^(localhost|127(?:\.\d+){3}|\[?::1\]?|10(?:\.\d+){3}|192\.168(?:\.\d+){2}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d+){2})$/i.test(window.location.hostname) ||
    window.location.hostname.endsWith(".local") ||
    window.location.protocol === "file:"
  )
)));
const ASSET_BUCKET = "site-assets";
const LOCAL_ASSET_PREFIX = "local-asset:";
const DATABASE_NAME = "studierzimmer-site-content";
const SETTINGS_KEY = "settings:main";
const ARTWORKS_KEY = "artworks";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: "main",
  splash_logo_url: null,
  menu_items: [
    { id: "bio", label: "BIO", image_url: null, visible: true },
    { id: "sketches", label: "SKETCHES", image_url: null, visible: true },
    { id: "artworks", label: "ARTWORKS", image_url: null, visible: true },
    { id: "horlogerie", label: "HORLOGERIE", image_url: null, visible: true },
    { id: "jewelry", label: "JEWELRY", image_url: null, visible: true },
    { id: "fashion", label: "FASHION", image_url: null, visible: true },
    { id: "featured", label: "FEATURED IN", image_url: null, visible: true },
    {
      id: "navigate",
      label: "EIN ERKER IN MEINEM STUDIER ZIMMER",
      image_url: null,
      visible: true,
    },
  ],
  menu_font_family: "SuisseIntl, sans-serif",
  menu_font_size: 16,
  menu_color: "#000000",
  menu_background_color: "#ffffff",
  menu_letter_spacing: 0,
  sketches_book_list_label: "Book List",
  bio_text:
    "Il mio Studier Zimmer è uno spazio di ricerca e di osservazione.\n\nTra disegno, oggetti e immagini, raccolgo idee che prendono forma nel tempo. Ogni lavoro nasce da un incontro fra materia, memoria e immaginazione.\n\nQuesta stanza è un archivio aperto: un luogo per tornare a guardare, sperimentare e costruire nuove possibilità.",
  bio_font_family: "SuisseIntl, sans-serif",
  bio_font_size: 16,
  bio_color: "#000000",
  bio_background_color: "#ffffff",
  bio_line_height: 1.8,
  bio_text_align: "left",
  model_categories: {},
  ocean_title: "Studierzimmer-Ozean",
  ocean_subtitle: "studierzimmer.ch",
  ocean_about: "Un erker nel mio Studier Zimmer. Uno spazio da esplorare, tra oggetti, disegni e mare.",
  ocean_text_color: null,
  ocean_background_color: null,
  ocean_environment: normalizeOceanEnvironment(),
};

interface ContentStatus {
  source: ContentSource;
  error: string | null;
}

const status: Record<"settings" | "artworks", ContentStatus> = {
  settings: { source: "default", error: null },
  artworks: { source: "default", error: null },
};
const assetUrls = new Map<string, string>();
const assetReferences = new Map<string, string>();
let databasePromise: Promise<IDBDatabase> | null = null;

export function getSiteContentStatus(kind: "settings" | "artworks" = "settings"): ContentStatus {
  return { ...status[kind] };
}

function emitChange(kind: "settings" | "artworks") {
  window.dispatchEvent(new CustomEvent(SITE_CONTENT_EVENT, { detail: { kind } }));
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return "Connessione non disponibile.";
}

function fallbackMessage(error: unknown): string {
  const message = errorMessage(error);
  if (/schema cache|does not exist|could not find|42P01|PGRST205/i.test(message)) {
    return "La nuova sezione CMS non è ancora attiva su Supabase. Stai vedendo i contenuti predefiniti; le modifiche locali restano in questo browser.";
  }
  return `Contenuti online non disponibili. Sono mostrati i contenuti predefiniti. ${message}`;
}

function openDatabase(): Promise<IDBDatabase> {
  if (databasePromise) return databasePromise;
  databasePromise = new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("Il browser non consente il salvataggio locale. Abilita l'archiviazione del sito."));
      return;
    }
    const request = indexedDB.open(DATABASE_NAME, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains("drafts")) database.createObjectStore("drafts");
      if (!database.objectStoreNames.contains("assets")) database.createObjectStore("assets");
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Impossibile aprire le bozze locali."));
    request.onblocked = () => reject(new Error("Chiudi le altre schede del sito per aggiornare l'archivio locale."));
  }).catch((error) => {
    databasePromise = null;
    throw error;
  });
  return databasePromise;
}

async function readLocal<T>(store: "drafts" | "assets", key: string): Promise<T | undefined> {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = database.transaction(store, "readonly").objectStore(store).get(key);
    request.onsuccess = () => resolve(request.result as T | undefined);
    request.onerror = () => reject(request.error);
  });
}

async function writeLocal(store: "drafts" | "assets", key: string, value: unknown): Promise<void> {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(store, "readwrite");
    transaction.objectStore(store).put(value, key);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error("Salvataggio locale non riuscito."));
    transaction.onabort = () => reject(transaction.error ?? new Error("Spazio locale insufficiente o salvataggio interrotto."));
  });
}

function finiteNumber(value: unknown, fallback: number, min: number, max: number): number {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
}

function hexColor(value: unknown, fallback: string): string {
  return typeof value === "string" && /^#[\da-f]{6}$/i.test(value) ? value : fallback;
}

function nullableColor(value: unknown): string | null {
  return typeof value === "string" && /^#[\da-f]{6}$/i.test(value) ? value : null;
}

function nullableUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const clean = value.trim();
  if (clean.startsWith(LOCAL_ASSET_PREFIX) || clean.startsWith("blob:")) return clean;
  if (clean.startsWith("/") && !clean.startsWith("//")) return clean;
  try {
    const url = new URL(clean);
    return url.protocol === "https:" || url.protocol === "http:" ? clean : null;
  } catch {
    return null;
  }
}

function normalizeSettings(value: Partial<SiteSettings> | null | undefined): SiteSettings {
  const input = value ?? {};
  const defaults = DEFAULT_SITE_SETTINGS;
  const suppliedMenus = Array.isArray(input.menu_items) ? input.menu_items : [];
  const menus: MenuItem[] = orderedMenuDefaults(defaults.menu_items, suppliedMenus).map((item) => {
    const supplied = suppliedMenus.find((candidate) => candidate?.id === item.id);
    const legacyModels = item.id === "featured" && !supplied ? suppliedMenus.find((candidate) => candidate?.id === "models") : null;
    return {
      ...item,
      label: typeof supplied?.label === "string" && supplied.label.trim() ? supplied.label.trim() : item.label,
      image_url: nullableUrl(supplied?.image_url),
      visible: (supplied ?? legacyModels)?.visible !== false,
    };
  });
  const categories: Record<string, ModelCategory> = {};
  Object.entries(input.model_categories ?? {}).forEach(([id, category]) => {
    if (["horlogerie", "jewelry", "models"].includes(category)) categories[id] = category;
  });
  return {
    id: "main",
    splash_logo_url: nullableUrl(input.splash_logo_url),
    menu_items: menus,
    menu_font_family: typeof input.menu_font_family === "string" ? input.menu_font_family : defaults.menu_font_family,
    menu_font_size: finiteNumber(input.menu_font_size, defaults.menu_font_size, 10, 80),
    menu_color: hexColor(input.menu_color, defaults.menu_color),
    menu_background_color: hexColor(input.menu_background_color, defaults.menu_background_color ?? "#ffffff"),
    menu_letter_spacing: finiteNumber(input.menu_letter_spacing, 0, -2, 12),
    sketches_book_list_label: typeof input.sketches_book_list_label === "string" && input.sketches_book_list_label.trim()
      ? input.sketches_book_list_label.trim().slice(0, 80) : defaults.sketches_book_list_label,
    bio_text: typeof input.bio_text === "string" ? input.bio_text : defaults.bio_text,
    bio_font_family: typeof input.bio_font_family === "string" ? input.bio_font_family : defaults.bio_font_family,
    bio_font_size: finiteNumber(input.bio_font_size, defaults.bio_font_size, 10, 60),
    bio_color: hexColor(input.bio_color, defaults.bio_color),
    bio_background_color: hexColor(input.bio_background_color, defaults.bio_background_color ?? "#ffffff"),
    bio_line_height: finiteNumber(input.bio_line_height, defaults.bio_line_height, 1, 3),
    bio_text_align: ["left", "center", "justify"].includes(input.bio_text_align) ? input.bio_text_align : defaults.bio_text_align,
    model_categories: categories,
    ocean_title: typeof input.ocean_title === "string" ? input.ocean_title : defaults.ocean_title,
    ocean_subtitle: typeof input.ocean_subtitle === "string" ? input.ocean_subtitle : defaults.ocean_subtitle,
    ocean_about: typeof input.ocean_about === "string" ? input.ocean_about : defaults.ocean_about,
    ocean_text_color: nullableColor(input.ocean_text_color),
    ocean_background_color: nullableColor(input.ocean_background_color),
    ocean_environment: normalizeOceanEnvironment(input.ocean_environment),
  };
}

function persistentUrl(url: string | null): string | null {
  if (!url) return null;
  const reference = assetReferences.get(url);
  if (reference) return reference;
  if (url.startsWith("blob:")) throw new Error("Ricarica il file: questa anteprima temporanea non può essere salvata.");
  return url;
}

async function resolvedUrl(url: string | null): Promise<string | null> {
  if (!url?.startsWith(LOCAL_ASSET_PREFIX)) return url;
  const cached = assetUrls.get(url);
  if (cached) return cached;
  const blob = await readLocal<Blob>("assets", url);
  if (!blob) throw new Error("Un file della bozza locale non è disponibile. Ricaricalo dal pannello di modifica.");
  const objectUrl = URL.createObjectURL(blob);
  assetUrls.set(url, objectUrl);
  assetReferences.set(objectUrl, url);
  return objectUrl;
}

async function resolveSettings(settings: SiteSettings): Promise<SiteSettings> {
  return {
    ...settings,
    splash_logo_url: await resolvedUrl(settings.splash_logo_url),
    menu_items: await Promise.all(settings.menu_items.map(async (item) => ({ ...item, image_url: await resolvedUrl(item.image_url) }))),
  };
}

function storedSettings(settings: SiteSettings): SiteSettings {
  return {
    ...settings,
    splash_logo_url: persistentUrl(settings.splash_logo_url),
    menu_items: settings.menu_items.map((item) => ({ ...item, image_url: persistentUrl(item.image_url) })),
  };
}

async function withTimeout<T>(operation: (signal: AbortSignal) => PromiseLike<T>): Promise<T> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 3000);
  try {
    return await operation(controller.signal);
  } finally {
    window.clearTimeout(timer);
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (LOCAL_CONTENT_MODE) {
    try {
      const local = await readLocal<SiteSettings>("drafts", SETTINGS_KEY);
      if (local) {
        const resolved = await resolveSettings(normalizeSettings(local));
        status.settings = { source: "local", error: null };
        return resolved;
      }
    } catch (error) {
      status.settings = { source: "default", error: errorMessage(error) };
      return normalizeSettings(DEFAULT_SITE_SETTINGS);
    }
  }
  try {
    const { data, error } = await withTimeout((signal) => supabase.from("site_settings").select("data").eq("id", "main").abortSignal(signal).maybeSingle());
    if (error) throw error;
    status.settings = { source: data ? "remote" : "default", error: null };
    return normalizeSettings(data?.data as Partial<SiteSettings> | undefined);
  } catch (error) {
    status.settings = { source: "default", error: fallbackMessage(error) };
    return normalizeSettings(DEFAULT_SITE_SETTINGS);
  }
}

async function requireAdmin(): Promise<void> {
  const { data, error } = await supabase.rpc("is_admin");
  if (error) throw new Error(errorMessage(error));
  if (data !== true) throw new Error("Accedi con l'account amministratore per salvare.");
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  const normalized = normalizeSettings(settings);
  if (LOCAL_CONTENT_MODE) {
    await writeLocal("drafts", SETTINGS_KEY, storedSettings(normalized));
    status.settings = { source: "local", error: null };
  } else {
    await requireAdmin();
    const { error } = await supabase.from("site_settings").upsert({ id: "main", data: normalized });
    if (error) throw new Error(errorMessage(error));
    status.settings = { source: "remote", error: null };
  }
  emitChange("settings");
}

async function resolveArtwork(item: ArtworkItem): Promise<ArtworkItem> {
  return { ...item, is_featured_in: Boolean(item.is_featured_in), external_url: articleUrl(item.external_url), media_url: (await resolvedUrl(item.media_url)) ?? "", poster_url: await resolvedUrl(item.poster_url) };
}

function articleUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

export async function listArtworkItems(includeUnpublished = false): Promise<ArtworkItem[]> {
  if (LOCAL_CONTENT_MODE) {
    try {
      const local = await readLocal<ArtworkItem[]>("drafts", ARTWORKS_KEY);
      if (local) {
        const items = await Promise.all(local.filter((item) => includeUnpublished || item.is_published).map(resolveArtwork));
        status.artworks = { source: "local", error: null };
        return items.sort((a, b) => a.sort_order - b.sort_order);
      }
    } catch (error) {
      status.artworks = { source: "default", error: errorMessage(error) };
      return [];
    }
  }
  try {
    const { data, error } = await withTimeout((signal) => {
      let query = supabase.from("artworks").select("*").order("sort_order").order("year", { ascending: false });
      if (!includeUnpublished) query = query.eq("is_published", true);
      return query.abortSignal(signal);
    });
    if (error) throw error;
    status.artworks = { source: "remote", error: null };
    return Promise.all(((data ?? []) as ArtworkItem[]).map(resolveArtwork));
  } catch (error) {
    status.artworks = { source: "default", error: fallbackMessage(error) };
    return [];
  }
}

export async function saveArtworkItem(item: ArtworkItem): Promise<ArtworkItem> {
  if (!item.title.trim()) throw new Error("Inserisci un titolo per l'opera.");
  if (!item.media_url && !(item.kind === "model" && item.model_id)) throw new Error("Carica un file o scegli un modello 3D.");
  if (item.external_url?.trim() && !articleUrl(item.external_url)) throw new Error("Il link dell'articolo deve iniziare con https:// o http://.");
  const clean: ArtworkItem = {
    id: item.id || crypto.randomUUID(),
    title: item.title.trim(),
    year: Math.round(finiteNumber(item.year, new Date().getFullYear(), 0, 9999)),
    kind: ["image", "video", "model"].includes(item.kind) ? item.kind : "image",
    media_url: nullableUrl(item.media_url) ?? "",
    poster_url: nullableUrl(item.poster_url),
    model_id: item.model_id || null,
    is_fashion: Boolean(item.is_fashion),
    is_published: Boolean(item.is_published),
    sort_order: Math.round(finiteNumber(item.sort_order, 0, -100000, 100000)),
    description: item.description ?? "",
    is_featured_in: Boolean(item.is_featured_in),
    external_url: articleUrl(item.external_url),
  };
  if (LOCAL_CONTENT_MODE) {
    const local = await readLocal<ArtworkItem[]>("drafts", ARTWORKS_KEY);
    // Seed the first draft with the full catalogue, including unpublished admin work.
    const items = local ?? (await listArtworkItems(true));
    const stored = { ...clean, media_url: persistentUrl(clean.media_url) ?? "", poster_url: persistentUrl(clean.poster_url) };
    await writeLocal("drafts", ARTWORKS_KEY, [...items.filter((existing) => existing.id !== clean.id), stored]);
    status.artworks = { source: "local", error: null };
  } else {
    await requireAdmin();
    const { error } = await supabase.from("artworks").upsert(clean);
    if (error) {
      const message = errorMessage(error);
      if (/is_featured_in|external_url/.test(message)) throw new Error("Applica prima lo script 20261114000000_featured_in_and_ocean.sql nell'editor SQL di Supabase.");
      throw new Error(message);
    }
    status.artworks = { source: "remote", error: null };
  }
  emitChange("artworks");
  return clean;
}

export async function deleteArtworkItem(id: string): Promise<void> {
  if (LOCAL_CONTENT_MODE) {
    const local = await readLocal<ArtworkItem[]>("drafts", ARTWORKS_KEY);
    const items = local ?? (await listArtworkItems(true));
    await writeLocal("drafts", ARTWORKS_KEY, items.filter((item) => item.id !== id));
    status.artworks = { source: "local", error: null };
  } else {
    await requireAdmin();
    const { error } = await supabase.from("artworks").delete().eq("id", id);
    if (error) throw new Error(errorMessage(error));
  }
  emitChange("artworks");
}

async function uploadAsset(file: File, artwork: boolean): Promise<string> {
  const image = /\.(png|jpe?g|gif|webp|avif)$/i.test(file.name) && (!file.type || file.type.startsWith("image/"));
  const media = artwork && /\.(mp4|webm|mov|glb|gltf)$/i.test(file.name);
  if (!image && !media) throw new Error(artwork ? "Scegli un'immagine, un video MP4/WebM/MOV o un modello GLB/GLTF." : "Scegli un'immagine PNG, JPG, GIF, WebP o AVIF. I PNG possono avere uno sfondo trasparente.");
  const maxBytes = (artwork ? 50 : 15) * 1024 * 1024;
  if (file.size > maxBytes) throw new Error(`Il file supera il limite di ${artwork ? 50 : 15} MB.`);
  if (LOCAL_CONTENT_MODE) {
    const reference = `${LOCAL_ASSET_PREFIX}${crypto.randomUUID()}`;
    await writeLocal("assets", reference, file);
    return (await resolvedUrl(reference))!;
  }
  await requireAdmin();
  const cleanName = file.name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${artwork ? "artworks" : "site"}/${crypto.randomUUID()}-${cleanName}`;
  const { error } = await supabase.storage.from(ASSET_BUCKET).upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type || undefined });
  if (error) throw new Error(errorMessage(error));
  return supabase.storage.from(ASSET_BUCKET).getPublicUrl(path).data.publicUrl;
}

export function uploadSiteAsset(file: File): Promise<string> {
  return uploadAsset(file, false);
}

export function uploadArtworkAsset(file: File): Promise<string> {
  return uploadAsset(file, true);
}
