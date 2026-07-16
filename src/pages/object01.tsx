// src/pages/Object01.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageFlip } from "page-flip";

const importImages = () => {
  const modules = import.meta.glob<string>("/src/img/*.jpg", {
    eager: true,
    query: "?url",
    import: "default",
  });
  const entries = Object.entries(modules);
  entries.sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true, sensitivity: "base" }));
  return entries.map(([, source]) => source);
};

const objectImages = importImages();

interface PageItem {
  src: string;
  description?: string;
}

const EXIT_DURATION = 520;
const ENTRY_DURATION = 380;
const STAGGER_MS = 18;
const BG_FADE_DURATION = 600;
const A4_RATIO = 210 / 297;

const FIRST_STRICT = 6;
const BG_CONCURRENCY = 3;

const Object01: React.FC = () => {
  const navigate = useNavigate();
  const pages = useMemo<PageItem[]>(
    () =>
      objectImages.map((source, index) => ({
        src: source,
        description: index === 0 ? "Cover" : `Page ${index + 1}`,
      })),
    []
  );

  const hostRef = useRef<HTMLDivElement | null>(null);
  const pageElsRef = useRef<HTMLElement[]>([]);
  const pageFlipRef = useRef<PageFlip | null>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [pageflipReady, setPageflipReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [entrancePlayed, setEntrancePlayed] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [bgWhite, setBgWhite] = useState(false);

  const [pageSize, setPageSize] = useState<{ w: number; h: number; hostWidth: number; single: boolean }>({
    w: 0,
    h: 0,
    hostWidth: 0,
    single: true,
  });
  const [hostDims, setHostDims] = useState<{ hostW: number; hostH: number; pageW: number; single: boolean }>({
    hostW: 0,
    hostH: 0,
    pageW: 0,
    single: true,
  });
  const [currentPageIndex, setCurrentPageIndex] = useState<number | null>(null);
  const timers = useRef<{ mounted?: number; bg?: number; entranceEnd?: number; exit?: number; shift?: number } | null>(null);
// --- Image Preloading (first few pages only) ---
useEffect(() => {
  let cancelled = false;
  const preloadRefs: Record<string, HTMLImageElement> = {};

  const loadImage = (src: string) =>
    new Promise<void>((resolve) => {
      const img = new Image();
      preloadRefs[src] = img;
      let done = false;
      const settle = () => {
        if (!done) {
          done = true;
          delete preloadRefs[src];
          resolve();
        }
      };
      img.onload = settle;
      img.onerror = settle;
      img.decoding = "async";
      img.src = src;
      if (typeof img.decode === "function") {
        img.decode().then(settle).catch(settle);
      }
    });

  const run = async () => {
    try {
      const first = pages.slice(0, FIRST_STRICT).map((p) => p.src);
      await Promise.all(first.map(loadImage));
      if (!cancelled) setImagesLoaded(true);
    } catch {
      if (!cancelled) setImagesLoaded(true);
    }
  };

  run();

  return () => {
    cancelled = true;
    Object.values(preloadRefs).forEach((img) => { img.onload = null; img.onerror = null; });
  };
}, [pages]);


  // --- Compute logical page size with side padding ---
  const computeLogicalPageSize = () => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const sidePadding = 24;

    const maxAvailableW = vw - sidePadding * 2;
    const maxAvailableH = vh * 0.8;

    let pageW = maxAvailableW;
    let pageH = pageW / A4_RATIO;

    if (pageH > maxAvailableH) {
      pageH = maxAvailableH;
      pageW = pageH * A4_RATIO;
    }

    const single = pageW * 2 > vw;
    const hostWidth = single ? pageW : pageW * 2;

    return { w: pageW, h: pageH, hostWidth, single };
  };

  useEffect(() => {
    const apply = () => setPageSize(computeLogicalPageSize());
    apply();
    window.addEventListener("resize", apply, { passive: true });
    return () => window.removeEventListener("resize", apply);
  }, []);

  // --- Host dimensions ---
  useEffect(() => {
    const recomputeHostDims = () => {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const sidePadding = 24; // keep padding on sides
      const availableWidth = vw - sidePadding * 2;

      const targetHostW = Math.min(pageSize.hostWidth, availableWidth);
      const hostW = targetHostW > 0 ? targetHostW : Math.min(availableWidth, 900);

      const pageWActual = pageSize.single ? hostW : Math.round(hostW / 2);
      const pageHActual = Math.max(140, Math.round(pageWActual / A4_RATIO));

      setHostDims({ hostW, hostH: pageHActual, pageW: pageWActual, single: pageSize.single });
    };

    recomputeHostDims();
    window.addEventListener("resize", recomputeHostDims, { passive: true });
    return () => window.removeEventListener("resize", recomputeHostDims);
  }, [pageSize]);

  // --- PageFlip init (unchanged) ---
  useEffect(() => {
    if (!imagesLoaded) return;
    if (!hostRef.current) return;
    if (!hostDims.hostW || !hostDims.hostH) return;

    if (pageFlipRef.current) {
      try {
        pageFlipRef.current.clear();
        pageFlipRef.current.destroy();
      } catch {
        // The previous instance may already be detached.
      }
      pageFlipRef.current = null;
    }

    const intrinsicW = Math.max(200, Math.round(hostDims.pageW));
    const intrinsicH = Math.max(280, Math.round(hostDims.hostH));

    pageFlipRef.current = new PageFlip(hostRef.current, {
      width: intrinsicW,
      height: intrinsicH,
      size: "fixed",
      showCover: true,
      mobileScrollSupport: false,
      maxShadowOpacity: 0.3,
      flippingTime: 520,
      usePortrait: true,
      drawShadow: true,
      startPage: 0,
      singlePageMode: hostDims.single,
    });

    requestAnimationFrame(() => {
      window.setTimeout(() => {
        const toLoad = pageElsRef.current.filter(Boolean) as HTMLElement[];
        if (toLoad.length) pageFlipRef.current!.loadFromHTML(toLoad);
        setPageflipReady(true);
      }, 28);
    });

    const flip = pageFlipRef.current;
    const readIndex = () => {
      try {
        return flip.getCurrentPageIndex();
      } catch {
        // The page collection is not ready yet.
      }
      return null;
    };

    const initIdx = readIndex();
    setCurrentPageIndex(initIdx === null ? 0 : initIdx);

    const onFlip: Parameters<PageFlip["on"]>[1] = (event) => {
      let idx: number | null = null;
      if (typeof event.data === "number") idx = event.data;
      if (idx === null) idx = readIndex();
      if (typeof idx === "number") {
        setCurrentPageIndex(idx);
        const flipTime = flip.getSettings().flippingTime || 520;
        if (timers.current?.shift) clearTimeout(timers.current.shift);
        timers.current = timers.current || {};
        timers.current.shift = window.setTimeout(() => {
          timers.current!.shift = undefined;
          if (!hostDims.single && idx === 0) {
            const shift = -Math.round(hostDims.pageW / 2);
            if (hostRef.current) hostRef.current.style.transform = `translateX(${shift}px)`;
          } else {
            if (hostRef.current) hostRef.current.style.transform = "";
          }
        }, flipTime + 22);
      }
    };

    flip.on?.("flip", onFlip);
    flip.on?.("changeState", onFlip);

    return () => {
      try {
        flip.off("flip");
        flip.off("changeState");
      } catch {
        // The page-flip instance may already be destroyed.
      }
    };
  }, [imagesLoaded, hostDims.hostW, hostDims.hostH, hostDims.pageW, hostDims.single]);

  // --- Entrance + background fade ---
  useEffect(() => {
    timers.current = {};
    timers.current.mounted = window.setTimeout(() => setMounted(true), 12);
    timers.current.entranceEnd = window.setTimeout(
      () => setEntrancePlayed(true),
      ENTRY_DURATION + pages.length * STAGGER_MS + 80
    );
    timers.current.bg = window.setTimeout(() => setBgWhite(true), 380);

    return () => {
      if (!timers.current) return;
      if (timers.current.mounted) clearTimeout(timers.current.mounted);
      if (timers.current.entranceEnd) clearTimeout(timers.current.entranceEnd);
      if (timers.current.bg) clearTimeout(timers.current.bg);
    };
  }, [imagesLoaded, pages.length]);

  // --- Back button ---
  const flipAllBackAsync = (done: () => void) => {
    const flip = pageFlipRef.current;
    if (!flip) {
      done();
      return;
    }
    let idx = flip.getCurrentPageIndex();
    const step = () => {
      idx = flip.getCurrentPageIndex();
      if (idx > 0) {
        flip.flipPrev();
        const flipTime = flip.getSettings().flippingTime || 520;
        window.setTimeout(step, flipTime - 80);
      } else {
        const flipTime = flip.getSettings().flippingTime || 520;
        window.setTimeout(done, flipTime - 80);
      }
    };
    step();
  };

  const handleBackClick = () => {
    if (exiting) return;
    setPressed(true);
    window.setTimeout(() => setPressed(false), 80);

    const idx = currentPageIndex ?? 0;
    const finalizeExit = () => {
      setExiting(true);
      const lastDelay = STAGGER_MS * Math.max(0, pages.length - 1);
      const total = lastDelay + EXIT_DURATION + 80;
      timers.current!.exit = window.setTimeout(() => {
        try {
          pageFlipRef.current?.clear();
          pageFlipRef.current?.destroy();
          pageFlipRef.current = null;
        } catch {
          // The instance may already be detached during navigation.
        }
        navigate(-1);
      }, total);
    };

    if (idx > 0 && pageFlipRef.current) {
      flipAllBackAsync(() => {
        setBgWhite(false);
        timers.current!.exit = window.setTimeout(finalizeExit, BG_FADE_DURATION);
      });
           return;
    }

    setBgWhite(false);
    timers.current!.exit = window.setTimeout(finalizeExit, BG_FADE_DURATION);
  };

  const onBackPointerDown = (e: React.PointerEvent) => {
    setPressed(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onBackPointerUp = () => setPressed(false);

  useEffect(() => {
    return () => {
      if (!timers.current) return;
      if (timers.current.exit) clearTimeout(timers.current.exit);
      if (timers.current.shift) clearTimeout(timers.current.shift);
    };
  }, []);

  const inline = `
    .flipbook-wrap { width:100%; display:flex; justify-content:center; padding:0 24px; box-sizing:border-box; position:relative; }
    .flipbook-host { box-sizing:border-box; z-index:10; touch-action:none; display:block; visibility:${pageflipReady ? "visible" : "hidden"}; margin:0 auto; transition: transform 420ms cubic-bezier(.22,.61,.36,1); will-change: transform; position:relative; }
    .flipbook-host::after { content:""; position:absolute; right:-6px; top:0; bottom:0; width:18px; pointer-events:none; box-shadow:-18px 0 24px -12px rgba(0,0,0,0.12); border-radius:0; }
    .example-page-bg { position:fixed; inset:0; z-index:0; pointer-events:none; background:transparent; transition: background-color ${BG_FADE_DURATION}ms ease; }
    .example-page-bg.white { background:white; }
    .page { display:block; width:100%; height:100%; }
    .page-inner { width:100%; height:100%; display:flex; align-items:center; justify-content:center; box-sizing:border-box; padding:0; background:#fff; overflow:hidden; border-radius:0 !important; box-shadow:0 6px 18px rgba(0,0,0,0.06); transform-origin:center center; backface-visibility:hidden; will-change:auto; transition:none !important; }
    .page-img { width:100%; height:100%; object-fit:contain; display:block; }
    .flipbook-host .page, .flipbook-host .page-inner { max-height:none; height:100%; }
    @media (max-width:640px) { .flipbook-host .page, .flipbook-host .page-inner { height:100%; } .flipbook-wrap { padding:0 24px; } }
    .page-inner.pop-in { animation: popIn ${ENTRY_DURATION}ms cubic-bezier(.22,.61,.36,1) both; }
    @keyframes popIn { 0% { transform: translateY(8px) scale(0.04); opacity:0; } 60% { transform: translateY(0) scale(1.06); opacity:1; } 85% { transform: translateY(0) scale(0.96); opacity:1; } 100% { transform:none; opacity:1; } }
    .page-inner.suck-out { animation: suckOut ${EXIT_DURATION}ms cubic-bezier(.22,.61,.36,1) forwards; }
    @keyframes suckOut { 0% { opacity:1; } 40% { transform: translateY(6px) scale(1.06); opacity:1; } 72% { transform: translateY(6px) scale(0.92); opacity:1; } 88% { transform: translateY(6px) scale(0.04); opacity:1; }
      100% { transform: translateY(6px) scale(0.02); opacity: 0; }
    }
    .description-wrap { z-index: 30; pointer-events: auto; overflow: visible;}
  `;

  const hostStyle: React.CSSProperties = {
    width: hostDims.hostW ? `${hostDims.hostW}px` : undefined,
    height: hostDims.hostH ? `${hostDims.hostH}px` : undefined,
    maxWidth: "100%",
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-transparent overflow-hidden" style={{ perspective: "2000px" }}>
      <div className={`example-page-bg ${bgWhite ? "white" : ""}`} />
      <style>{inline}</style>

      <div className="flipbook-wrap">
        <div ref={hostRef} className={`flipbook-host ${mounted ? "mounted" : ""} ${exiting ? "exiting" : ""}`} aria-label="Flipbook" style={hostStyle}>
          {imagesLoaded &&
            pages.map((p, i) => (
              <div key={i} className="page" ref={(el) => (el ? (pageElsRef.current[i] = el) : undefined)}>
                <div
                  className={`page-inner ${mounted && !entrancePlayed && !exiting ? "pop-in" : ""} ${exiting ? "suck-out" : ""}`}
                  style={
                    exiting
                      ? { animationDelay: `${(pages.length - 1 - i) * STAGGER_MS}ms`, height: `${hostDims.hostH}px` }
                      : mounted && !entrancePlayed
                      ? { animationDelay: `${i * STAGGER_MS}ms`, height: `${hostDims.hostH}px` }
                      : { height: `${hostDims.hostH}px` }
                  }
                >
                 <img
  className="page-img select-none"
  src={p.src}
  alt={p.description ?? `Page ${i + 1}`}
  loading={i >= FIRST_STRICT ? "lazy" : "eager"}
/>

                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="description-wrap absolute overflow-visible" style={{ bottom: 25, right: 25}}>
        <div
          className="rounded-[40px] shadow-md rounded-full text-black hover:scale-110 hover:bg-black transition-all"
          style={{
            background: "rgba(255,255,255,0.0)",
            padding: "10px 14px",
            textAlign: "center",
            lineHeight: 1.2,
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <span
            onClick={handleBackClick}
            onPointerDown={onBackPointerDown}
            onPointerUp={onBackPointerUp}
            onPointerCancel={onBackPointerUp}
            role="button"
            tabIndex={0}
            style={{
              cursor: "pointer",
              padding: "2px 2px",
              borderRadius: 8,
              transform: pressed ? "translateY(1px) scale(0.985)" : undefined,
              transition: "transform 80ms linear",
              background: "transparent",
            }}
          >
            ←
          </span>
        </div>
      </div>
    </div>
  );
};

export default Object01;
