import { useEffect, useState, type ReactNode } from "react";
import { Check, ChevronDown, Loader2, RotateCcw, Upload } from "lucide-react";
import defaultLogo from "@/Portrait/WolfyLight.gif";
import { useSiteContent } from "@/hooks/useSiteContent";
import { DEFAULT_SITE_SETTINGS, LOCAL_CONTENT_MODE, uploadSiteAsset } from "@/services/siteContentRepository";
import type { MenuKey, SiteSettings } from "@/types/siteContent";
import { moveMenuItem } from "@/lib/siteMenu";
import { DEFAULT_OCEAN_LABELS, normalizeOceanLabels, type OceanLabels } from "@/types/oceanText";

interface AdminSiteSettingsProps {
  section?: "menu" | "bio" | "splash" | "models" | "navigate";
}

const inputClass = "min-h-12 min-w-0 w-full rounded-none border-0 border-b border-black/20 bg-transparent px-0 py-3 text-[16px] text-black outline-none focus:border-black";
const buttonClass = "inline-flex min-h-12 items-center justify-center gap-2 border border-black/15 px-3 py-2 text-[13px] disabled:opacity-40";
const sectionOptions = [
  { id: "menu", label: "Menu" },
  { id: "bio", label: "BIO" },
  { id: "splash", label: "Logo" },
  { id: "navigate", label: "Navigate" },
] as const;
const oceanLabelFields: Array<{ key: keyof OceanLabels; label: string; multiline?: boolean }> = [
  { key: "exit", label: "Pulsante di uscita" },
  { key: "start", label: "Pulsante di avvio" },
  { key: "about", label: "Pulsante informazioni" },
  { key: "figure", label: "Selezione figura" },
  { key: "music", label: "Pulsante musica" },
  { key: "loadingFigures", label: "Messaggio di caricamento figure" },
  { key: "figuresUnavailable", label: "Messaggio catalogo non disponibile", multiline: true },
];

function SettingsDisclosure({ label, children }: { label: string; children: ReactNode }) {
  return <details className="group border-y border-black/10">
    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-[14px] marker:content-none">
      {label}<ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" strokeWidth={1.25} />
    </summary>
    <div className="space-y-5 pb-5">{children}</div>
  </details>;
}

function TypographyEditor({ value, onChange, bio = false }: {
  value: SiteSettings;
  onChange: (patch: Partial<SiteSettings>) => void;
  bio?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-5">
      <label className="col-span-2 text-[12px] text-black/60">
        Carattere
        <select className={`${inputClass} mt-1`} value={bio ? value.bio_font_family : value.menu_font_family} onChange={(event) => onChange(bio ? { bio_font_family: event.target.value } : { menu_font_family: event.target.value })}>
          <option value="SuisseIntl, sans-serif">Suisse Intl · originale</option>
          <option value="Georgia, serif">Georgia · serif</option>
          <option value="'Times New Roman', serif">Times New Roman · serif</option>
          <option value="Arial, sans-serif">Arial · sans serif</option>
          <option value="'Courier New', monospace">Courier New · macchina da scrivere</option>
        </select>
      </label>
      <label className="text-[12px] text-black/60">
        Dimensione (px)
        <input type="number" min="10" max={bio ? "60" : "80"} className={`${inputClass} mt-1`} value={bio ? value.bio_font_size : value.menu_font_size} onChange={(event) => onChange(bio ? { bio_font_size: Number(event.target.value) } : { menu_font_size: Number(event.target.value) })} />
      </label>
      <label className="text-[12px] text-black/60">
        Colore testo
        <input type="color" aria-label={bio ? "Colore testo BIO" : "Colore titoli menu"} className="mt-1 block h-12 w-full cursor-pointer border border-black/20 bg-white p-1" value={bio ? value.bio_color : value.menu_color} onChange={(event) => onChange(bio ? { bio_color: event.target.value } : { menu_color: event.target.value })} />
      </label>
      <label className="text-[12px] text-black/60">
        Sfondo pagina
        <input type="color" aria-label={bio ? "Sfondo pagina BIO" : "Sfondo pagina menu"} className="mt-1 block h-12 w-full cursor-pointer border border-black/20 bg-white p-1" value={bio ? value.bio_background_color ?? "#ffffff" : value.menu_background_color ?? "#ffffff"} onChange={(event) => onChange(bio ? { bio_background_color: event.target.value } : { menu_background_color: event.target.value })} />
      </label>
      {bio ? (
        <>
          <label className="text-[12px] text-black/60">
            Interlinea
            <input type="number" min="1" max="3" step="0.1" className={`${inputClass} mt-1`} value={value.bio_line_height} onChange={(event) => onChange({ bio_line_height: Number(event.target.value) })} />
          </label>
          <label className="text-[12px] text-black/60">
            Allineamento
            <select className={`${inputClass} mt-1`} value={value.bio_text_align} onChange={(event) => onChange({ bio_text_align: event.target.value as SiteSettings["bio_text_align"] })}>
              <option value="left">Sinistra</option>
              <option value="center">Centrato</option>
              <option value="justify">Giustificato</option>
            </select>
          </label>
        </>
      ) : (
        <label className="col-span-2 text-[12px] text-black/60">
          Spaziatura lettere (px)
          <input type="number" min="-2" max="12" step="0.1" className={`${inputClass} mt-1`} value={value.menu_letter_spacing} onChange={(event) => onChange({ menu_letter_spacing: Number(event.target.value) })} />
        </label>
      )}
    </div>
  );
}

export default function AdminSiteSettings({ section }: AdminSiteSettingsProps) {
  const { settings, loading, error, source, saveSettings, reload } = useSiteContent();
  const [draft, setDraft] = useState(settings);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<(typeof sectionOptions)[number]["id"]>("menu");
  const [expandedMenu, setExpandedMenu] = useState<MenuKey | null>("bio");

  useEffect(() => {
    if (!dirty) setDraft(settings);
  }, [settings, dirty]);

  const update = (patch: Partial<SiteSettings>) => {
    setDraft((current) => ({ ...current, ...patch }));
    setDirty(true);
    setFeedback(null);
    setFailure(null);
  };
  const updateMenu = (id: MenuKey, patch: Partial<SiteSettings["menu_items"][number]>) => {
    setDraft((current) => ({ ...current, menu_items: current.menu_items.map((item) => item.id === id ? { ...item, ...patch } : item) }));
    setDirty(true);
    setFeedback(null);
    setFailure(null);
  };
  const updateOceanLabel = (key: keyof OceanLabels, value: string) => {
    setDraft((current) => ({ ...current, ocean_labels: { ...normalizeOceanLabels(current.ocean_labels), [key]: value } }));
    setDirty(true);
    setFeedback(null);
    setFailure(null);
  };
  const upload = async (file: File | undefined, target: "splash" | MenuKey) => {
    if (!file) return;
    setUploading(target);
    setFailure(null);
    try {
      const url = await uploadSiteAsset(file);
      if (target === "splash") update({ splash_logo_url: url });
      else updateMenu(target, { image_url: url });
    } catch (uploadError) {
      setFailure(uploadError instanceof Error ? uploadError.message : "Caricamento non riuscito.");
    } finally {
      setUploading(null);
    }
  };
  const save = async () => {
    setSaving(true);
    setFailure(null);
    try {
      await saveSettings(draft);
      setDirty(false);
      setFeedback(LOCAL_CONTENT_MODE ? "Bozza salvata in questo browser. Il sito online non è stato modificato." : "Modifiche salvate.");
    } catch (saveError) {
      setFailure(saveError instanceof Error ? saveError.message : "Salvataggio non riuscito.");
    } finally {
      setSaving(false);
    }
  };
  const selectedSection = section ?? activeSection;
  const show = (key: AdminSiteSettingsProps["section"]) => selectedSection === key;
  const oceanLabels = normalizeOceanLabels(draft.ocean_labels);

  return (
    <div className="admin-site-settings mx-auto w-full max-w-2xl text-left text-black">
      <div className="mb-5 border-b border-black/15 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-[18px]">Il tuo sito</h2><span className="text-[11px] text-black/45">{source === "local" ? "Bozza locale" : source === "remote" ? "Supabase" : "Versione predefinita"}</span></div>
        <p className="mt-2 text-[12px] leading-relaxed text-black/55">
          {LOCAL_CONTENT_MODE ? "Modifica una sezione alla volta. Le bozze restano in questo browser, senza pubblicare il sito." : "Modifica una sezione alla volta, poi salva per aggiornare il sito."}
        </p>
        {error && <div role="status" className="mt-3 border border-amber-700/20 bg-amber-50 p-3 text-[12px] leading-relaxed text-amber-900">{error}<button type="button" onClick={() => void reload()} className="mt-2 block min-h-11 px-1">Riprova</button></div>}
      </div>

      {!section && <nav className="mb-6 grid grid-cols-4 border-b border-black/15" aria-label="Sezione impostazioni sito">{sectionOptions.map((option) => <button key={option.id} type="button" aria-current={selectedSection === option.id ? "page" : undefined} onClick={() => setActiveSection(option.id)} className={`min-h-12 border-b px-1 py-3 text-[13px] ${selectedSection === option.id ? "border-black text-black" : "border-transparent text-black/45"}`}>{option.label}</button>)}</nav>}

      {loading && <p className="mb-4 flex items-center gap-2 text-[12px] text-black/50"><Loader2 className="h-3 w-3 animate-spin" /> Caricamento delle impostazioni…</p>}

      <fieldset disabled={saving} className="min-w-0 space-y-6 border-0 p-0 pb-4 disabled:opacity-70">
        {show("splash") && <section aria-labelledby="site-logo-heading" className="space-y-4">
          <h3 id="site-logo-heading" className="text-[14px] uppercase tracking-wider">Splash logo</h3>
          <div className="grid grid-cols-[96px_minmax(0,1fr)] items-start gap-4 sm:grid-cols-[144px_minmax(0,1fr)] sm:gap-6">
            <div className="flex aspect-square items-center justify-center border border-black/15 bg-white p-3">
              <img src={draft.splash_logo_url || defaultLogo} alt={draft.splash_logo_url ? "Logo personalizzato" : "Logo Wolfy predefinito"} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="space-y-3">
              <p className="text-[12px] text-black/55">{draft.splash_logo_url ? "Logo personalizzato" : "Wolfy · logo originale"}<br />Animazioni elastiche conservate.</p>
              <label className={`${buttonClass} w-full cursor-pointer sm:w-auto`}>
                {uploading === "splash" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />} Carica logo
                <input type="file" accept="image/png,image/jpeg,image/gif,image/webp,image/avif" aria-label="Carica logo splash" className="sr-only" disabled={Boolean(uploading)} onChange={(event) => { void upload(event.target.files?.[0], "splash"); event.target.value = ""; }} />
              </label>
              {draft.splash_logo_url && <button type="button" className={`${buttonClass} w-full sm:w-auto`} onClick={() => update({ splash_logo_url: null })}><RotateCcw className="h-3 w-3" /> Usa originale</button>}
              <p className="text-[11px] text-black/40">PNG con trasparenza, JPG, GIF, WebP o AVIF · max 15 MB</p>
            </div>
          </div>
        </section>}

        {show("menu") && <section aria-labelledby="site-menu-heading" className="space-y-4">
          <h3 id="site-menu-heading" className="text-[14px] uppercase tracking-wider">Titoli del menu</h3>
          <p className="text-[12px] leading-relaxed text-black/55">Apri un titolo per modificarlo, cambiarne la posizione, nasconderlo o usare un PNG con trasparenza. La destinazione resta la stessa.</p>
          <div className="divide-y divide-black/10 border-y border-black/10">
            {draft.menu_items.map((item, index) => {
              const expanded = expandedMenu === item.id;
              return <div key={item.id}>
                <button type="button" className="flex min-h-16 w-full items-center gap-3 py-4 text-left" aria-expanded={expanded} aria-controls={`site-menu-editor-${item.id}`} onClick={() => setExpandedMenu(expanded ? null : item.id)}>
                  <span className="shrink-0 text-[10px] tabular-nums text-black/30">{String(index + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1"><span className="line-clamp-2 break-words text-[14px] leading-snug">{item.label || "Senza titolo"}</span><span className="mt-1 block text-[10px] text-black/40">{item.visible ? "Visibile" : "Nascosto"} · {item.image_url ? "Immagine titolo" : "Testo"}</span></span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} strokeWidth={1.25} />
                </button>
                {expanded && <div id={`site-menu-editor-${item.id}`} className="space-y-4 border-t border-black/5 pb-5 pt-3">
                  <label className="block text-[12px] text-black/60">Posizione nel menu
                    <select className={inputClass} aria-label={`Posizione menu ${item.id}`} value={index} onChange={(event) => update({ menu_items: moveMenuItem(draft.menu_items, item.id, Number(event.target.value)) })}>
                      {draft.menu_items.map((entry, position) => <option key={entry.id} value={position}>{position + 1}{position === 0 ? " · in cima" : position === draft.menu_items.length - 1 ? " · in fondo" : ""}</option>)}
                    </select>
                  </label>
                  <label className="block text-[12px] text-black/60">Titolo · {item.id === "navigate" ? "Mondo 3D" : item.id}
                    <textarea rows={item.label.length > 40 ? 3 : 2} className={`${inputClass} mt-1 resize-y leading-relaxed`} aria-label={`Titolo menu ${item.id}`} value={item.label} onChange={(event) => updateMenu(item.id, { label: event.target.value.replace(/\r?\n/g, " ") })} />
                  </label>
                  <label className="flex min-h-12 items-center gap-3 text-[13px]"><input className="h-5 w-5" type="checkbox" checked={item.visible} onChange={(event) => updateMenu(item.id, { visible: event.target.checked })} />Mostra nel menu</label>
                  {item.image_url && <div className="flex min-h-24 items-center border border-black/10 bg-white p-3"><img src={item.image_url} alt={item.label} className="max-h-24 max-w-full object-contain object-left" /></div>}
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <label className={`${buttonClass} cursor-pointer`}>
                      {uploading === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} {item.image_url ? "Sostituisci immagine" : "Usa immagine titolo"}
                      <input type="file" accept="image/png,image/jpeg,image/gif,image/webp,image/avif" aria-label={`Carica immagine titolo ${item.id}`} className="sr-only" disabled={Boolean(uploading)} onChange={(event) => { void upload(event.target.files?.[0], item.id); event.target.value = ""; }} />
                    </label>
                    {item.image_url && <button type="button" className={buttonClass} onClick={() => updateMenu(item.id, { image_url: null })}>Torna al testo</button>}
                  </div>
                </div>}
              </div>;
            })}
          </div>
          <label className="block text-[12px] text-black/60">Titolo della lista sketchbook
            <input className={inputClass} aria-label="Titolo Book List" maxLength={80} value={draft.sketches_book_list_label ?? "Book List"} onChange={(event) => update({ sketches_book_list_label: event.target.value })} />
          </label>
          <SettingsDisclosure label="Stile e colori del menu">
            <TypographyEditor value={draft} onChange={update} />
            <div className="break-words border border-black/10 px-3 py-6 text-center" style={{ fontFamily: draft.menu_font_family, fontSize: draft.menu_font_size, color: draft.menu_color, backgroundColor: draft.menu_background_color ?? "#ffffff", letterSpacing: draft.menu_letter_spacing, transition: "color 700ms ease, background-color 700ms ease" }} aria-label="Anteprima stile menu">{draft.menu_items.find((item) => item.id === expandedMenu)?.label || draft.menu_items[0]?.label || "BIO"}</div>
            <button type="button" className={`${buttonClass} w-full text-black/50 sm:w-auto`} onClick={() => update({ menu_font_family: DEFAULT_SITE_SETTINGS.menu_font_family, menu_font_size: DEFAULT_SITE_SETTINGS.menu_font_size, menu_color: DEFAULT_SITE_SETTINGS.menu_color, menu_background_color: DEFAULT_SITE_SETTINGS.menu_background_color, menu_letter_spacing: DEFAULT_SITE_SETTINGS.menu_letter_spacing })}>Ripristina stile originale</button>
          </SettingsDisclosure>
        </section>}

        {show("bio") && <section aria-labelledby="site-bio-heading" className="space-y-4">
          <h3 id="site-bio-heading" className="text-[14px] uppercase tracking-wider">BIO · testo e stile</h3>
          <label className="block text-[12px] text-black/60">Testo della pagina
            <textarea rows={8} className={`${inputClass} mt-2 max-h-[50dvh] min-h-40 resize-y leading-relaxed`} value={draft.bio_text} onChange={(event) => update({ bio_text: event.target.value })} placeholder="Racconta la tua ricerca…" />
          </label>
          <SettingsDisclosure label="Stile, colori e anteprima BIO">
            <TypographyEditor value={draft} onChange={update} bio />
            <div className="max-h-[45dvh] overflow-y-auto whitespace-pre-wrap break-words border border-black/10 p-4" aria-label="Anteprima testo BIO" style={{ fontFamily: draft.bio_font_family, fontSize: draft.bio_font_size, color: draft.bio_color, backgroundColor: draft.bio_background_color ?? "#ffffff", lineHeight: draft.bio_line_height, textAlign: draft.bio_text_align, transition: "color 700ms ease, background-color 700ms ease" }}>{draft.bio_text}</div>
          </SettingsDisclosure>
        </section>}

        {show("navigate") && <section aria-labelledby="site-ocean-heading" className="space-y-4">
          <h3 id="site-ocean-heading" className="text-[14px] uppercase tracking-wider">Navigate · testi del mondo</h3>
          <label className="block text-[12px] text-black/60">Titolo
            <input className={`${inputClass} mt-2`} value={draft.ocean_title ?? ""} onChange={(event) => update({ ocean_title: event.target.value })} />
          </label>
          <label className="block text-[12px] text-black/60">Sottotitolo
            <input className={`${inputClass} mt-2`} value={draft.ocean_subtitle ?? ""} onChange={(event) => update({ ocean_subtitle: event.target.value })} />
          </label>
          <label className="block text-[12px] text-black/60">Testo informativo
            <textarea rows={5} className={`${inputClass} mt-2 max-h-[45dvh] min-h-32 resize-y leading-relaxed`} value={draft.ocean_about ?? ""} onChange={(event) => update({ ocean_about: event.target.value })} />
          </label>
          <SettingsDisclosure label="Pulsanti e messaggi di Navigate">
            <p className="text-[12px] leading-relaxed text-black/55">Modifica le scritte dei comandi e i messaggi visibili ai visitatori. Un campo lasciato vuoto resta vuoto.</p>
            <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
              {oceanLabelFields.map((field) => <label key={field.key} className={`block min-w-0 text-[12px] text-black/60 ${field.multiline ? "sm:col-span-2" : ""}`}>
                {field.label}
                {field.multiline
                  ? <textarea rows={3} className={`${inputClass} mt-1 resize-y leading-relaxed`} aria-label={field.label} value={oceanLabels[field.key]} onChange={(event) => updateOceanLabel(field.key, event.target.value)} />
                  : <input className={`${inputClass} mt-1`} aria-label={field.label} value={oceanLabels[field.key]} onChange={(event) => updateOceanLabel(field.key, event.target.value)} />}
              </label>)}
            </div>
            <button type="button" className={`${buttonClass} w-full text-black/50 sm:w-auto`} onClick={() => update({ ocean_labels: { ...DEFAULT_OCEAN_LABELS } })}>Ripristina scritte originali</button>
          </SettingsDisclosure>
          <SettingsDisclosure label="Colori del testo e dello sfondo">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] text-black/60">Colore testo
                <input type="color" aria-label="Colore testo Navigate" className="mt-2 block h-11 w-full cursor-pointer border border-black/20 bg-white p-1" value={draft.ocean_text_color ?? draft.menu_color} onChange={(event) => update({ ocean_text_color: event.target.value })} />
              </label>
              <label className="mt-1 flex min-h-12 items-center gap-2 text-[12px] text-black/60"><input className="h-5 w-5 shrink-0" type="checkbox" checked={draft.ocean_text_color == null} onChange={(event) => update({ ocean_text_color: event.target.checked ? null : draft.menu_color })} />Usa colore del menu</label>
            </div>
            <div>
              <label className="block text-[12px] text-black/60">Sfondo testo
                <input type="color" aria-label="Sfondo testo Navigate" className="mt-2 block h-11 w-full cursor-pointer border border-black/20 bg-white p-1" value={draft.ocean_background_color ?? "#ffffff"} onChange={(event) => update({ ocean_background_color: event.target.value })} />
              </label>
              <label className="mt-1 flex min-h-12 items-center gap-2 text-[12px] text-black/60"><input className="h-5 w-5 shrink-0" type="checkbox" checked={draft.ocean_background_color == null} onChange={(event) => update({ ocean_background_color: event.target.checked ? null : "#ffffff" })} />Trasparente</label>
            </div>
          </div>
          <div className="border border-black/10 px-4 py-6 text-center" aria-label="Anteprima colori Navigate" style={{ color: draft.ocean_text_color ?? draft.menu_color, backgroundColor: draft.ocean_background_color ?? "transparent", transition: "color 700ms ease, background-color 700ms ease" }}>{draft.ocean_title || "Studierzimmer-Ozean"}</div>
          </SettingsDisclosure>
          <p className="text-[12px] leading-relaxed text-black/45">Puoi modificare questi testi anche direttamente nel mondo, usando la matita.</p>
        </section>}

        {section === "models" && <p className="text-[13px] leading-relaxed text-black/60">Assegna ogni modello a Horlogerie, Jewelry o Models nella sezione di gestione dei modelli 3D.</p>}
      </fieldset>

      <div className="sticky bottom-0 z-10 mt-4 border-t border-black/15 bg-white px-0 pt-3" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
        {failure && <p role="alert" className="mb-3 text-[12px] leading-relaxed text-red-700">{failure}</p>}
        {feedback && <p role="status" className="mb-3 flex items-start gap-2 text-[12px] leading-relaxed text-green-800"><Check className="mt-0.5 h-3 w-3 shrink-0" />{feedback}</p>}
        <p className="mb-2 text-[11px] text-black/45" aria-live="polite">{saving ? "Salvataggio in corso…" : dirty ? "Modifiche da salvare · anche nelle altre sezioni" : "Nessuna modifica in sospeso"}</p>
        <div className="flex items-stretch gap-2">
          <button type="button" onClick={() => void save()} disabled={saving || Boolean(uploading) || loading || !dirty} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 border border-black bg-black px-4 py-3 text-[13px] text-white disabled:opacity-35 sm:flex-none">
            {saving && <Loader2 className="h-3 w-3 animate-spin" />}{saving ? "Salvataggio…" : LOCAL_CONTENT_MODE ? "Salva bozza locale" : "Salva modifiche"}
          </button>
          {dirty && <button type="button" disabled={saving || Boolean(uploading)} className="min-h-12 border border-black/15 px-4 text-[13px] text-black/55 disabled:opacity-35" onClick={() => { setDraft(settings); setDirty(false); setFeedback(null); setFailure(null); }}>Annulla</button>}
        </div>
      </div>
    </div>
  );
}
