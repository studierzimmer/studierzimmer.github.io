import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, type PanInfo } from "framer-motion";
import "./artwork-image-carousel.css";

const spring = { type: "spring" as const, stiffness: 190, damping: 25, mass: .85 };
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

/** The cover stays mounted. Extra sheets unfold from behind it, never fade. */
export default function ArtworkImageCarousel({ images, children, title, open, active, reducedMotion, width, height, viewportWidth }: Props) {
  const x = useMotionValue(0);
  const [current, setCurrent] = useState(0);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState<Set<string>>(() => new Set());
  const animation = useRef<{ stop: () => void } | null>(null);
  const suppressClickUntil = useRef(0);
  const dragging = useRef(false);
  const currentRef = useRef(0);
  const openRef = useRef(open); openRef.current = open;
  const transition = reducedMotion ? { duration: 0 } : spring;
  const imageKey = images.join("\u0000");
  const geometry = useMemo(() => {
    const gap = Math.max(16, Math.min(36, viewportWidth * .025));
    const widths = images.map((url, index) => index === 0 ? width : Math.min(viewportWidth - 36, height * (ratios[url] || width / Math.max(1, height))));
    let left = 0;
    const positions = widths.map((value) => { const position = left; left += value + gap; return position; });
    return { widths, positions, targets: widths.map((value, index) => width / 2 - (positions[index] + value / 2)) };
  }, [images, width, height, viewportWidth, ratios]);
  const nearest = useCallback((position: number) => geometry.targets.reduce((best, target, index) => Math.abs(target - position) < Math.abs(geometry.targets[best] - position) ? index : best, 0), [geometry.targets]);
  const settle = useCallback((index: number) => {
    const bounded = Math.max(0, Math.min(images.length - 1, index));
    currentRef.current = bounded; setCurrent(bounded);
    animation.current?.stop();
    animation.current = animate(x, openRef.current ? geometry.targets[bounded] || 0 : 0, reducedMotion ? { duration: 0 } : spring);
  }, [images.length, geometry.targets, reducedMotion, x]);
  useMotionValueEvent(x, "change", (position) => {
    if (!openRef.current) return;
    const index = nearest(position);
    setCurrent((previous) => previous === index ? previous : index);
  });
  useEffect(() => {
    currentRef.current = 0; setCurrent(0); dragging.current = false;
    animation.current?.stop(); x.set(0);
  }, [imageKey, x]);
  useEffect(() => {
    if (!open) {
      dragging.current = false; suppressClickUntil.current = 0; settle(0);
    } else if (!dragging.current) settle(currentRef.current);
    return () => animation.current?.stop();
  }, [open, settle]);
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
    if (!openRef.current) { dragging.current = false; return; }
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
    <motion.div className="artwork-image-ribbon" style={{ x }} drag={open ? "x" : false} dragConstraints={{ left: geometry.targets[geometry.targets.length - 1] || 0, right: 0 }} dragElastic={.14} dragMomentum={false}
      onDragStart={() => { if (!openRef.current) return; dragging.current = true; animation.current?.stop(); suppressClickUntil.current = Number.POSITIVE_INFINITY; }} onDragEnd={finishDrag}>
      {images.map((url, index) => <motion.div key={url} className={`artwork-image-sheet${index === 0 ? " is-cover" : ""}`} data-image-index={index}
        style={{ width: index === 0 ? "100%" : undefined, height, zIndex: images.length - index }}
        animate={{ ...(index > 0 ? { width: open ? geometry.widths[index] : width } : {}), x: open ? geometry.positions[index] : Math.min(index, 3) * -5, y: open ? 0 : Math.min(index, 3) * 8, rotate: open || index === 0 ? 0 : index % 2 ? -1.2 : 1.2, scale: open || index === 0 ? 1 : 1 - Math.min(index, 3) * .012 }} transition={transition} initial={false}>
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
