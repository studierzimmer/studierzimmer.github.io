import { useState } from "react";
import { Check, Loader2, Pencil, SlidersHorizontal, Undo2 } from "lucide-react";
import { LOCAL_CONTENT_MODE } from "@/services/siteContentRepository";
import { useInlineSiteEditing } from "@/contexts/InlineSiteEditingContext";
import "@/styles/inline-editing.css";

export { InlineSiteEditingProvider, useInlineSiteEditing } from "@/contexts/InlineSiteEditingContext";

type EditableSection = "menu" | "bio" | "splash" | "models" | "navigate" | "featured" | "artworks" | "fashion" | "sketches" | "horlogerie" | "jewelry";

export default function SiteEditControl({ section = "menu" }: { section?: EditableSection }) {
  const { isAdmin, editing, draft, loading, saving, error, update, begin, cancel, save } = useInlineSiteEditing();
  const [styleOpen, setStyleOpen] = useState(false);
  if (!isAdmin) return null;
  const bio = section === "bio";
  const ocean = section === "navigate";
  const modelMetadata = section === "models" || section === "horlogerie" || section === "jewelry";
  const typography = bio || section === "menu" || ocean;
  const textColor = bio ? draft.bio_color : ocean ? draft.ocean_text_color ?? draft.menu_color : draft.menu_color;
  const backgroundColor = bio ? draft.bio_background_color ?? "#ffffff" : ocean ? draft.ocean_background_color ?? "#ffffff" : draft.menu_background_color ?? "#ffffff";

  return (
    <>
      {!editing && <button type="button" className="site-inline-pencil" aria-label="Modifica direttamente questa pagina" disabled={loading} onClick={begin}><Pencil size={16} strokeWidth={1.25} /></button>}
      {editing && <aside className="site-inline-controls" aria-label="Modifica della pagina" data-inline-edit-ui onPointerDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()}>
        <div className="site-inline-actions">
          <span className="site-inline-mode">{modelMetadata ? "testi 3D · Supabase" : LOCAL_CONTENT_MODE ? "bozza locale" : "modifica pagina"}</span>
          {typography && <button type="button" aria-label="Stile del testo" aria-expanded={styleOpen} onClick={() => setStyleOpen((open) => !open)}><SlidersHorizontal size={16} strokeWidth={1.25} /><span>stile</span></button>}
          <button type="button" onClick={cancel} disabled={saving}><Undo2 size={15} strokeWidth={1.25} /><span>annulla</span></button>
          <button type="button" className="site-inline-save" onClick={() => void save()} disabled={saving}>{saving ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} strokeWidth={1.5} />}<span>{saving ? "salvataggio" : "salva"}</span></button>
        </div>
        {styleOpen && typography && <div className="site-inline-style">
          <label>carattere<select aria-label="Carattere testo" value={bio ? draft.bio_font_family : draft.menu_font_family} disabled={saving} onChange={(event) => update(bio ? { bio_font_family: event.target.value } : { menu_font_family: event.target.value })}>
            <option value="SuisseIntl, sans-serif">Suisse Intl</option><option value="Georgia, serif">Georgia</option><option value="'Times New Roman', serif">Times New Roman</option><option value="Arial, sans-serif">Arial</option><option value="'Courier New', monospace">Courier</option>
          </select></label>
          <label>dimensione<input aria-label="Dimensione testo" type="number" min="10" max={bio ? "60" : "80"} value={bio ? draft.bio_font_size : draft.menu_font_size} disabled={saving} onChange={(event) => update(bio ? { bio_font_size: Number(event.target.value) } : { menu_font_size: Number(event.target.value) })} /></label>
          <div className="site-inline-color-setting">
            <label>colore testo<input aria-label="Colore testo" type="color" value={textColor} disabled={saving} onChange={(event) => update(bio ? { bio_color: event.target.value } : ocean ? { ocean_text_color: event.target.value } : { menu_color: event.target.value })} /></label>
            {ocean && <label className="site-inline-checkbox"><input aria-label="Usa colore testo del menu" type="checkbox" checked={draft.ocean_text_color == null} disabled={saving} onChange={(event) => update({ ocean_text_color: event.target.checked ? null : draft.menu_color })} /><span>colore menu</span></label>}
          </div>
          <div className="site-inline-color-setting">
            <label>{ocean ? "sfondo testo" : "sfondo pagina"}<input aria-label={ocean ? "Sfondo testo Navigate" : bio ? "Sfondo pagina BIO" : "Sfondo pagina menu"} type="color" value={backgroundColor} disabled={saving} onChange={(event) => update(bio ? { bio_background_color: event.target.value } : ocean ? { ocean_background_color: event.target.value } : { menu_background_color: event.target.value })} /></label>
            {ocean && <label className="site-inline-checkbox"><input aria-label="Sfondo testo trasparente" type="checkbox" checked={draft.ocean_background_color == null} disabled={saving} onChange={(event) => update({ ocean_background_color: event.target.checked ? null : "#ffffff" })} /><span>trasparente</span></label>}
          </div>
          {bio ? <><label>interlinea<input aria-label="Interlinea BIO" type="number" min="1" max="3" step="0.1" value={draft.bio_line_height} disabled={saving} onChange={(event) => update({ bio_line_height: Number(event.target.value) })} /></label><label>allineamento<select aria-label="Allineamento BIO" value={draft.bio_text_align} disabled={saving} onChange={(event) => update({ bio_text_align: event.target.value as typeof draft.bio_text_align })}><option value="left">sinistra</option><option value="center">centro</option><option value="justify">giustificato</option></select></label></> : <label>spaziatura<input aria-label="Spaziatura lettere" type="number" min="-2" max="12" step="0.1" value={draft.menu_letter_spacing} disabled={saving} onChange={(event) => update({ menu_letter_spacing: Number(event.target.value) })} /></label>}
        </div>}
        {error && <p className="site-inline-error" role="alert">{error}</p>}
      </aside>}
    </>
  );
}
