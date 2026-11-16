import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useInlineSiteEditing } from "@/components/SiteEditControl";
import type { MenuKey } from "@/types/siteContent";
import "@/styles/section-navigation.css";

interface Props {
  section: MenuKey | string;
  title?: string;
  onIndex?: () => void;
  onInfo?: () => void;
  infoExpanded?: boolean;
  infoControls?: string;
  onSection?: () => void;
  children?: ReactNode;
  className?: string;
}

export default function SectionNavigation({ section, title, onIndex, onInfo, infoExpanded, infoControls, onSection, children, className = "" }: Props) {
  const navigate = useNavigate();
  const { editing, settings, draft, update } = useInlineSiteEditing();
  const content = editing ? draft : settings;
  const item = content.menu_items.find((entry) => entry.id === section);
  const label = title || item?.label || section.toUpperCase();
  const [visible, setVisible] = useState(true);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const focused = useRef(false);
  const hovered = useRef(false);
  const schedule = useCallback(() => {
    clearTimeout(timeout.current);
    if (!editing && !focused.current && !hovered.current) timeout.current = setTimeout(() => setVisible(false), 2400);
  }, [editing]);
  const reveal = useCallback(() => { setVisible(true); schedule(); }, [schedule]);
  useEffect(() => {
    if (editing) setVisible(true);
    schedule();
    const hide = (event: PointerEvent) => {
      if (!editing && !(event.target as Element)?.closest?.(".section-navigation, [data-book-view-controls], [data-inline-editor], input, textarea, [contenteditable=true]")) setVisible(false);
    };
    window.addEventListener("pointerdown", hide);
    return () => { clearTimeout(timeout.current); window.removeEventListener("pointerdown", hide); };
  }, [editing, schedule]);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("portfolio:toolbar-visibility", { detail: { section, visible } }));
  }, [section, visible]);

  useEffect(() => {
    const keepControlsVisible = (event: FocusEvent | PointerEvent) => {
      if (!(event.target as Element)?.closest?.("[data-book-view-controls]")) return;
      reveal();
    };
    document.addEventListener("focusin", keepControlsVisible);
    document.addEventListener("pointerdown", keepControlsVisible);
    return () => {
      document.removeEventListener("focusin", keepControlsVisible);
      document.removeEventListener("pointerdown", keepControlsVisible);
    };
  }, [reveal]);

  return (
    <header className={`section-navigation blossom ${visible ? "is-revealed" : "is-concealed"} ${className}`} data-blossom data-portfolio-navigation data-section={section} data-navigation-visible={visible ? "true" : "false"} onPointerEnter={(event) => { if (event.pointerType === "mouse") { hovered.current = true; clearTimeout(timeout.current); } }} onPointerLeave={() => { hovered.current = false; schedule(); }}>
      <nav ref={(node) => { if (node) node.inert = !visible; }} aria-label={`Navigazione ${label}`} className="section-navigation-items" onFocusCapture={() => { focused.current = true; setVisible(true); clearTimeout(timeout.current); }} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) { focused.current = false; schedule(); } }}>
        {onInfo && (section === "horlogerie" || section === "jewelry") && <button onClick={onInfo} type="button" data-watch-info-toggle aria-expanded={infoExpanded} aria-controls={infoControls}>info</button>}
        {editing && item ? <input className="section-title-input" aria-label="Titolo della sezione" value={item.label} onChange={(event) => update({ menu_items: draft.menu_items.map((entry) => entry.id === item.id ? { ...entry, label: event.target.value } : entry) })} /> : onSection ? <button onClick={onSection} type="button" className="section-navigation-title">{label}</button> : <span className="section-navigation-title">{label}</span>}
        {children}
        <span aria-hidden="true" className="section-navigation-bullet">•</span>
        <button type="button" onClick={onIndex ?? (() => navigate("/"))} className="section-index-link">Studierzimmer</button>
      </nav>
      <button type="button" className="section-navigation-reveal" aria-label={visible ? "Nascondi navigazione" : "Rivela navigazione"} aria-expanded={visible} onClick={() => visible ? setVisible(false) : reveal()}><span aria-hidden="true">{visible ? "—" : "←"}</span></button>
    </header>
  );
}
