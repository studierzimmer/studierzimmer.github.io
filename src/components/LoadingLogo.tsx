import React, { useCallback, useEffect, useRef, useState } from "react";
import wolfy from "@/Portrait/WolfyLight.gif";
import { useProgress } from "@react-three/drei";

interface LoadingLogoProps {
  onComplete: () => void;
}

const ENTRY_DELAY = 100;
const ALLOW_EXIT_DELAY = 500;
const AUTO_TIMEOUT = 14000;
const EXIT_ANIM_DURATION = 400;

const LoadingLogo = ({ onComplete }: LoadingLogoProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [allowExit, setAllowExit] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [imgSize, setImgSize] = useState<{ w?: number; h?: number }>({});
  const [displayProgress, setDisplayProgress] = useState(0);
  const [showPercent, setShowPercent] = useState(true);

  const timers = useRef<{ entry?: number; allowExit?: number; auto?: number; fallback?: number }>({});
  const animElRef = useRef<HTMLDivElement | null>(null);
  const completeCalled = useRef(false);
  const prefersReducedMotion = useRef(false);

  // Drei's useProgress hook
  const { progress } = useProgress();

  // Smooth progress interpolation
  useEffect(() => {
    let raf: number;
    const update = () => {
      setDisplayProgress((prev) => {
        const diff = progress - prev;
        const step = Math.max(diff * 0.1, diff > 0 ? 0.5 : -0.5); // smooth easing
        const next = Math.abs(diff) < 0.5 ? progress : prev + step;
        if (next >= 100) {
          setTimeout(() => setShowPercent(false), 500); // hide after short delay
        }
        return Math.min(100, Math.max(0, next));
      });
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  // Reduced motion detection
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mq.matches;
    const handler = () => (prefersReducedMotion.current = mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // Preload GIF
  useEffect(() => {
    const img = new Image();
    img.src = wolfy;
    const safeSetSize = () => setImgSize({ w: img.naturalWidth || 400, h: img.naturalHeight || 400 });
    img.decode?.().then(() => {
      safeSetSize();
      setImageLoaded(true);
    }).catch(() => {
      img.onload = () => {
        safeSetSize();
        setImageLoaded(true);
      };
    });
  }, []);

  const triggerExit = useCallback(() => {
    if (completeCalled.current) return;
    if (prefersReducedMotion.current) {
      completeCalled.current = true;
      onComplete();
      return;
    }

    setIsExiting(true);
    const el = animElRef.current;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      completeCalled.current = true;
      onComplete();
    };

    if (el) {
      const onAnimEnd = () => {
        el.removeEventListener("animationend", onAnimEnd);
        if (timers.current.fallback) clearTimeout(timers.current.fallback);
        finish();
      };
      el.addEventListener("animationend", onAnimEnd, { once: true });
      timers.current.fallback = window.setTimeout(finish, EXIT_ANIM_DURATION + 120);
    } else {
      timers.current.fallback = window.setTimeout(finish, EXIT_ANIM_DURATION + 50);
    }
  }, [onComplete]);

  // Entrance timers
  useEffect(() => {
    if (!imageLoaded) return;
    const scheduledTimers = timers.current;

    if (prefersReducedMotion.current) {
      setHasStarted(true);
      setAllowExit(true);
      scheduledTimers.auto = window.setTimeout(() => triggerExit(), 800);
    } else {
      scheduledTimers.entry = window.setTimeout(() => setHasStarted(true), ENTRY_DELAY);
      scheduledTimers.allowExit = window.setTimeout(() => setAllowExit(true), ALLOW_EXIT_DELAY);
      scheduledTimers.auto = window.setTimeout(() => triggerExit(), AUTO_TIMEOUT);
    }

    return () => {
      Object.values(scheduledTimers).forEach((timer) => timer && clearTimeout(timer));
    };
  }, [imageLoaded, triggerExit]);

  const handleClick = () => {
    if (allowExit || prefersReducedMotion.current) triggerExit();
  };

  const animClass = !hasStarted ? "logo-hidden" : !isExiting ? "animate-elastic-grow" : "animate-elastic-shrink";

  return (
    <div
      className={`fixed inset-0 bg-white dark:bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${
        completeCalled.current ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
      style={{ willChange: "opacity" }}
      onClick={handleClick}
    >
      <div
        className={`relative ${animClass}`}
        ref={animElRef}
        style={{ width: "30rem", height: "30rem", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {/* Pulsating halo */}
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/20 blur-xl animate-pulse-ring"></span>
          <span className="absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/10 blur-xl animate-pulse-ring delay-300"></span>
        </span>

        <img
          src={wolfy}
          alt="Loading wolf"
          width={imgSize.w || 800}
          height={imgSize.h || 800}
          className="object-contain relative z-10 select-none pointer-events-none"
          style={{ width: "30rem", height: "30rem", display: "block" }}
        />
      </div>

      {/* Percentage (disappears at 100%) */}
      {showPercent && (
        <div
          className={`mt-4 flex text-gray-700 dark:text-gray-200 text-xl font-bold transition-opacity duration-500 ${
            displayProgress >= 100 ? "opacity-0" : "opacity-100"
          }`}
        >
          {Math.round(displayProgress)}%
        </div>
      )}

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          70% { transform: scale(1.4); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .animate-pulse-ring { animation: pulse-ring 1s infinite; }
        .delay-300 { animation-delay: 0.3s; }

        .logo-hidden { transform-origin: 50% 50%; transform: scale(0); opacity: 1; }
        @keyframes elastic-grow {
          0% { transform: scale(0); opacity: 1; }
          55% { transform: scale(1.18); }
          78% { transform: scale(0.95); }
          90% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
        .animate-elastic-grow { transform-origin: 50% 50%; animation: elastic-grow 700ms cubic-bezier(.2,1.05,.3,1) forwards; }

        @keyframes elastic-shrink {
          0% { transform: scale(1); opacity: 1; }
          60% { transform: scale(0.9); opacity: 0.9; }
          100% { transform: scale(0); opacity: 1; }
        }
        .animate-elastic-shrink { transform-origin: 50% 50%; animation: elastic-shrink ${EXIT_ANIM_DURATION}ms ease-in forwards; }
      `}</style>
    </div>
  );
};

export default LoadingLogo;
