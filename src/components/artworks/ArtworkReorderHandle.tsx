import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import "./ArtworkReorderHandle.css";

interface Props {
  id: string;
  year: number;
  label?: string;
  disabled?: boolean;
  className?: string;
  onMove: (id: string, targetId: string) => void;
}

interface Point { x: number; y: number }
type Bounds = Pick<DOMRect, "left" | "right" | "top" | "bottom" | "width" | "height">;

function cardsIn(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(".artwork-card[data-artwork-id][data-year]")];
}

function yearOf(card: HTMLElement): number | null {
  const value = Number(card.dataset.year);
  return card.dataset.year?.trim() && Number.isFinite(value) ? value : null;
}

/** Rectangular distance handles multi-column grids and the spaces between rows. */
function nearestCard(cards: HTMLElement[], point: Point): HTMLElement | null {
  let nearest: HTMLElement | null = null;
  let distance = Number.POSITIVE_INFINITY;
  let centerDistance = Number.POSITIVE_INFINITY;
  for (const card of cards) {
    const rect = card.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) continue;
    const dx = Math.max(rect.left - point.x, 0, point.x - rect.right);
    const dy = Math.max(rect.top - point.y, 0, point.y - rect.bottom);
    const nextDistance = dx * dx + dy * dy;
    const nextCenter = (point.x - (rect.left + rect.right) / 2) ** 2 + (point.y - (rect.top + rect.bottom) / 2) ** 2;
    if (nextDistance < distance || (nextDistance === distance && nextCenter < centerDistance)) {
      nearest = card; distance = nextDistance; centerDistance = nextCenter;
    }
  }
  return nearest;
}

function scrollVelocity(point: Point, rect: Bounds): number {
  if (point.x < rect.left || point.x > rect.right || rect.height <= 0) return 0;
  const edge = Math.min(72, rect.height * .18);
  if (point.y < rect.top + edge) return -680 * Math.min(1, (rect.top + edge - point.y) / edge);
  if (point.y > rect.bottom - edge) return 680 * Math.min(1, (point.y - rect.bottom + edge) / edge);
  return 0;
}

interface Session {
  id: string;
  year: number;
  pointerId: number;
  button: HTMLButtonElement;
  card: HTMLElement;
  root: HTMLElement;
  point: Point;
  origin: Point;
  dragging: boolean;
  target: HTMLElement | null;
  frame: number | null;
  lastFrame: number | null;
  finish: (reason: "drop" | "cancel" | "escape" | "blur" | "silent") => void;
}

const activeRoots = new WeakMap<HTMLElement, Session>();

/** A dedicated edit control. It never moves DOM nodes or modifies artwork data. */
export default function ArtworkReorderHandle({ id, year, label = "opera", disabled = false, className = "", onMove }: Props) {
  const hintId = useId();
  const [dragging, setDragging] = useState(false);
  const [notice, setNotice] = useState("");
  const session = useRef<Session | null>(null);
  const latest = useRef({ id, year, disabled, onMove });
  latest.current = { id, year, disabled, onMove };

  useEffect(() => {
    setDragging(false);
    return () => session.current?.finish("silent");
  }, [id, year, disabled]);

  const start = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (disabled || event.button !== 0 || event.isPrimary === false || session.current) return;
    const button = event.currentTarget;
    const card = button.closest<HTMLElement>(".artwork-card[data-artwork-id][data-year]");
    const root = button.closest<HTMLElement>(".artworks-scroll");
    const document = button.ownerDocument;
    const view = document.defaultView;
    if (!card || !root || !view || card.dataset.artworkId !== id || yearOf(card) !== year) return;
    activeRoots.get(root)?.finish("cancel");
    event.preventDefault(); event.stopPropagation();
    button.focus({ preventScroll: true });
    setNotice("");
    const state: Session = {
      id, year, pointerId: event.pointerId, button, card, root,
      point: { x: event.clientX, y: event.clientY }, origin: { x: event.clientX, y: event.clientY },
      dragging: false, target: null, frame: null, lastFrame: null, finish: () => {},
    };
    session.current = state;
    activeRoots.set(root, state);

    const clearTarget = () => {
      state.target?.classList.remove("is-artwork-reorder-target", "is-artwork-reorder-invalid");
      state.target = null;
    };
    const updateTarget = () => {
      const rect = root.getBoundingClientRect();
      const point = state.point;
      const inside = point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
      const candidate = inside ? nearestCard(cardsIn(root), point) : null;
      const target = candidate?.dataset.artworkId === id ? null : candidate;
      clearTarget();
      state.target = target;
      if (target) target.classList.add(yearOf(target) === year ? "is-artwork-reorder-target" : "is-artwork-reorder-invalid");
    };
    const frame = (time: number) => {
      if (session.current !== state || !state.dragging) return;
      const elapsed = state.lastFrame === null ? 16 : Math.min(32, Math.max(0, time - state.lastFrame));
      state.lastFrame = time;
      const speed = scrollVelocity(state.point, root.getBoundingClientRect());
      if (speed !== 0) {
        const maximum = Math.max(0, root.scrollHeight - root.clientHeight);
        root.scrollTop = Math.max(0, Math.min(maximum, root.scrollTop + speed * elapsed / 1000));
        updateTarget();
      }
      state.frame = view.requestAnimationFrame(frame);
    };
    const move = (pointer: PointerEvent) => {
      if (pointer.pointerId !== state.pointerId || session.current !== state) return;
      state.point = { x: pointer.clientX, y: pointer.clientY };
      const dx = state.point.x - state.origin.x, dy = state.point.y - state.origin.y;
      if (!state.dragging && Math.hypot(dx, dy) < 6) return;
      pointer.preventDefault();
      if (!state.dragging) {
        state.dragging = true; setDragging(true);
        card.classList.add("is-artwork-reordering"); root.classList.add("has-artwork-reorder");
        state.frame = view.requestAnimationFrame(frame);
      }
      button.style.setProperty("--artwork-reorder-x", `${Math.max(-10, Math.min(10, dx))}px`);
      button.style.setProperty("--artwork-reorder-y", `${Math.max(-10, Math.min(10, dy))}px`);
      updateTarget();
    };
    const up = (pointer: PointerEvent) => {
      if (pointer.pointerId !== state.pointerId || session.current !== state) return;
      state.point = { x: pointer.clientX, y: pointer.clientY };
      if (state.dragging) { pointer.preventDefault(); updateTarget(); }
      state.finish("drop");
    };
    const cancel = (pointer: PointerEvent) => { if (pointer.pointerId === state.pointerId) state.finish("cancel"); };
    const escape = (key: KeyboardEvent) => {
      if (key.key !== "Escape") return;
      key.preventDefault(); key.stopPropagation(); state.finish("escape");
    };
    const blur = () => state.finish("blur");
    const lost = (pointer: PointerEvent) => { if (pointer.pointerId === state.pointerId) state.finish("cancel"); };
    state.finish = (reason) => {
      if (session.current !== state) return;
      session.current = null;
      if (activeRoots.get(root) === state) activeRoots.delete(root);
      const target = state.target;
      clearTarget();
      card.classList.remove("is-artwork-reordering"); root.classList.remove("has-artwork-reorder");
      button.style.removeProperty("--artwork-reorder-x"); button.style.removeProperty("--artwork-reorder-y");
      if (state.frame !== null) view.cancelAnimationFrame(state.frame);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", cancel);
      document.removeEventListener("keydown", escape, true);
      view.removeEventListener("blur", blur);
      button.removeEventListener("lostpointercapture", lost);
      try { if (button.hasPointerCapture(state.pointerId)) button.releasePointerCapture(state.pointerId); } catch { /* The browser may have cancelled capture already. */ }
      if (reason === "silent") return;
      setDragging(false);
      if (reason === "escape") button.focus({ preventScroll: true });
      if (reason !== "drop") { setNotice("Riordino annullato."); return; }
      if (!state.dragging) return;
      if (target && yearOf(target) !== year) { setNotice(`Puoi spostare solo tra opere del ${year}.`); return; }
      const current = latest.current;
      if (target?.dataset.artworkId && yearOf(card) === state.year && !current.disabled && current.id === state.id && current.year === state.year) {
        current.onMove(state.id, target.dataset.artworkId);
        setNotice("Nuova posizione selezionata.");
      } else setNotice("Riordino annullato.");
    };
    document.addEventListener("pointermove", move, { passive: false });
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", cancel);
    document.addEventListener("keydown", escape, true);
    view.addEventListener("blur", blur);
    button.addEventListener("lostpointercapture", lost);
    try { button.setPointerCapture(state.pointerId); } catch { /* Document listeners still cover an unavailable capture API. */ }
  };

  const keyboard = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") { if (session.current) { event.preventDefault(); event.stopPropagation(); session.current.finish("escape"); } return; }
    if (disabled || !["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault(); event.stopPropagation();
    session.current?.finish("cancel");
    const root = event.currentTarget.closest<HTMLElement>(".artworks-scroll");
    if (!root) return;
    activeRoots.get(root)?.finish("cancel");
    const peers = cardsIn(root).filter((card) => yearOf(card) === year);
    const index = peers.findIndex((card) => card.dataset.artworkId === id);
    if (index < 0) return;
    const direction = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    const destination = event.key === "Home" ? 0 : event.key === "End" ? peers.length - 1 : index + direction;
    const target = peers[destination]?.dataset.artworkId;
    if (!target || target === id) { setNotice(`Nessun'altra opera del ${year} in questa direzione.`); return; }
    latest.current.onMove(id, target);
    setNotice("Nuova posizione selezionata.");
  };

  return <>
    <button type="button" className={`artwork-reorder-handle${dragging ? " is-dragging" : ""}${className ? ` ${className}` : ""}`} disabled={disabled} draggable={false}
      aria-label={`Riordina ${label} · ${year}`} aria-describedby={hintId} aria-pressed={dragging}
      onPointerDown={start} onKeyDown={keyboard} onClick={(event) => { event.preventDefault(); event.stopPropagation(); }}>
      <svg width="16" height="22" viewBox="0 0 16 22" fill="currentColor" aria-hidden="true"><circle cx="5" cy="5" r="1.2" /><circle cx="11" cy="5" r="1.2" /><circle cx="5" cy="11" r="1.2" /><circle cx="11" cy="11" r="1.2" /><circle cx="5" cy="17" r="1.2" /><circle cx="11" cy="17" r="1.2" /></svg>
    </button>
    <span id={hintId} className="artwork-reorder-help">Trascina la maniglia o usa le frecce per riordinare le opere dello stesso anno. Escape annulla.</span>
    <span className="artwork-reorder-feedback" role="status" aria-live="polite">{notice}</span>
  </>;
}
