import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { animate, motion, useAnimationControls, useDragControls, useMotionValue, useMotionValueEvent, type PanInfo } from "framer-motion";
import "./artwork-image-carousel.css";

const spring = { type: "spring" as const, stiffness: 190, damping: 25, mass: .85 };
const FOLD_DURATION_LIMIT = 660;
interface Props {
  images: string[];
  children: ReactNode;
  title: string;
  open: boolean;
  active: boolean;
  reducedMotion: boolean;
  width: number;
  height: number;
  viewportWidth: number;
}

function imageFrame(ratio: number, maxWidth: number, maxHeight: number) {
  const width = Math.min(maxWidth, maxHeight * ratio);
  return { width, height: width / ratio };
}

/** Every sheet fits the bitmap's own aspect ratio, including width-limited panoramas. */
function stackGeometry(images: string[], ratios: Record<string, number>, width: number, height: number, viewportWidth: number) {
  const coverWidth = Number.isFinite(width) && width > 0 ? width : 1;
  const coverHeight = Number.isFinite(height) && height > 0 ? height : 1;
  const viewport = Number.isFinite(viewportWidth) && viewportWidth > 0 ? viewportWidth : coverWidth;
  const gap = Math.max(16, Math.min(36, viewport * .025));
  const sizes = images.map((url, index) => {
    const naturalRatio = ratios[url];
    const ratio = Number.isFinite(naturalRatio) && naturalRatio > 0 ? naturalRatio : coverWidth / coverHeight;
    return index === 0
      ? { open: { width: coverWidth, height: coverHeight }, closed: { width: coverWidth, height: coverHeight } }
      : { open: imageFrame(ratio, Math.max(1, viewport - 36), coverHeight), closed: imageFrame(ratio, coverWidth, coverHeight) };
  });
  let left = 0;
  const positions = sizes.map(({ open }) => { const position = left; left += open.width + gap; return position; });
  return {
    widths: sizes.map(({ open }) => open.width), positions,
    targets: sizes.map(({ open }, index) => coverWidth / 2 - (positions[index] + open.width / 2)),
    poses: sizes.map((size, index) => {
      const depth = Math.min(index, 3);
      // Keep the deepest peek, including rotation, inside the 20px caption gap.
      const tilt = Math.min(1.2, Math.asin(Math.min(1, 6 / size.closed.width)) * 180 / Math.PI);
      return {
        open: { ...size.open, x: positions[index], y: (coverHeight - size.open.height) / 2, rotate: 0, scale: 1 },
        closed: { ...size.closed, x: (coverWidth - size.closed.width) / 2 - depth * 5, y: coverHeight - size.closed.height + depth * 4, rotate: index === 0 ? 0 : index % 2 ? -tilt : tilt, scale: index === 0 ? 1 : 1 - depth * .012 },
      };
    }),
  };
}

/** The cover stays mounted. Extra sheets unfold from behind it, never fade. */
export default function ArtworkImageCarousel({ images, children, title, open, active, reducedMotion, width, height, viewportWidth }: Props) {
  const x = useMotionValue(0);
  const dragControls = useDragControls();
  const sheetControls = useAnimationControls();
  const [current, setCurrent] = useState(0);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState<Set<string>>(() => new Set());
  const animation = useRef<{ stop: () => void } | null>(null);
  const suppressClickUntil = useRef(0);
  const dragging = useRef(false);
  const currentRef = useRef(0);
  const generation = useRef(0);
  const foldDeadline = useRef(0);
  const folded = useRef(!open);
  const foldTimer = useRef<number | null>(null);
  const transition = useMemo(() => reducedMotion ? { duration: 0 } : spring, [reducedMotion]);
  const imageKey = images.join("\u0000");
  const geometry = useMemo(() => stackGeometry(images, ratios, width, height, viewportWidth), [images, width, height, viewportWidth, ratios]);
  const latest = useRef({ open, geometry, imageCount: images.length });
  latest.current = { open, geometry, imageCount: images.length };
  const previous = useRef({ open, imageKey });
  const nearest = useCallback((position: number) => {
    const targets = latest.current.geometry.targets;
    return targets.reduce((best, target, index) => Math.abs(target - position) < Math.abs(targets[best] - position) ? index : best, 0);
  }, []);
  const settle = useCallback((index: number) => {
    const state = latest.current;
    const bounded = Math.max(0, Math.min(state.imageCount - 1, index));
    currentRef.current = bounded; setCurrent(bounded);
    animation.current?.stop();
    animation.current = animate(x, state.open ? state.geometry.targets[bounded] || 0 : 0, reducedMotion ? { duration: 0 } : spring);
  }, [reducedMotion, x]);
  useMotionValueEvent(x, "change", (position) => {
    if (!latest.current.open) return;
    const index = nearest(position);
    if (dragging.current) currentRef.current = index;
    setCurrent((previous) => previous === index ? previous : index);
  });
  useLayoutEffect(() => {
    const version = ++generation.current;
    const changedImages = previous.current.imageKey !== imageKey;
    const beganClosing = previous.current.open && !open;
    previous.current = { open, imageKey };
    if (foldTimer.current !== null) window.clearTimeout(foldTimer.current);
    if (changedImages || !open) {
      // Cancel the gesture itself, not only our spring: a late pointer update
      // must never retain ownership of x while the sheets fold closed.
      dragControls.cancel(); dragging.current = false; suppressClickUntil.current = 0;
      currentRef.current = 0; setCurrent(0);
    }
    if (changedImages) { animation.current?.stop(); x.set(0); }
    if (open) folded.current = false;
    else if (beganClosing || changedImages) { folded.current = false; foldDeadline.current = Date.now() + FOLD_DURATION_LIMIT; }
    const mode = open ? "open" : "closed";
    const finishClosed = () => {
      if (version !== generation.current || latest.current.open) return;
      sheetControls.set("closed");
      animation.current?.stop(); animation.current = null; x.set(0);
      folded.current = true;
    };
    sheetControls.stop();
    if (reducedMotion || (!open && folded.current)) sheetControls.set(mode);
    else void sheetControls.start(mode, transition).then(() => {
      if (version !== generation.current || latest.current.open !== open) return;
      if (open) sheetControls.set("open"); else finishClosed();
    });
    if (!dragging.current) settle(open ? currentRef.current : 0);
    if (!open && !folded.current) {
      const remaining = reducedMotion ? 0 : Math.max(0, foldDeadline.current - Date.now());
      // The deadline belongs to this close, not to each resize/image load.
      // A stopped/interrupted spring still reaches the exact folded endpoint.
      if (remaining === 0) finishClosed();
      else foldTimer.current = window.setTimeout(finishClosed, remaining);
    }
    return () => { if (foldTimer.current !== null) window.clearTimeout(foldTimer.current); };
  }, [open, imageKey, reducedMotion, geometry, dragControls, sheetControls, settle, transition, x]);
  useEffect(() => () => {
    generation.current += 1;
    if (foldTimer.current !== null) window.clearTimeout(foldTimer.current);
    dragControls.cancel(); sheetControls.stop(); animation.current?.stop();
  }, [dragControls, sheetControls]);
  useEffect(() => {
    // Retain warmed original images through closing. Don't fetch an entire
    // large set just because its thumbnail is near the viewport.
    const viewStart = -(viewportWidth - width) / 2 - (geometry.targets[current] || 0);
    const wanted = images.filter((_, index) => index > 0 && ((active && index <= 2) || (open && (
      Math.abs(index - current) <= 1 || (geometry.positions[index] + geometry.widths[index] >= viewStart - viewportWidth * .5 && geometry.positions[index] <= viewStart + viewportWidth * 1.5)
    ))));
    setLoaded((previous) => wanted.every((url) => previous.has(url)) ? previous : new Set([...previous, ...wanted]));
  }, [active, open, current, imageKey, images, geometry, viewportWidth, width]);
  const finishDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!latest.current.open || !dragging.current) { dragging.current = false; return; }
    dragging.current = false; suppressClickUntil.current = Date.now() + 250;
    const projected = x.get() + info.velocity.x * .14;
    settle(nearest(projected));
  };

  return <div className={`artwork-image-carousel${open ? " is-open" : ""}`} role="group" aria-roledescription={open ? "carosello" : undefined} aria-label={`${title} · ${images.length} immagini`} tabIndex={open ? 0 : -1}
    onClickCapture={(event) => { if (Date.now() < suppressClickUntil.current) { event.stopPropagation(); event.preventDefault(); } }}
    onKeyDown={(event) => {
      if (!open || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault(); event.stopPropagation();
      settle(event.key === "Home" ? 0 : event.key === "End" ? images.length - 1 : current + (event.key === "ArrowRight" ? 1 : -1));
    }}>
    <motion.div className="artwork-image-ribbon" style={{ x }} drag={open ? "x" : false} dragControls={dragControls} dragConstraints={{ left: geometry.targets[geometry.targets.length - 1] || 0, right: 0 }} dragElastic={.14} dragMomentum={false}
      onDragStart={() => { if (!latest.current.open) return; dragging.current = true; animation.current?.stop(); suppressClickUntil.current = Number.POSITIVE_INFINITY; }} onDragEnd={finishDrag}
      onPointerCancel={() => { if (!dragging.current) return; dragControls.cancel(); dragging.current = false; suppressClickUntil.current = Date.now() + 250; settle(nearest(x.get())); }}>
      {images.map((url, index) => <motion.div key={url} className={`artwork-image-sheet${index === 0 ? " is-cover" : ""}`} data-image-index={index}
        style={{ ...(index === 0 ? { width: "100%", height: "100%" } : {}), zIndex: images.length - index }}
        variants={index === 0 ? { open: { x: 0, y: 0, rotate: 0, scale: 1 }, closed: { x: 0, y: 0, rotate: 0, scale: 1 } } : geometry.poses[index]}
        animate={sheetControls} transition={transition} initial={open ? "open" : "closed"}>
        {index === 0 ? children : loaded.has(url) ? <img src={url} alt={open ? `${title} — immagine ${index + 1}` : ""} draggable={false} decoding="async" loading="lazy" onLoad={(event) => {
          const image = event.currentTarget;
          if (image.naturalWidth && image.naturalHeight) {
            const ratio = image.naturalWidth / image.naturalHeight;
            setRatios((previous) => previous[url] === ratio ? previous : { ...previous, [url]: ratio });
          }
        }} /> : <span className="artwork-image-sheet-placeholder" aria-hidden="true" />}
      </motion.div>)}
    </motion.div>
    {open && <div className="artwork-image-controls" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()}>
      <button type="button" aria-label="Immagine precedente" disabled={current === 0} onClick={() => settle(current - 1)}>←</button>
      <span aria-live="polite">{current + 1} / {images.length}</span>
      <button type="button" aria-label="Immagine successiva" disabled={current === images.length - 1} onClick={() => settle(current + 1)}>→</button>
    </div>}
  </div>;
}
