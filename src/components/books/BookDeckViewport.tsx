import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import type { Book } from "@/types/books";
import { bookDeckHit, bookDeckReleaseVelocity, bookDeckResumeVelocity, clipBookPageRect, commitsBookDeckSwipe, consumeBookDeckBeckon, type BookDeckDirection, type BookDeckMomentum } from "./bookDeckState";
import "./BookDeckViewport.css";

export interface BookDeckChoice { book: Book; previewUrls: string[]; edgeUrl?: string }
export interface BookDeckHandle {
  commit: (direction: BookDeckDirection) => Promise<boolean>;
  reset: () => Promise<boolean>;
}
interface Props {
  active: BookDeckChoice;
  previous: BookDeckChoice | null;
  next: BookDeckChoice | null;
  incoming: { choice: BookDeckChoice; direction: BookDeckDirection; content: ReactNode } | null;
  children: ReactNode;
  disabled: boolean;
  locked: boolean;
  onSelect: (book: Book, direction: BookDeckDirection) => void;
}
const excluded = "button,a,input,textarea,select,[contenteditable=true],[data-book-comment-ui],[data-portfolio-navigation]";

const BookDeckViewport = forwardRef<BookDeckHandle, Props>(function BookDeckViewport({ active, previous, next, incoming, children, disabled, locked, onSelect }, ref) {
  const root = useRef<HTMLDivElement>(null);
  const previousActiveId = useRef(active.book.id);
  const progress = useMotionValue(0);
  const reduced = useReducedMotion();
  const [width, setWidth] = useState(() => window.innerWidth);
  const [direction, setDirection] = useState<BookDeckDirection>(1);
  const [dragging, setDragging] = useState(false);
  const [edgeReady, setEdgeReady] = useState(false);
  const [beckoning, setBeckoning] = useState(false);
  const [focusedEdge, setFocusedEdge] = useState<"previous" | "next" | null>(null);
  const [, repaintPromotion] = useState(0);
  const beckoned = useRef(false);
  const momentum = useRef<BookDeckMomentum | null>(null);
  const phase = useRef<"idle" | "dragging" | "pending" | "settling">("idle");
  const gesture = useRef<{ id: number; x: number; y: number; side: "previous" | "next" | "outside"; axis: "pending" | "horizontal"; lastX: number; lastTime: number; velocity: number } | null>(null);
  const animation = useRef<{ stop: () => void; finish: (completed: boolean) => void } | null>(null);
  const incomingDirection = incoming?.direction ?? direction;
  // Percentage transforms share the pane's current layout width. A resize
  // cannot invalidate an in-flight target or separate the two deck surfaces.
  const x = useTransform(progress, (value) => `${value * 100}%`);
  const neighborX = useTransform(progress, (value) => `${(value + incomingDirection) * 100}%`);
  const promoting = previousActiveId.current !== active.book.id;
  const move = useCallback((target: number, velocity = 0): Promise<boolean> => {
    animation.current?.stop(); animation.current?.finish(false); animation.current = null;
    if (reduced) { progress.set(target); return Promise.resolve(true); }
    return new Promise((resolve) => {
      let settled = false;
      const finish = (completed: boolean) => { if (!settled) { settled = true; resolve(completed); } };
      const controls = animate(progress, target, { type: "spring", stiffness: 160, damping: 22, mass: .95, velocity, restDelta: .0001, restSpeed: .005, onComplete: () => { animation.current = null; finish(true); } });
      animation.current = { stop: () => controls.stop(), finish };
    });
  }, [reduced, progress]);
  const reset = useCallback(async () => {
    phase.current = "settling"; gesture.current = null; setDragging(false);
    const complete = await move(0);
    if (complete) { phase.current = "idle"; momentum.current = null; }
    return complete;
  }, [move]);
  useImperativeHandle(ref, () => ({ reset, commit: async (nextDirection) => {
    phase.current = "settling"; setDirection(nextDirection); setDragging(false);
    return move(-nextDirection, bookDeckResumeVelocity(momentum.current, nextDirection, performance.now()));
  } }), [move, reset]);
  useLayoutEffect(() => {
    const promoted = previousActiveId.current !== active.book.id;
    if (!promoted) return;
    previousActiveId.current = active.book.id;
    progress.set(0); x.set("0%"); neighborX.set(`${incomingDirection * 100}%`);
    phase.current = "idle"; gesture.current = null; momentum.current = null; setDragging(false);
    repaintPromotion((value) => value + 1);
  }, [active.book.id, progress, x, neighborX, incomingDirection]);
  useLayoutEffect(() => {
    // Motion keeps its internal ref callback stable across promotion. An
    // incoming pane's inert state must therefore be updated from real DOM
    // ownership, not from a changed external callback-ref prop.
    root.current?.querySelectorAll<HTMLElement>("[data-book-deck-id]").forEach((pane) => {
      pane.inert = pane.dataset.bookDeckId !== active.book.id || locked;
    });
  }, [active.book.id, incoming?.choice.book.id, locked]);
  useLayoutEffect(() => {
    const element = root.current; if (!element) return;
    const measure = () => setWidth(element.clientWidth || window.innerWidth);
    measure(); const observer = new ResizeObserver(measure); observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => () => { animation.current?.stop(); animation.current?.finish(false); animation.current = null; }, []);
  useEffect(() => {
    if (reduced || document.hidden) setBeckoning(false);
    if (consumeBookDeckBeckon(beckoned, !disabled, edgeReady, Boolean(reduced), document.hidden)) setBeckoning(true);
  }, [disabled, edgeReady, reduced]);
  useEffect(() => {
    const hide = () => { if (document.hidden) setBeckoning(false); };
    document.addEventListener("visibilitychange", hide);
    return () => document.removeEventListener("visibilitychange", hide);
  }, []);
  // Magnifiers and comment readers/composers are portals outside this root.
  const blocked = () => Boolean(document.querySelector(".public-book-viewport.is-magnified, .public-book-viewport.is-zoom-closing, .book-comment-focus-overlay, .book-comment-draft-panel"));
  const hit = (clientX: number, clientY: number) => {
    const pane = root.current?.querySelector(`[data-book-deck-id="${CSS.escape(active.book.id)}"]`);
    const rects = [...(pane?.querySelectorAll<HTMLElement>("[data-book-page-id]") ?? [])].filter((page) => page.style.display !== "none").flatMap((page) => {
      const viewport = page.closest<HTMLElement>(".public-book-viewport");
      // Single view is a camera focus, not a mask: the adjacent leaf can
      // extend beyond both former one-page clip and centered book viewport.
      // Every piece of paper actually visible on screen remains native-page UI.
      const clips = [{ left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight }];
      if (viewport && viewport.dataset.bookViewMode !== "single") clips.push(viewport.getBoundingClientRect());
      const visible = clipBookPageRect(page.getBoundingClientRect(), clips);
      return visible ? [visible] : [];
    });
    return bookDeckHit({ x: clientX, y: clientY }, rects);
  };
  const choose = (book: Book | undefined, nextDirection: BookDeckDirection, release?: BookDeckMomentum) => {
    if (disabled || blocked()) return;
    momentum.current = release ?? null;
    if (!book) { void reset(); return; }
    phase.current = "pending"; setDirection(nextDirection); setDragging(false); onSelect(book, nextDirection);
  };
  const preview = incoming?.choice ?? (direction === 1 ? next : previous);
  return <div ref={root} className={`book-deck-viewport${dragging ? " is-dragging" : ""}`} role="group" aria-label="Libri: usa le frecce per cambiare libro" aria-busy={locked} tabIndex={0}
    onKeyDown={(event) => {
      if (disabled || blocked() || (event.target instanceof Element && event.target.closest("input,textarea,select,[contenteditable=true],[data-book-comment-ui]"))) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); event.stopPropagation(); const forward = event.key === "ArrowRight"; choose((forward ? next : previous)?.book, forward ? 1 : -1); }
    }}
    onPointerDownCapture={(event) => {
      if (disabled || blocked() || !event.isPrimary || event.button !== 0 || (event.target instanceof Element && event.target.closest(excluded))) return;
      const region = hit(event.clientX, event.clientY);
      // Ownership is chosen once at gesture start. A native page fold must
      // never become a book-deck gesture after crossing the paper's edge.
      if (region === "page") return;
      event.preventDefault(); event.stopPropagation();
      if (phase.current !== "idle" && phase.current !== "settling") return;
      animation.current?.stop(); animation.current?.finish(false); animation.current = null;
      setBeckoning(false); setFocusedEdge(null);
      gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, side: region, axis: "pending", lastX: event.clientX, lastTime: performance.now(), velocity: 0 };
      phase.current = "dragging";
      try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* Pointer can end before capture is committed. */ }
    }}
    onPointerMove={(event) => {
      const current = gesture.current; if (!current || current.id !== event.pointerId) return;
      const dx = event.clientX - current.x, dy = event.clientY - current.y;
      if (current.axis === "pending") {
        if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { void reset(); return; }
        if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy) * 1.1) return;
        const claim = new CustomEvent("book-deck-drag-claim", { bubbles: true, cancelable: true, detail: { bookId: active.book.id, pointerId: event.pointerId } });
        if (!root.current?.dispatchEvent(claim)) { gesture.current = null; phase.current = "idle"; return; }
        current.axis = "horizontal"; setDragging(true);
      }
      event.preventDefault(); event.stopPropagation();
      const nextDirection = dx < 0 ? 1 : -1; setDirection(nextDirection);
      const now = performance.now(); current.velocity = (event.clientX - current.lastX) / Math.max(1, now - current.lastTime); current.lastX = event.clientX; current.lastTime = now;
      progress.set(Math.max(-.55, Math.min(.55, dx / Math.max(1, width) * ((nextDirection === 1 ? next : previous) ? 1 : .18))));
    }}
    onPointerUp={(event) => {
      const current = gesture.current; if (!current || current.id !== event.pointerId) return;
      gesture.current = null;
      const dx = event.clientX - current.x, dy = event.clientY - current.y;
      if (current.axis === "horizontal") {
        event.preventDefault(); event.stopPropagation();
        const nextDirection = dx < 0 ? 1 : -1;
        const now = performance.now();
        const velocity = bookDeckReleaseVelocity(current.velocity, width, now - current.lastTime);
        if (commitsBookDeckSwipe(dx, width, velocity * width / 1000)) choose((nextDirection === 1 ? next : previous)?.book, nextDirection, { direction: nextDirection, velocity, releasedAt: now }); else void reset();
      } else if (current.side === "outside") { phase.current = "idle"; return; }
      else if (Math.hypot(dx, dy) < 8) { event.preventDefault(); event.stopPropagation(); choose((current.side === "next" ? next : previous)?.book, current.side === "next" ? 1 : -1); }
      else void reset();
    }}
    onPointerCancel={() => { if (gesture.current) void reset(); }}
    onLostPointerCapture={() => { if (gesture.current) void reset(); }}
    onMouseDownCapture={(event) => { if (!disabled && !blocked() && !(event.target instanceof Element && event.target.closest(excluded)) && hit(event.clientX, event.clientY) !== "page") { event.preventDefault(); event.stopPropagation(); } }}
    onTouchStartCapture={(event) => { const touch = event.touches[0]; if (touch && !disabled && !blocked() && !(event.target instanceof Element && event.target.closest(excluded)) && hit(touch.clientX, touch.clientY) !== "page") { event.preventDefault(); event.stopPropagation(); } }}
    onClickCapture={(event) => { if (!disabled && !blocked() && !(event.target instanceof Element && event.target.closest(excluded)) && hit(event.clientX, event.clientY) !== "page") { event.preventDefault(); event.stopPropagation(); } }}>
    {[{ id: active.book.id, content: children, active: true }, ...(incoming ? [{ id: incoming.choice.book.id, content: incoming.content, active: false }] : [])].map((pane) => <motion.div key={pane.id} data-book-deck-id={pane.id} className="book-deck-pane" style={{ x: pane.active ? promoting ? "0%" : x : neighborX, pointerEvents: !pane.active || locked ? "none" : "auto" }} aria-hidden={!pane.active}>{pane.content}</motion.div>)}
    {!incoming && preview && (dragging || locked) && <motion.div className="book-deck-pane book-deck-preview" style={{ x: neighborX }} aria-hidden="true"><div className={`book-deck-preview-pages${preview.previewUrls.length === 1 ? " is-closed" : ""}`}>{preview.previewUrls.map((url, index) => <img key={`${index}:${url}`} src={url} alt="" draggable={false} decoding="async" />)}</div><p>{preview.book.title}</p></motion.div>}
    {([{ choice: previous, direction: -1, side: "previous" }, { choice: next, direction: 1, side: "next" }] as const).map((edge) => {
      const hiddenX = edge.direction * 72;
      const cornerRotation = edge.direction * 24;
      const keyboardFocused = focusedEdge === edge.side;
      return <button key={edge.side} type="button" className={`book-deck-edge is-${edge.side}`} aria-label={edge.choice ? `Libro ${edge.direction === -1 ? "precedente" : "successivo"}: ${edge.choice.book.title}` : `Nessun libro ${edge.direction === -1 ? "precedente" : "successivo"}`} disabled={disabled || !edge.choice} onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) setFocusedEdge(edge.side); }} onBlur={() => setFocusedEdge(null)} onPointerDown={() => setFocusedEdge(null)} onClick={() => choose(edge.choice?.book, edge.direction)}>
        <motion.span className="book-deck-edge-paper" initial={{ x: hiddenX, y: 18, rotate: cornerRotation }} animate={{ x: beckoning ? [hiddenX, 0, -edge.direction * 5, edge.direction * 2, hiddenX] : keyboardFocused ? 0 : hiddenX, y: beckoning ? [18, 0, -4, 1, 18] : keyboardFocused ? 0 : 18, rotate: cornerRotation }} transition={beckoning ? { duration: reduced || document.hidden ? 0 : 1.05, times: [0, .34, .55, .73, 1] } : { duration: reduced || document.hidden ? 0 : .25 }} onAnimationComplete={() => { if (beckoning) setBeckoning(false); }}>{(edge.choice?.edgeUrl || edge.choice?.previewUrls[0]) && <img src={edge.choice?.edgeUrl || edge.choice?.previewUrls[0]} alt="" draggable={false} decoding="async" onLoad={() => setEdgeReady(true)} />}</motion.span>
      </button>;
    })}
  </div>;
});
export default BookDeckViewport;
