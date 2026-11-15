import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionStyle } from "framer-motion";
import type { BookComment } from "@/types/bookComments";
import BookRichText from "./BookRichText";
import { measureCommentWords, type CommentMorphWord } from "./commentTextMorph";
import "./BookCommentFocusView.css";

export interface BookCommentFocusOrigin {
  left: number;
  top: number;
  width: number;
  height: number;
  /** Frozen original text, including its current internal scroll position. */
  content?: HTMLElement;
}

interface BookCommentFocusViewProps {
  comment: BookComment;
  origin: BookCommentFocusOrigin;
  /** Called after the panel has returned to its original balloon bounds. */
  onClose: () => void;
}

const panelSpring = { type: "spring" as const, stiffness: 190, damping: 26, mass: .95, restDelta: .00001, restSpeed: .0001 };
const viewportSize = () => ({ width: window.innerWidth, height: window.innerHeight });
const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));

function balloonColors(comment: BookComment) {
  const background = /^#[0-9a-f]{6}$/i.test(comment.background_color ?? "") ? comment.background_color! : "#DDE2E5";
  const alpha = clamp(comment.background_opacity ?? .75, .15, 1);
  const red = parseInt(background.slice(1, 3), 16);
  const green = parseInt(background.slice(3, 5), 16);
  const blue = parseInt(background.slice(5, 7), 16);
  return { balloon: `rgba(${red}, ${green}, ${blue}, ${alpha})`, reader: `rgb(${red}, ${green}, ${blue})` };
}

/** A separate reader surface; the caller keeps the source balloon hidden and
 * its book frozen until onClose, without cloning or reparenting any page DOM. */
export default function BookCommentFocusView({ comment, origin, onClose }: BookCommentFocusViewProps) {
  const reducedMotion = useReducedMotion();
  const [viewport, setViewport] = useState(viewportSize);
  const [closing, setClosing] = useState(false);
  const [reading, setReading] = useState(false);
  const [words, setWords] = useState<CommentMorphWord[]>([]);
  const panel = useRef<HTMLElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const fallbackSource = useRef<HTMLDivElement>(null);
  const ready = useRef(false);
  const progress = useMotionValue(0);
  const animation = useRef<ReturnType<typeof animate> | null>(null);
  const clip = useRef({ top: 0, right: 0, bottom: 0, left: 0 });
  const closingRef = useRef(false);
  const closedRef = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const pointer = useRef<{ id: number; x: number; y: number; scrollTop: number; moved: boolean } | null>(null);
  const colors = balloonColors(comment);
  const title = (comment as BookComment & { title?: string | null }).title?.trim();
  const requestedFontSize = (comment as BookComment & { font_size?: number }).font_size;
  const fontSize = typeof requestedFontSize === "number" && Number.isFinite(requestedFontSize) && requestedFontSize > 0 ? requestedFontSize : 14;
  const source = useMemo(() => ({ left: origin.left, top: origin.top, width: Math.max(1, origin.width), height: Math.max(1, origin.height) }), [origin.left, origin.top, origin.width, origin.height]);
  const left = useTransform(progress, [0, 1], [source.left, 0], { clamp: false });
  const top = useTransform(progress, [0, 1], [source.top, 0], { clamp: false });
  const width = useTransform(progress, [0, 1], [source.width, viewport.width], { clamp: false });
  const height = useTransform(progress, [0, 1], [source.height, viewport.height], { clamp: false });
  const backgroundColor = useTransform(progress, [0, 1], [colors.balloon, colors.reader]);
  const measure = useCallback(() => {
    const original = origin.content?.isConnected ? origin.content : fallbackSource.current;
    if (!original || !body.current || !panel.current) return;
    const panelRect = panel.current.getBoundingClientRect();
    setWords(measureCommentWords(original, body.current, source, panelRect));
    const rect = original.getBoundingClientRect();
    clip.current = { top: Math.max(0, rect.top - source.top), left: Math.max(0, rect.left - source.left), right: Math.max(0, source.left + source.width - rect.right), bottom: Math.max(0, source.top + source.height - rect.bottom) };
  }, [origin.content, source]);

  const close = useCallback(() => {
    if (closingRef.current) return;
    // When closing a scrolled reader, measure that exact visible layout, not
    // its original scrollTop=0. Closing mid-entry simply reverses the same path.
    if (progress.get() >= .999) measure();
    closingRef.current = true;
    setReading(false);
    setClosing(true);
  }, [measure, progress]);

  useLayoutEffect(() => {
    measure();
    ready.current = true;
  }, [measure, viewport.width, viewport.height]);

  useEffect(() => {
    if (!ready.current) return;
    animation.current?.stop();
    animation.current = animate(progress, closing ? 0 : 1, reducedMotion ? { duration: 0 } : panelSpring);
    const currentAnimation = animation.current;
    currentAnimation.then(() => {
      if (animation.current !== currentAnimation) return;
      if (closingRef.current) {
        if (!closedRef.current) { closedRef.current = true; onCloseRef.current(); }
      } else setReading(true);
    });
    return () => { currentAnimation.stop(); if (animation.current === currentAnimation) animation.current = null; };
  }, [closing, progress, reducedMotion]);

  useEffect(() => { if (reading) scroll.current?.focus({ preventScroll: true }); }, [reading]);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    panel.current?.focus({ preventScroll: true });
    const resize = () => setViewport(viewportSize());
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault(); event.stopPropagation(); close();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;
      const focusable = [...panel.current.querySelectorAll<HTMLElement>('button:not([disabled]), [tabindex="0"]')].filter((node) => getComputedStyle(node).visibility !== "hidden" && node.getBoundingClientRect().width > 0 && node.getBoundingClientRect().height > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) { event.preventDefault(); panel.current.focus({ preventScroll: true }); return; }
      if (event.shiftKey && (document.activeElement === first || !panel.current.contains(document.activeElement))) {
        event.preventDefault(); last.focus({ preventScroll: true });
      } else if (!event.shiftKey && (document.activeElement === last || !panel.current.contains(document.activeElement))) {
        event.preventDefault(); first.focus({ preventScroll: true });
      }
    };
    window.addEventListener("resize", resize);
    window.visualViewport?.addEventListener("resize", resize);
    document.addEventListener("keydown", keydown, true);
    return () => {
      window.removeEventListener("resize", resize);
      window.visualViewport?.removeEventListener("resize", resize);
      document.removeEventListener("keydown", keydown, true);
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [close]);

  const trackPointer = (event: PointerEvent) => {
    const gesture = pointer.current;
    if (gesture && gesture.id === event.pointerId && Math.hypot(event.clientX - gesture.x, event.clientY - gesture.y) > 7) gesture.moved = true;
  };
  return createPortal(
    <div className="book-comment-focus-overlay" data-book-comment-ui="true"
      onPointerDown={(event) => event.stopPropagation()}
      onPointerMove={(event) => { trackPointer(event); event.stopPropagation(); }}
      onPointerUp={(event) => event.stopPropagation()}
      onPointerCancel={(event) => { if (pointer.current) pointer.current.moved = true; event.stopPropagation(); }}
      onClick={(event) => event.stopPropagation()} onDoubleClick={(event) => event.stopPropagation()}
      onWheel={(event) => event.stopPropagation()} onTouchMove={(event) => event.stopPropagation()}>
      <motion.section ref={panel} className="book-comment-focus-panel" role="dialog" tabIndex={-1} aria-modal="true" aria-label="Lettura commento" aria-busy={!reading}
        data-text-morph={reading ? "reading" : closing ? "closing" : "opening"}
        style={{ left, top, width, height, backgroundColor, color: comment.text_color || "#414A51", fontSize, "--comment-morph-progress": progress } as MotionStyle}>
        <div ref={scroll} className="book-comment-focus-scroll" role="document" tabIndex={0} aria-label="Testo completo del commento"
          style={{ width: viewport.width, height: viewport.height, visibility: reading ? "visible" : "hidden" }}
          onScroll={() => { if (pointer.current) pointer.current.moved = true; }}>
          <div ref={body} className="book-comment-focus-body"
            onPointerDown={(event) => { pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY, scrollTop: scroll.current?.scrollTop ?? 0, moved: false }; }}
            onClick={(event) => {
              event.stopPropagation();
              const gesture = pointer.current;
              pointer.current = null;
              if (!gesture || (!gesture.moved && Math.abs((scroll.current?.scrollTop ?? 0) - gesture.scrollTop) < 1)) close();
            }}>{title && <h2 className="book-comment-focus-title">{title}</h2>}<BookRichText className="book-comment-focus-text" body={comment.body} value={comment.rich_content} /></div>
        </div>
        <div className="book-comment-text-morph" aria-hidden="true" style={{ visibility: reading ? "hidden" : "visible", clipPath: `inset(calc(${clip.current.top}px * (1 - var(--comment-morph-progress))) calc(${clip.current.right}px * (1 - var(--comment-morph-progress))) calc(${clip.current.bottom}px * (1 - var(--comment-morph-progress))) calc(${clip.current.left}px * (1 - var(--comment-morph-progress))))` }}>
          {words.map((word) => <span key={word.key} data-morph-key={word.key} className="book-comment-morph-word" style={{ fontFamily: word.fontFamily, fontSize: word.fontSize, fontWeight: word.fontWeight, fontStyle: word.fontStyle, letterSpacing: word.letterSpacing, transform: `translate3d(calc(${word.fromX}px + ${word.toX - word.fromX}px * var(--comment-morph-progress)), calc(${word.fromY}px + ${word.toY - word.fromY}px * var(--comment-morph-progress)), 0)` }}>{word.text}</span>)}
        </div>
        <motion.button initial={{ scale: 0 }} animate={{ scale: closing ? 0 : 1 }} transition={reducedMotion ? { duration: 0 } : { ...panelSpring, delay: closing ? 0 : .3 }} type="button" className="book-comment-focus-return" onClick={close}>torna al foglio</motion.button>
      </motion.section>
      <div ref={fallbackSource} className="book-comment-morph-source" aria-hidden="true" style={{ left: source.left, top: source.top, width: source.width, fontSize, color: comment.text_color || "#414A51" } as CSSProperties}>{title && <h3>{title}</h3>}<BookRichText body={comment.body} value={comment.rich_content} /></div>
    </div>, document.body,
  );
}
