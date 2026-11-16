import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useArtworks, useSiteContent } from "@/hooks/useSiteContent";
import SiteEditControl, { useInlineSiteEditing } from "@/components/SiteEditControl";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import { saveArtworkItem, uploadArtworkAsset } from "@/services/siteContentRepository";
import type { ArtworkItem } from "@/types/siteContent";
import type { ThreeDModel } from "@/types/threeDModels";
import { artworkImageSources } from "@/lib/artworkImages";
import ArtworkImageCarousel from "@/components/artworks/ArtworkImageCarousel";
import ArtworkImageFields from "@/components/artworks/ArtworkImageFields";
import "./Artworks.css";

const ModelPreview = lazy(() => import("@/components/artworks/ArtworkModelPreview"));
const spring = { type: "spring" as const, stiffness: 190, damping: 25, mass: 0.85 };

function chronologicalArtworks(items: readonly ArtworkItem[]): ArtworkItem[] {
  return items.map((item, order) => ({ item, order })).sort((first, second) => {
    const firstYear = Number.isFinite(first.item.year) ? first.item.year : 0;
    const secondYear = Number.isFinite(second.item.year) ? second.item.year : 0;
    return secondYear - firstYear || first.order - second.order;
  }).map(({ item }) => item);
}

function galleryRowGap(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? Math.min(240, Math.max(16, value)) : 96;
}

function gridMediaTop(slotHeight: number, mediaHeight: number, aligned: boolean): number {
  return (slotHeight - mediaHeight) * (aligned ? 1 : .5);
}

function alignArtworkCaptionRows(grid: HTMLElement): void {
  // Measure layout boxes, never Framer's projected/scaled client rectangles.
  // Reserve space AFTER a short title rather than giving the button a fixed
  // height: its text baseline stays at the top, just like a wrapped title.
  const cards = [...grid.querySelectorAll<HTMLElement>(".artwork-card")].flatMap((card) => {
    const title = card.querySelector<HTMLElement>(".artwork-title-strip");
    return title ? [{ card, row: card.offsetTop, height: title.offsetHeight }] : [];
  });
  const tallest = new Map<number, number>();
  cards.forEach(({ row, height }) => tallest.set(row, Math.max(tallest.get(row) ?? 0, height)));
  cards.forEach(({ card, row, height }) => {
    const reserve = `${Math.max(0, (tallest.get(row) ?? height) - height)}px`;
    if (card.style.getPropertyValue("--artwork-title-reserve") !== reserve) card.style.setProperty("--artwork-title-reserve", reserve);
  });
}

function useDocumentVisible() {
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return visible;
}

function firstVisibleImageId(root: HTMLDivElement): string | null {
  const bounds = root.getBoundingClientRect();
  const first = [...root.querySelectorAll<HTMLElement>('[data-artwork-kind="image"]')].find((card) => {
    const rect = card.getBoundingClientRect();
    return rect.bottom > bounds.top && rect.top < bounds.bottom;
  });
  return first?.dataset.artworkId ?? null;
}

function Preview({ item, model, active, animate, documentVisible, priority, detail, onDimensions }: { item: ArtworkItem; model?: ThreeDModel; active: boolean; animate: boolean; documentVisible: boolean; priority: boolean; detail: boolean; onDimensions: (width: number, height: number) => void }) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!video.current) return;
    if (detail && documentVisible) void video.current.play().catch(() => undefined);
    else video.current.pause();
  }, [detail, documentVisible]);
  if (item.kind === "model" && model && active) return <Suspense fallback={<span className="artwork-preview-status">...</span>}><ModelPreview model={model} motion={animate} /></Suspense>;
  if (item.kind === "video") return <video ref={video} src={item.media_url} poster={item.poster_url || undefined} controls={detail} playsInline preload={active ? "metadata" : "none"} onLoadedMetadata={(event) => onDimensions(event.currentTarget.videoWidth, event.currentTarget.videoHeight)} />;
  const image = item.kind === "image" ? item.media_url : item.poster_url;
  // React 18 passes the lowercase native hint through without an unknown-prop
  // warning. Only one actually visible source receives eager/high priority.
  return image ? <img src={image} alt={detail ? item.description || item.title : ""} loading={priority ? "eager" : "lazy"} {...{ fetchpriority: priority ? "high" : "auto" }} decoding="async" draggable={false} onLoad={(event) => onDimensions(event.currentTarget.naturalWidth, event.currentTarget.naturalHeight)} /> : <span className="artwork-preview-status">3D</span>;
}

function Card({ item, order, model, scrollRoot, reducedMotion, documentVisible, priority, selected, centered, detailOpen, editing, alignGrid = false, onSelect, onClose, onModelReady, onRemoveDraft }: {
  item: ArtworkItem; model?: ThreeDModel; scrollRoot: HTMLDivElement | null; reducedMotion: boolean;
  documentVisible: boolean; priority: boolean;
  alignGrid?: boolean;
  order: number; selected: boolean; centered: boolean; detailOpen: boolean; editing: boolean; onSelect: () => void; onClose: () => void; onModelReady: () => void; onRemoveDraft: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const copySlot = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [mediaRatio, setMediaRatio] = useState(1);
  const [copyHeight, setCopyHeight] = useState(0);
  const [copySettled, setCopySettled] = useState(false);
  const [frame, setFrame] = useState({ width: 1, height: 1, viewportWidth: 1, viewportHeight: 1 });
  const [draft, setDraft] = useState(item);
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);
  const imageSources = useMemo(() => artworkImageSources(draft), [draft]);
  const { registerFields } = useInlineSiteEditing();
  const removeDraftRef = useRef(onRemoveDraft);
  removeDraftRef.current = onRemoveDraft;
  useEffect(() => { setDraft(item); }, [item]);
  useLayoutEffect(() => { setCopySettled(Boolean(centered && reducedMotion)); }, [centered, reducedMotion]);
  useLayoutEffect(() => {
    const element = copySlot.current;
    if (!element || selected) return;
    const measure = () => setCopyHeight(element.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [selected, editing]);
  useLayoutEffect(() => {
    const element = slot.current;
    if (!element) return;
    const measure = () => {
      const next = { width: element.clientWidth, height: element.clientHeight, viewportWidth: window.innerWidth, viewportHeight: window.innerHeight };
      setFrame((previous) => Object.keys(next).every((key) => next[key as keyof typeof next] === previous[key as keyof typeof previous]) ? previous : next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);
  const onDimensions = useCallback((width: number, height: number) => { if (width > 0 && height > 0) setMediaRatio(width / height); }, []);
  const mobile = frame.viewportWidth <= 580;
  const gridWidth = Math.min(frame.width * (mobile ? .85 : .88), frame.height * mediaRatio);
  const detailHeight = frame.viewportHeight * (mobile ? .58 : .64);
  const detailWidth = Math.min(frame.viewportWidth - (mobile ? 36 : 56), 1100, detailHeight * mediaRatio);
  // Both endpoints have precisely the same aspect ratio. Framer's projection
  // can therefore use one uniform scale instead of stretching the bitmap.
  const mediaFrame = selected && centered
    ? { width: detailWidth, height: detailWidth / mediaRatio, left: (frame.viewportWidth - detailWidth) / 2, top: frame.viewportHeight * (mobile ? .14 : .12) + (detailHeight - detailWidth / mediaRatio) / 2 }
    : { width: gridWidth, height: gridWidth / mediaRatio, left: frame.width - gridWidth, top: gridMediaTop(frame.height, gridWidth / mediaRatio, alignGrid) };
  useEffect(() => {
    if (!ref.current || !scrollRoot) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { root: scrollRoot, rootMargin: "80px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [scrollRoot]);
  const commit = useCallback(async (patch: Partial<ArtworkItem> = {}, propagate = false) => {
    if (saving) {
      const error = new Error("Attendi il completamento del caricamento delle immagini.");
      setFeedback(error.message); if (propagate) throw error; return;
    }
    const next = { ...draft, ...patch }; setDraft(next);
    if (!next.title.trim() || (!next.media_url && !next.model_id)) {
      const error = new Error("Inserisci titolo e immagine prima di salvare.");
      setFeedback("Inserisci titolo e immagine prima di salvare.");
      if (propagate) throw error;
      return;
    }
    setSaving(true); setFeedback("");
    try { await saveArtworkItem(next); setFeedback("Salvato"); }
    catch (error) { setFeedback(error instanceof Error ? error.message : "Salvataggio non riuscito"); if (propagate) throw error; }
    finally { setSaving(false); }
  }, [draft, saving]);
  useEffect(() => {
    if (!editing) return;
    return registerFields(`artwork:${item.id}`, {
      save: () => commit({}, true),
      cancel: () => { setDraft(item); setFeedback(""); if (!item.media_url && !item.model_id) removeDraftRef.current(); },
      isDirty: () => saving || JSON.stringify(draft) !== JSON.stringify(item),
    });
  }, [editing, draft, item, registerFields, commit, saving]);
  const activate = () => { if (!editing && !(item.kind === "video" && selected)) { if (selected) onClose(); else onSelect(); } };

  return <article className={`artwork-card${selected ? " is-selected" : ""}${detailOpen && !selected ? " is-away" : ""}`} ref={ref} data-artwork-id={item.id} data-artwork-kind={draft.kind} data-year={draft.year} style={{ "--artwork-entry-delay": `${Math.min(order, 8) * 65}ms`, "--artwork-copy-width": `${frame.width}px` } as CSSProperties}>
    <div className="artwork-preview-slot" ref={slot}>
      {/* A single persistent media node moves between its two measured layouts.
          No duplicate image, shared-layout crossfade, or opacity animation. */}
      <motion.div layout className={`artwork-card-preview${selected && centered ? " is-centered" : ""}${imageSources.length > 1 ? " has-image-stack" : ""}`} style={mediaFrame} data-blossom="media"
        transition={{ layout: reducedMotion ? { duration: 0 } : spring }}
        onLayoutAnimationComplete={() => { if (selected && centered && item.kind === "model") onModelReady(); }}
        role={item.kind === "video" && selected ? undefined : "button"} tabIndex={editing || (detailOpen && !selected) || (item.kind === "video" && selected) ? -1 : 0}
        aria-label={selected ? `Torna alla selezione: ${draft.title}` : `Apri ${draft.title}`} onClick={activate}
        onKeyDown={(event) => { if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); activate(); } }}>
        {imageSources.length > 1 ? <ArtworkImageCarousel images={imageSources} title={draft.title} open={selected && centered} active={active || selected} reducedMotion={reducedMotion} width={mediaFrame.width} height={mediaFrame.height} viewportWidth={frame.viewportWidth}>
          <Preview item={draft} model={model} active={active || selected} animate={false} documentVisible={documentVisible} priority={priority} detail={selected && centered} onDimensions={onDimensions} />
        </ArtworkImageCarousel> : <Preview item={draft} model={model} active={active || selected} animate={!reducedMotion && documentVisible && (active || selected) && (!detailOpen || selected)} documentVisible={documentVisible} priority={priority} detail={selected && centered} onDimensions={onDimensions} />}
      </motion.div>
    </div>
    {editing ? <div className="artwork-inline-fields" data-inline-editor>
      <input aria-label="Titolo opera" placeholder="Titolo" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
      <textarea aria-label="Descrizione opera" placeholder="Descrizione" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} rows={3} />
      <label>Anno<input type="number" aria-label="Anno opera" value={draft.year} min={1} max={9999} onChange={(event) => setDraft({ ...draft, year: Number(event.target.value) })} /></label>
      <input type="url" aria-label="Link articolo" placeholder="https://… · link articolo" value={draft.external_url || ""} onChange={(event) => setDraft({ ...draft, external_url: event.target.value })} />
      {draft.kind === "image" && <ArtworkImageFields value={draft} disabled={saving} onBusyChange={setSaving} onChange={(patch) => setDraft((current) => ({ ...current, ...patch }))} />}
      {draft.kind === "video" && <label className="artwork-inline-upload">{draft.media_url ? "Sostituisci video" : "Carica video"}<input type="file" accept="video/mp4,video/webm,video/quicktime" disabled={saving} onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; setSaving(true); try { const url = await uploadArtworkAsset(file); setDraft((current) => ({ ...current, media_url: url })); } catch (error) { setFeedback(error instanceof Error ? error.message : "Upload non riuscito"); } finally { setSaving(false); } }} /></label>}
      <label><input type="checkbox" checked={draft.is_published} onChange={(event) => setDraft({ ...draft, is_published: event.target.checked })} /> Pubblicato</label>
      <label><input type="checkbox" checked={Boolean(draft.is_jewelry)} onChange={(event) => setDraft({ ...draft, is_jewelry: event.target.checked })} /> Fashion and Jewelry</label>
      <label><input type="checkbox" checked={Boolean(draft.is_featured_in)} onChange={(event) => setDraft({ ...draft, is_featured_in: event.target.checked })} /> Featured In</label>
      <div className="artwork-inline-actions"><button disabled={saving} onClick={() => void commit()}>salva opera</button><button disabled={saving} onClick={() => { setDraft(item); setFeedback(""); if (!item.media_url && !item.model_id) onRemoveDraft(); }}>annulla</button></div>
      <small role="status">{saving ? "Salvataggio…" : feedback}</small>
    </div> : <div className="artwork-copy-slot" ref={copySlot} style={selected ? { height: copyHeight } : undefined}><div className={`artwork-card-copy${selected && centered ? " is-centered" : ""}${copySettled ? " is-copy-settled" : ""}`}>
      {/* Project the text blocks themselves, not their changing flex container.
          Their wrapping width stays constant and overflow remains visible while
          they travel, so no glyph reflow or scroll clipping can make them blink. */}
      <motion.button layout="position" transition={{ layout: reducedMotion ? { duration: 0 } : spring }} onLayoutAnimationComplete={() => { if (selected && centered) setCopySettled(true); }} type="button" data-blossom="title" className="artwork-title-strip" tabIndex={detailOpen && !selected ? -1 : 0} onClick={() => selected ? onClose() : onSelect()}>{draft.title}</motion.button>
      {draft.description && <motion.p layout="position" transition={{ layout: reducedMotion ? { duration: 0 } : spring }} data-blossom="description" className="artwork-card-description">{draft.description}</motion.p>}
      {draft.external_url && <motion.a layout="position" transition={{ layout: reducedMotion ? { duration: 0 } : spring }} data-blossom="link" className="artwork-article-link" tabIndex={detailOpen && !selected ? -1 : undefined} href={draft.external_url} target="_blank" rel="noopener noreferrer">Leggi l’articolo ↗</motion.a>}
    </div></div>}
  </article>;
}

export const ArtworkCard = Card;

function GalleryView({ fashionOnly = false, featuredOnly = false, jewelryOnly = false }: { fashionOnly?: boolean; featuredOnly?: boolean; jewelryOnly?: boolean }) {
  const navigate = useNavigate();
  const inline = useInlineSiteEditing();
  const { settings } = useSiteContent();
  const { items, loading, error, reload } = useArtworks(inline.editing);
  const reducedMotion = Boolean(useReducedMotion());
  const documentVisible = useDocumentVisible();
  const [models, setModels] = useState<ThreeDModel[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [centered, setCentered] = useState(false);
  const [settling, setSettling] = useState(false);
  const [newItems, setNewItems] = useState<ArtworkItem[]>([]);
  const [activeYear, setActiveYear] = useState<number | string | null>(null);
  const [scrollRoot, setScrollRoot] = useState<HTMLDivElement | null>(null);
  const [priorityImageId, setPriorityImageId] = useState<string | null>(null);
  const modelOpening = useRef(false);
  const restored = useRef(false);
  const closeTimer = useRef<number | null>(null);
  const openingTimer = useRef<number | null>(null);
  const grid = useRef<HTMLElement>(null);
  const section = featuredOnly ? "featured" : jewelryOnly ? "jewelry" : fashionOnly ? "fashion" : "artworks";
  const alignedGrid = !featuredOnly;
  const spacingSection = jewelryOnly || fashionOnly ? "jewelry" : "artworks";
  const rowGap = galleryRowGap((inline.editing ? inline.draft : settings).gallery_row_gap?.[spacingSection]);
  const returnPath = featuredOnly ? "/featured-in" : jewelryOnly ? "/fashionandjewelry" : fashionOnly ? "/fashion" : "/artworks";
  const sectionTitle = (inline.editing ? inline.draft : settings).menu_items.find((item) => item.id === section)?.label || (featuredOnly ? "FEATURED IN" : jewelryOnly ? "Fashion and Jewelry" : fashionOnly ? "FASHION" : "ARTWORKS");
  const scrollKey = `studierzimmer:artwork-scroll:${jewelryOnly ? "/jewelry" : returnPath}`;
  const visibleItems = useMemo(() => {
    const matching = [...items, ...newItems.filter((draft) => !items.some((item) => item.id === draft.id))].filter((item) => featuredOnly ? item.is_featured_in : jewelryOnly ? item.is_jewelry : fashionOnly ? item.is_fashion : !item.is_featured_in && !item.is_jewelry);
    return featuredOnly ? matching : chronologicalArtworks(matching);
  }, [items, newItems, fashionOnly, featuredOnly, jewelryOnly]);
  const modelIds = useMemo(() => [...new Set(visibleItems.flatMap((item) => item.kind === "model" && item.model_id ? [item.model_id] : []))], [visibleItems]);
  useLayoutEffect(() => {
    const element = grid.current;
    if (!element || !alignedGrid || inline.editing || selectedId) return;
    const align = () => alignArtworkCaptionRows(element);
    align();
    const observer = new ResizeObserver(align);
    observer.observe(element);
    element.querySelectorAll(".artwork-title-strip").forEach((title) => observer.observe(title));
    return () => observer.disconnect();
  }, [alignedGrid, inline.editing, selectedId, visibleItems]);
  useEffect(() => {
    if (!modelIds.length) { setModels([]); return; }
    let active = true;
    void import("@/services/threeDModelRepository").then(({ listPublishedThreeDModelsByIds }) => active ? listPublishedThreeDModelsByIds(modelIds) : []).then((next) => { if (active) setModels(next); }).catch(() => { if (active) setModels([]); });
    return () => { active = false; };
  }, [modelIds]);
  useLayoutEffect(() => {
    if (!scrollRoot || loading || restored.current) return;
    restored.current = true;
    try { scrollRoot.scrollTop = Number(sessionStorage.getItem(scrollKey)) || 0; } catch { /* Scroll memory is optional. */ }
  }, [loading, scrollRoot, scrollKey]);
  useLayoutEffect(() => {
    if (!scrollRoot || loading || priorityImageId) return;
    setPriorityImageId(firstVisibleImageId(scrollRoot));
  }, [loading, scrollRoot, priorityImageId, visibleItems]);
  useEffect(() => {
    if (!scrollRoot) return;
    const remember = () => { try { sessionStorage.setItem(scrollKey, String(scrollRoot.scrollTop)); } catch { /* Storage can be unavailable. */ } };
    scrollRoot.addEventListener("scroll", remember, { passive: true });
    return () => { remember(); scrollRoot.removeEventListener("scroll", remember); };
  }, [scrollRoot, scrollKey]);
  useEffect(() => {
    if (!scrollRoot || visibleItems.length === 0) { setActiveYear(null); return; }
    setActiveYear(visibleItems[0].year);
    const visible = new Map<string, IntersectionObserverEntry>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { const id = (entry.target as HTMLElement).dataset.artworkId; if (id) { if (entry.isIntersecting) visible.set(id, entry); else visible.delete(id); } });
      const center = scrollRoot.getBoundingClientRect().top + scrollRoot.clientHeight / 2;
      const closest = [...visible.values()].sort((a, b) => Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - center) - Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - center))[0];
      if (closest) setActiveYear((closest.target as HTMLElement).dataset.year ?? null);
    }, { root: scrollRoot, rootMargin: "-15% 0px -15% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });
    scrollRoot.querySelectorAll("[data-artwork-id]").forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [scrollRoot, visibleItems]);
  const close = useCallback(() => {
    setCentered(false); setSettling(true); modelOpening.current = false;
    if (openingTimer.current) window.clearTimeout(openingTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => { setSelectedId(null); setSettling(false); }, reducedMotion ? 0 : 700);
  }, [reducedMotion]);
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => { if (event.key === "Escape" && selectedId) close(); };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [selectedId, close]);
  useEffect(() => () => { if (closeTimer.current) window.clearTimeout(closeTimer.current); if (openingTimer.current) window.clearTimeout(openingTimer.current); }, []);
  useEffect(() => { if (inline.editing && selectedId) close(); }, [inline.editing, selectedId, close]);

  return <LayoutGroup id={section}>
    <div className={`artworks-page${selectedId ? " has-detail" : ""}${settling ? " is-settling" : ""}`}>
      <SectionNavigation section={section} title={sectionTitle}>{selectedId && <button className="artwork-grid-return" onClick={close}>back</button>}</SectionNavigation>
      <SiteEditControl section="menu" />
      <div ref={setScrollRoot} className={`artworks-scroll${selectedId ? " is-detail-open" : ""}${inline.editing && alignedGrid ? " is-layout-editing" : ""}`}>
        {loading && <p key={`${section}:loading`} className="artworks-empty artwork-status-blossom" data-blossom role="status">...</p>}
        {error && <div key={`${section}:error`} className="artworks-empty artwork-status-blossom" data-blossom role="alert"><p>{error}</p><button type="button" onClick={() => void reload()}>Riprova</button></div>}
        {!loading && !error && visibleItems.length === 0 && <p key={`${section}:empty`} className="artworks-empty artwork-status-blossom" data-blossom>{featuredOnly ? "Articoli e apparizioni, prossimamente." : jewelryOnly ? `Nessun contenuto ${sectionTitle} pubblicato.` : fashionOnly ? "Nessun lavoro Fashion pubblicato." : "Nessun artwork pubblicato."}</p>}
        {centered && <div className="artwork-detail-background" onClick={close} aria-hidden="true" />}
        {inline.editing && alignedGrid && <div className="artworks-layout-controls" data-inline-edit-ui>
          <label htmlFor={`gallery-row-gap-${section}`}>spaziatura righe</label>
          <input id={`gallery-row-gap-${section}`} type="range" min={16} max={240} step={1} value={rowGap} disabled={inline.saving} aria-valuetext={`${rowGap} pixel`} onChange={(event) => inline.update({ gallery_row_gap: { ...inline.draft.gallery_row_gap, [spacingSection]: galleryRowGap(Number(event.currentTarget.value)) } })} />
          <output htmlFor={`gallery-row-gap-${section}`}>{rowGap} px</output>
        </div>}
        <main ref={grid} className={`artworks-grid${alignedGrid ? " is-aligned" : ""}`} style={alignedGrid ? { "--artwork-row-gap": `${rowGap}px` } as CSSProperties : undefined} aria-label={sectionTitle}>
          {visibleItems.map((item, index) => <ArtworkCard key={item.id} item={item} order={index} model={models.find((model) => model.id === item.model_id)} scrollRoot={scrollRoot} reducedMotion={reducedMotion} documentVisible={documentVisible} priority={priorityImageId === item.id} selected={selectedId === item.id} centered={centered} detailOpen={Boolean(selectedId)} editing={inline.editing} alignGrid={alignedGrid} onSelect={() => { if (selectedId) return; modelOpening.current = false; setSelectedId(item.id); openingTimer.current = window.setTimeout(() => setCentered(true), reducedMotion ? 0 : 450); }} onClose={close} onModelReady={() => { if (modelOpening.current || !item.model_id) return; modelOpening.current = true; navigate(`/3d?model=${encodeURIComponent(item.model_id)}`, { state: { returnTo: returnPath } }); }} onRemoveDraft={() => setNewItems((current) => current.filter((draft) => draft.id !== item.id))} />)}
          {inline.editing && <button className="artwork-add-inline artwork-status-blossom" data-blossom onClick={() => setNewItems((current) => [...current, { id: crypto.randomUUID(), title: "", year: new Date().getFullYear(), kind: "image", media_url: "", poster_url: null, model_id: null, is_fashion: fashionOnly, is_jewelry: jewelryOnly, is_featured_in: featuredOnly, is_published: false, sort_order: (items.length + current.length) * 10, description: "", external_url: null }])}>+ aggiungi {featuredOnly ? "articolo" : "opera"}</button>}
        </main>
      </div>
      {!selectedId && !settling && activeYear !== null && <div className="artworks-year artwork-status-blossom" data-blossom aria-live="polite">{activeYear}</div>}
    </div>
  </LayoutGroup>;
}

export default function Artworks(props: { fashionOnly?: boolean; featuredOnly?: boolean; jewelryOnly?: boolean }) {
  const section = props.featuredOnly ? "featured" : props.jewelryOnly ? "jewelry" : props.fashionOnly ? "fashion" : "artworks";
  // React may reuse this route component between sibling galleries. A section
  // owns its entry choreography, scroll restoration, and selected-media state.
  return <GalleryView key={section} {...props} />;
}
