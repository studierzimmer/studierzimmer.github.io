import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { useInlineSiteEditing } from "@/components/SiteEditControl";
import { getOceanPreloadSnapshot, preloadOceanExperience, subscribeOceanPreload, type OceanPreloadSnapshot } from "@/lib/oceanPreload";
import "./ocean-loading.css";

function LoadingPanel({ snapshot, onCancel }: { snapshot: OceanPreloadSnapshot; onCancel: () => void }) {
  const { settings } = useInlineSiteEditing();
  const reduced = useReducedMotion();
  const [displayed, setDisplayed] = useState(snapshot.percent);
  const [showIndicator, setShowIndicator] = useState(snapshot.phase !== "world");
  useEffect(() => {
    if (showIndicator) return;
    if (snapshot.status === "error") { setShowIndicator(true); return; }
    // Appearance grace only: never advance progress or reveal an unready world.
    const timer = window.setTimeout(() => setShowIndicator(true), 150);
    return () => window.clearTimeout(timer);
  }, [showIndicator, snapshot.status]);
  useEffect(() => {
    if (reduced || snapshot.status === "error") { setDisplayed(snapshot.percent); return; }
    let frame = 0;
    const start = performance.now();
    const from = Math.min(displayed, snapshot.percent);
    if (displayed > snapshot.percent) setDisplayed(snapshot.percent);
    const draw = (now: number) => {
      const fraction = Math.min(1, (now - start) / 160);
      setDisplayed(Math.min(snapshot.percent, from + (snapshot.percent - from) * fraction));
      if (fraction < 1) frame = requestAnimationFrame(draw);
    };
    if (from !== snapshot.percent) frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
    // The starting value belongs to this actual-progress update, not each frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapshot.percent, snapshot.status, reduced]);
  return <div className="ocean-loading-overlay" style={{ backgroundColor: settings.menu_background_color ?? "#ffffff", color: settings.menu_color, fontFamily: settings.menu_font_family }} aria-busy={snapshot.status !== "error"}>
    <div className="ocean-loading-meter" style={{ visibility: showIndicator ? "visible" : "hidden" }} role="progressbar" aria-label="Caricamento Ocean" aria-valuemin={0} aria-valuemax={100} aria-valuenow={snapshot.percent}>
      <span className="ocean-loading-percent">{Math.floor(Math.min(snapshot.percent, 99, displayed))}%</span>
      <span className={`ocean-loading-dots${snapshot.status === "error" ? " is-stopped" : ""}`} aria-hidden="true"><span>.</span><span>.</span><span>.</span></span>
    </div>
    {snapshot.status === "error" && <div className="ocean-loading-error" role="alert"><p>Ocean non è ancora disponibile. Controlla la connessione e riprova.</p><button type="button" onClick={() => { void preloadOceanExperience({ intent: true }).catch(() => undefined); }}>riprova</button><button type="button" onClick={() => window.location.reload()}>ricarica pagina</button></div>}
    <button type="button" className="ocean-loading-cancel" style={{ visibility: showIndicator ? "visible" : "hidden" }} onClick={onCancel}>annulla</button>
  </div>;
}

/** Body portal: route/menu transforms can never move the viewport's center. */
export default function OceanLoadingOverlay({ active, onCancel }: { active: boolean; onCancel: () => void }) {
  const snapshot = useSyncExternalStore(subscribeOceanPreload, getOceanPreloadSnapshot, getOceanPreloadSnapshot);
  if (!active || snapshot.status === "ready") return null;
  return createPortal(<LoadingPanel snapshot={snapshot} onCancel={onCancel} />, document.body);
}
