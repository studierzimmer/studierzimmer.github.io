import { useEffect, useRef, useState, type FormEvent } from "react";
import { useArtworks } from "@/hooks/useSiteContent";
import { deleteArtworkItem, saveArtworkItem, uploadArtworkAsset } from "@/services/siteContentRepository";
import { listAllThreeDModelsForAdmin } from "@/services/threeDModelRepository";
import type { ArtworkItem } from "@/types/siteContent";
import type { ThreeDModel } from "@/types/threeDModels";
import "./AdminArtworkManager.css";

function emptyArtwork(order: number): ArtworkItem {
  return {
    id: "", title: "", year: new Date().getFullYear(), kind: "image", media_url: "",
    poster_url: null, model_id: null, is_fashion: false, is_published: false,
    sort_order: order, description: "", is_featured_in: false, external_url: null,
  };
}

function messageFrom(error: unknown): string {
  return error instanceof Error ? error.message : "Unable to save the artwork.";
}

export default function AdminArtworkManager({ onArtworksChanged }: { onArtworksChanged?: () => void }) {
  const { items, loading, error: loadError } = useArtworks(true);
  const [models, setModels] = useState<ThreeDModel[]>([]);
  const [modelError, setModelError] = useState<string | null>(null);
  const [draft, setDraft] = useState<ArtworkItem>(() => emptyArtwork(0));
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [formVersion, setFormVersion] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let active = true;
    void listAllThreeDModelsForAdmin()
      .then((nextModels) => { if (active) setModels(nextModels); })
      .catch((failure) => { if (active) setModelError(messageFrom(failure)); });
    return () => { active = false; };
  }, []);

  const resetFiles = () => { setMediaFile(null); setPosterFile(null); setFormVersion((version) => version + 1); };
  const edit = (item: ArtworkItem) => {
    setDraft({ ...item }); resetFiles(); setNotice(null); setError(null);
  };
  const create = () => {
    setDraft(emptyArtwork(items.length ? Math.max(...items.map((item) => item.sort_order)) + 10 : 0));
    resetFiles(); setNotice(null); setError(null);
    window.requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('input[name="artwork-title"]')?.focus());
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(null); setNotice(null);
    if (!draft.title.trim()) { setError("Enter a title."); return; }
    if (!Number.isInteger(draft.year) || draft.year < 1 || draft.year > 9999) { setError("Enter a valid year."); return; }
    if (draft.kind === "model" && !draft.model_id) { setError("Select a model from the 3D library."); return; }
    if (draft.kind === "model" && draft.is_published && !models.some((model) => model.id === draft.model_id && model.is_published)) { setError("Publish the model in the 3D library before publishing this artwork."); return; }
    if (draft.kind !== "model" && !mediaFile && !draft.media_url.trim()) { setError("Upload an image or a video."); return; }
    if (draft.kind === "video" && !posterFile && !draft.poster_url) { setError("Upload a still preview for the video."); return; }
    if (draft.external_url?.trim()) {
      try { const url = new URL(draft.external_url); if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) throw new Error(); }
      catch { setError("Inserisci un link articolo valido che inizi con https:// o http://."); return; }
    }
    setBusy(true);
    try {
      const mediaUrl = mediaFile ? await uploadArtworkAsset(mediaFile) : draft.media_url;
      const posterUrl = posterFile ? await uploadArtworkAsset(posterFile) : draft.poster_url;
      const saved = await saveArtworkItem({
        ...draft,
        id: draft.id || crypto.randomUUID(),
        title: draft.title.trim(),
        description: draft.description.trim(),
        media_url: draft.kind === "model" ? "" : mediaUrl,
        poster_url: posterUrl || null,
        model_id: draft.kind === "model" ? draft.model_id : null,
      });
      setDraft(saved); resetFiles(); setNotice("Artwork saved."); onArtworksChanged?.();
    } catch (failure) { setError(messageFrom(failure)); }
    finally { setBusy(false); }
  };

  const remove = async (item: ArtworkItem) => {
    if (!window.confirm(`Delete “${item.title}” from Artworks and Fashion?`)) return;
    setBusy(true); setError(null); setNotice(null);
    try {
      await deleteArtworkItem(item.id);
      if (draft.id === item.id) { setDraft(emptyArtwork(items.length * 10)); resetFiles(); }
      setNotice("Artwork deleted."); onArtworksChanged?.();
    } catch (failure) { setError(messageFrom(failure)); }
    finally { setBusy(false); }
  };

  const move = async (index: number, offset: number) => {
    const target = index + offset;
    if (target < 0 || target >= items.length) return;
    const reordered = [...items];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setBusy(true); setError(null); setNotice(null);
    try {
      // Sequential saves also preserve order in the browser's local draft store.
      for (let nextIndex = 0; nextIndex < reordered.length; nextIndex += 1) {
        const item = reordered[nextIndex];
        if (item.sort_order !== nextIndex * 10) await saveArtworkItem({ ...item, sort_order: nextIndex * 10 });
      }
      const newOrder = reordered.findIndex((item) => item.id === draft.id);
      if (newOrder >= 0) setDraft((current) => ({ ...current, sort_order: newOrder * 10 }));
      setNotice("Order updated."); onArtworksChanged?.();
    } catch (failure) { setError(messageFrom(failure)); }
    finally { setBusy(false); }
  };

  const selectedModel = models.find((model) => model.id === draft.model_id);

  return (
    <section className="admin-artworks" aria-label="Artworks manager">
      <header className="admin-artworks-heading"><div><h2>ARTWORKS / FASHION / FEATURED IN</h2><p>Immagini, video e modelli. Scegli Fashion per i lavori moda o Featured In per articoli e apparizioni esterne.</p></div><button type="button" onClick={create} disabled={busy}>+ NUOVO CONTENUTO</button></header>
      {loading && <p className="admin-artworks-message" role="status">Loading artworks...</p>}
      {(loadError || error) && <p className="admin-artworks-message is-error" role="alert">{error || loadError}</p>}
      {notice && <p className="admin-artworks-message" role="status">{notice}</p>}
      <div className="admin-artworks-list" aria-label="Artwork list">
        {items.map((item, index) => <article key={item.id} className={`admin-artwork-list-item${item.id === draft.id ? " is-selected" : ""}`}>
          <button type="button" className="admin-artwork-select" onClick={() => edit(item)} disabled={busy} aria-pressed={item.id === draft.id}>
            {(item.kind === "image" ? item.media_url : item.poster_url) ? <img src={(item.kind === "image" ? item.media_url : item.poster_url)!} alt="" loading="lazy" /> : <span className="admin-artwork-format">{item.kind === "model" ? "3D" : "VIDEO"}</span>}
            <span>{item.title}</span><small>{item.year} · {item.is_published ? "PUBLISHED" : "DRAFT"}{item.is_fashion ? " · FASHION" : ""}{item.is_featured_in ? " · FEATURED IN" : ""}</small>
          </button>
          <div className="admin-artwork-order"><button type="button" aria-label={`Move ${item.title} earlier`} onClick={() => void move(index, -1)} disabled={busy || index === 0}>←</button><button type="button" aria-label={`Move ${item.title} later`} onClick={() => void move(index, 1)} disabled={busy || index === items.length - 1}>→</button><button type="button" onClick={() => void remove(item)} disabled={busy} aria-label={`Delete ${item.title}`}>DELETE</button></div>
        </article>)}
        {!loading && !items.length && <p className="admin-artworks-message">No works yet. Upload your first image, video or select a model below.</p>}
      </div>
      <form ref={formRef} onSubmit={(event) => void save(event)} className="admin-artwork-form">
        <h3>{draft.id ? "EDIT WORK" : "NEW WORK"}</h3>
        <fieldset disabled={busy}>
          <div className="admin-artwork-fields">
            <label className="admin-artwork-wide">Title<input name="artwork-title" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} maxLength={240} required /></label>
            <label>Year<input type="number" min={1} max={9999} step={1} value={draft.year} onChange={(event) => setDraft({ ...draft, year: event.target.valueAsNumber })} required /></label>
            <label>Media type<select value={draft.kind} onChange={(event) => { setDraft({ ...draft, kind: event.target.value as ArtworkItem["kind"], media_url: "", model_id: null }); resetFiles(); }}><option value="image">Image</option><option value="video">Video</option><option value="model">3D model</option></select></label>
            {draft.kind === "model" ? <label className="admin-artwork-wide">Model from the 3D library<select value={draft.model_id || ""} onChange={(event) => setDraft({ ...draft, model_id: event.target.value || null })} required><option value="">Select a model</option>{models.map((model) => <option key={model.id} value={model.id}>{model.name}{model.is_published ? "" : " (draft)"}</option>)}</select>{modelError && <small className="is-error">{modelError}</small>}{selectedModel && !selectedModel.is_published && <small>Publish this model in the 3D library before publishing its artwork.</small>}</label> : <label className="admin-artwork-wide">{draft.kind === "image" ? "Image" : "Video"} upload<input key={`media-${formVersion}`} type="file" accept={draft.kind === "image" ? ".png,.jpg,.jpeg,.webp,.avif,.gif,image/*" : ".mp4,.webm,.mov,video/mp4,video/webm,video/quicktime"} onChange={(event) => setMediaFile(event.target.files?.[0] ?? null)} /><small>{mediaFile ? mediaFile.name : draft.media_url ? "Current media saved. Choose a file to replace it." : "Up to 50 MB."}</small></label>}
            {draft.kind !== "image" && <label className="admin-artwork-wide">{draft.kind === "video" ? "Video still preview (required)" : "Poster image (optional)"}<input key={`poster-${formVersion}`} type="file" accept=".png,.jpg,.jpeg,.webp,.avif,.gif,image/*" onChange={(event) => setPosterFile(event.target.files?.[0] ?? null)} /><small>{posterFile ? posterFile.name : draft.poster_url ? "Preview saved." : draft.kind === "model" ? "The catalogue animates the actual model when it is visible." : "The video starts only after opening the work."}</small>{draft.poster_url && <button type="button" onClick={() => { setDraft({ ...draft, poster_url: null }); setPosterFile(null); setFormVersion((value) => value + 1); }}>REMOVE PREVIEW</button>}</label>}
            <label className="admin-artwork-wide">Description<textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} rows={3} /></label>
            <label className="admin-artwork-wide">Link articolo esterno<input type="url" value={draft.external_url || ""} onChange={(event) => setDraft({ ...draft, external_url: event.target.value })} placeholder="https://…" /><small>Il link si apre in una nuova scheda. Facoltativo per Artworks e Fashion.</small></label>
            <label>Order<input type="number" value={draft.sort_order} onChange={(event) => setDraft({ ...draft, sort_order: event.target.valueAsNumber || 0 })} /></label>
          </div>
          <div className="admin-artwork-flags"><label><input type="checkbox" checked={draft.is_fashion} onChange={(event) => setDraft({ ...draft, is_fashion: event.target.checked })} />Fashion</label><label><input type="checkbox" checked={Boolean(draft.is_featured_in)} onChange={(event) => setDraft({ ...draft, is_featured_in: event.target.checked })} />Featured In</label><label><input type="checkbox" checked={draft.is_published} onChange={(event) => setDraft({ ...draft, is_published: event.target.checked })} />Published</label></div>
          <div className="admin-artwork-actions"><button type="submit" className="admin-artwork-save">{busy ? "SAVING..." : "SAVE WORK"}</button>{draft.id && <button type="button" onClick={() => void remove(draft)}>DELETE WORK</button>}</div>
        </fieldset>
      </form>
    </section>
  );
}
