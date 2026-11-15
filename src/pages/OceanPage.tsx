import { Suspense, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SkyOceanBackground, { preloadOceanAssets } from "@/components/SkyOceanBackground";
import SiteEditControl, { useInlineSiteEditing } from "@/components/SiteEditControl";
import { listPublishedCharacters } from "@/services/characterRepository";
import type { Character3D } from "@/types/characters3d";
import OceanEnvironmentEditor from "@/components/ocean/OceanEnvironmentEditor";
import { normalizeOceanEnvironment, OCEAN_ENVIRONMENT_EVENT } from "@/types/oceanEnvironment";
import "@/styles/ocean-page.css";

const send = (name: string, detail?: unknown) => window.dispatchEvent(new CustomEvent(name, { detail }));
const editable = (target: EventTarget | null) => target instanceof Element && Boolean(target.closest("input,textarea,select,[contenteditable=true]"));
const introSpring = { type: "spring" as const, stiffness: 190, damping: 25, mass: .85 };
// Original Index reveal: CSS `reveal-elastic 3s 1.5s forwards`.
// CSS keyframe easing applies per segment, not to the whole timeline: keep
// the medium opening, pinch, final expansion and final hold clearly distinct.
const oceanRevealFrames: Keyframe[] = [
  { transform: "scale(0)", offset: 0, easing: "ease" },
  { transform: "scale(1.7)", offset: .5, easing: "ease" },
  { transform: "scale(.92)", offset: .72, easing: "ease" },
  { transform: "scale(9)", offset: .88, easing: "ease" },
  { transform: "scale(9)", offset: 1 },
];
const oceanRevealTiming: KeyframeAnimationOptions = { duration: 3000, delay: 1500, easing: "linear", fill: "both" };

function reverseOceanAperture(animation: Animation): Promise<unknown> | null {
  // The entry's anticipation belongs before its first visible motion, not
  // after the exit has already closed. Remove only that delay, rebasing the
  // current time so reversal/cancellation retain the exact current pose.
  const delay = Number(animation.effect?.getTiming().delay ?? 0);
  if (delay > 0 && typeof animation.currentTime === "number") {
    const activeTime = Math.max(0, animation.currentTime - delay);
    animation.effect?.updateTiming({ delay: 0 });
    animation.currentTime = activeTime;
  }
  // Retargeting a route must not toggle reverse() and reopen the aperture.
  animation.playbackRate = -Math.abs(animation.playbackRate || 1);
  if (typeof animation.currentTime === "number" && animation.currentTime <= 0) {
    animation.pause();
    animation.currentTime = 0;
    return null;
  }
  animation.play();
  return animation.finished.catch(() => undefined);
}

export default function OceanPage() {
  const navigate = useNavigate();
  const { editing, settings, draft, update } = useInlineSiteEditing();
  const content = editing ? draft : settings;
  const environment = useMemo(() => normalizeOceanEnvironment(content.ocean_environment), [content.ocean_environment]);
  const reduced = useReducedMotion();
  const [submerged, setSubmerged] = useState(() => document.getElementById("global-sky-ocean-bg")?.getAttribute("data-underwater") === "1");
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [started, setStarted] = useState(false);
  const [introClosing, setIntroClosing] = useState(false);
  const [about, setAbout] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [aboutHeight, setAboutHeight] = useState(0);
  const [figuresOpen, setFiguresOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [characters, setCharacters] = useState<Character3D[]>([]);
  const [characterError, setCharacterError] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character3D | null>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const circle = useRef<SVGCircleElement>(null);
  const aperture = useRef<Animation | null>(null);
  const exitingRef = useRef(false);
  const startTimer = useRef<ReturnType<typeof setTimeout>>();
  const joystickStart = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const aboutMeasure = useRef<HTMLDivElement>(null);
  const mask = `ocean-aperture-${useId().replace(/:/g, "")}`;
  const aboutId = useId();
  const figuresId = useId();
  const musicId = useId();

  useEffect(() => {
    const depth = (event: Event) => setSubmerged(Boolean((event as CustomEvent<{ underwater: boolean }>).detail.underwater));
    window.addEventListener("ocean-depth-state", depth);
    return () => window.removeEventListener("ocean-depth-state", depth);
  }, []);

  useEffect(() => {
    if (!figuresOpen && !musicOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest("[data-ocean-panel], [data-ocean-panel-toggle]")) return;
      setFiguresOpen(false); setMusicOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setFiguresOpen(false); setMusicOpen(false); }
    };
    document.addEventListener("pointerdown", dismiss, true);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", dismiss, true); document.removeEventListener("keydown", escape); };
  }, [figuresOpen, musicOpen]);

  useLayoutEffect(() => {
    const element = aboutMeasure.current;
    if (!element) return;
    // Measure the untransformed copy, even while its reserved space is closed.
    // Keeping it mounted lets the text finish its scale-out before the group
    // springs back to its compact, vertically centered layout.
    const measure = () => setAboutHeight(element.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ready, editing, content.ocean_about]);

  useEffect(() => {
    preloadOceanAssets();
    const global = window as typeof window & { __GLOBAL_SKY_OCEAN_BG_ROOT__?: Root };
    let host = document.getElementById("global-sky-ocean-bg");
    if (!global.__GLOBAL_SKY_OCEAN_BG_ROOT__) {
      host = host ?? document.createElement("div");
      host.id = "global-sky-ocean-bg";
      Object.assign(host.style, { position: "fixed", inset: "0", zIndex: "0", pointerEvents: "none" });
      host.setAttribute("data-render-active", "1");
      if (!host.isConnected) document.body.prepend(host);
      global.__GLOBAL_SKY_OCEAN_BG_ROOT__ = createRoot(host);
      global.__GLOBAL_SKY_OCEAN_BG_ROOT__.render(<Suspense fallback={null}><SkyOceanBackground /></Suspense>);
    }
    if (host) { host.style.display = "block"; host.setAttribute("data-render-active", "1"); host.setAttribute("data-audio-active", "1"); }
    send("skyocean-render", { active: true });
    send("skyocean-audio", { active: true });
    return () => {
      send("skyocean-audio", { active: false }); send("explore-mode", { enabled: false });
      send("explore-joystick", { x: 0, z: 0 }); send("explore-vertical", { y: 0 });
      const currentHost = document.getElementById("global-sky-ocean-bg");
      if (currentHost) { currentHost.setAttribute("data-audio-active", "0"); currentHost.setAttribute("data-explore", "0"); }
      clearTimeout(startTimer.current);
    };
  }, []);

  // Publish only after the persistent world host exists, including a first
  // visit with cached settings. The scene reads this before its first frame.
  useEffect(() => {
    const serialized = JSON.stringify(environment);
    const host = document.getElementById("global-sky-ocean-bg");
    if (host) host.setAttribute("data-ocean-environment", serialized);
    window.dispatchEvent(new CustomEvent(OCEAN_ENVIRONMENT_EVENT));
  }, [environment, ready]);

  useEffect(() => {
    const element = circle.current;
    if (!element || !element.animate || reduced) { setReady(true); return; }
    const animation = element.animate(oceanRevealFrames, oceanRevealTiming);
    aperture.current = animation;
    animation.finished.then(() => {
      if (!exitingRef.current && animation.playbackRate > 0) setReady(true);
    }).catch(() => undefined);
    return () => { animation.cancel(); aperture.current = null; };
  }, [reduced]);

  useEffect(() => {
    const onExit = (event: Event) => {
      // Keep the outgoing controls mounted for the route's scale-out. Stop
      // movement immediately instead of letting a held joystick keep travelling.
      exitingRef.current = true;
      setExiting(true);
      clearTimeout(startTimer.current);
      startTimer.current = undefined;
      joystickStart.current = null;
      setKnob({ x: 0, y: 0 });
      document.getElementById("global-sky-ocean-bg")?.setAttribute("data-explore", "0");
      send("explore-mode", { enabled: false });
      send("explore-joystick", { x: 0, z: 0 });
      send("explore-vertical", { y: 0 });
      send("explore-sprint", { active: false });
      const animation = aperture.current;
      if (animation && !reduced) {
        const completion = reverseOceanAperture(animation);
        if (completion) (event as CustomEvent<{ waitUntil: (promise: Promise<unknown>) => void }>).detail.waitUntil(completion);
      }
    };
    const onCancel = () => {
      if (!exitingRef.current) return;
      exitingRef.current = false;
      setExiting(false);
      setIntroClosing(false);
      const animation = aperture.current;
      if (animation && !reduced) {
        animation.playbackRate = Math.abs(animation.playbackRate || 1);
        animation.play();
        animation.finished.then(() => {
          if (!exitingRef.current && animation.playbackRate > 0) setReady(true);
        }).catch(() => undefined);
      } else {
        setReady(true);
      }
    };
    window.addEventListener("portfolio:ocean-exit", onExit);
    window.addEventListener("portfolio:ocean-exit-cancel", onCancel);
    return () => {
      window.removeEventListener("portfolio:ocean-exit", onExit);
      window.removeEventListener("portfolio:ocean-exit-cancel", onCancel);
    };
  }, [reduced]);

  useEffect(() => {
    const active = started && !editing && !exiting;
    document.getElementById("global-sky-ocean-bg")?.setAttribute("data-explore", active ? "1" : "0");
    send("explore-mode", { enabled: active });
    const keyboard = (event: KeyboardEvent) => {
      if (!active || editable(event.target) || event.code !== "Space") return;
      event.preventDefault(); if (!event.repeat) send("explore-jump");
    };
    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  }, [started, editing, exiting]);

  useEffect(() => {
    if (!figuresOpen || characters.length) return;
    let active = true;
    void listPublishedCharacters().then((items) => { if (active) { setCharacters(items); setCharacterError(null); } }).catch(() => { if (active) setCharacterError("Il catalogo delle figure non è disponibile. La figura inclusa resta utilizzabile."); });
    return () => { active = false; };
  }, [figuresOpen, characters.length]);

  useEffect(() => {
    if (!selectedCharacter) return;
    const select = () => send("ocean-character-select", { character: selectedCharacter });
    select(); window.addEventListener("ocean-character-player-ready", select);
    return () => window.removeEventListener("ocean-character-player-ready", select);
  }, [selectedCharacter]);

  const start = () => {
    if (!ready || editing || introClosing || exitingRef.current) return;
    send("skyocean-audio", { active: true });
    setIntroClosing(true);
    startTimer.current = setTimeout(() => {
      if (exitingRef.current) return;
      setStarted(true); setIntroClosing(false);
      startTimer.current = undefined;
    }, reduced ? 0 : 760);
  };
  const stopJoystick = (allowJump = true) => {
    if (allowJump && !exitingRef.current && joystickStart.current && !joystickStart.current.moved) send("explore-jump");
    joystickStart.current = null; setKnob({ x: 0, y: 0 }); send("explore-joystick", { x: 0, z: 0 });
  };
  const hold = (event: React.PointerEvent<HTMLButtonElement>, y: number) => { if (exitingRef.current) return; event.currentTarget.setPointerCapture(event.pointerId); send("explore-vertical", { y }); };

  return (
    <main className="ocean-page" style={{ color: content.ocean_text_color ?? (submerged ? "#dcebf1" : content.menu_color) }} aria-busy={exiting} onKeyDownCapture={(event) => { if (exitingRef.current) { event.preventDefault(); event.stopPropagation(); } }}>
      <SiteEditControl section="navigate" />
      <OceanEnvironmentEditor />
      <svg className="ocean-aperture" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><mask id={mask} maskUnits="userSpaceOnUse" x="-100" y="-100" width="300" height="300"><rect x="-100" y="-100" width="300" height="300" fill="white" /><circle ref={circle} cx="50" cy="50" r="9" fill="black" style={{ transformOrigin: "50px 50px", transform: reduced ? "scale(9)" : "scale(0)" }} /></mask></defs><rect className="ocean-aperture-veil" width="100" height="100" fill={content.menu_background_color ?? "#ffffff"} mask={`url(#${mask})`} /></svg>
      {ready && (!started || editing) && <div className={`ocean-intro ${introClosing ? "is-closing" : ""}`}>
        <motion.div layout="position" transition={{ layout: reduced ? { duration: 0 } : introSpring }} className="ocean-intro-content blossom" data-blossom style={{ fontFamily: content.menu_font_family, fontSize: `${content.menu_font_size}px`, backgroundColor: content.ocean_background_color ?? "transparent", letterSpacing: `${content.menu_letter_spacing}px` }}>
          {editing ? <><input aria-label="Titolo Ocean" value={content.ocean_title ?? "Studierzimmer-Ozean"} onChange={(event) => update({ ocean_title: event.target.value })} /><input aria-label="Sottotitolo Ocean" value={content.ocean_subtitle ?? "studierzimmer.ch"} onChange={(event) => update({ ocean_subtitle: event.target.value })} /><textarea aria-label="Testo Ocean" value={content.ocean_about ?? ""} onChange={(event) => update({ ocean_about: event.target.value })} rows={5} /></> : <><p>{content.ocean_title ?? "Studierzimmer-Ozean"}</p><p>{content.ocean_subtitle ?? "studierzimmer.ch"}</p></>}
          {!editing && <><div className="ocean-intro-actions"><button onClick={() => navigate("/")}>Exit</button><button onClick={start}>start</button><button aria-expanded={about} aria-controls={aboutId} onClick={() => { if (about) setAbout(false); else { setAboutExpanded(true); setAbout(true); } }}>about</button></div>
            <motion.div id={aboutId} className="ocean-about-reveal" initial={false} animate={{ height: aboutExpanded ? aboutHeight : 0 }} transition={reduced ? { duration: 0 } : introSpring} aria-hidden={!about}>
              <div ref={aboutMeasure} className="ocean-about-measure"><motion.p className="ocean-about" initial={false} animate={{ scale: about ? 1 : 0 }} transition={reduced ? { duration: 0 } : introSpring} onAnimationComplete={() => { if (!about) setAboutExpanded(false); }}>{content.ocean_about || "Uno spazio da attraversare, fra cielo e mare."}</motion.p></div>
            </motion.div>
          </>}
        </motion.div>
      </div>}
      {ready && started && !editing && <>
        <div data-ocean-control data-blossom className="ocean-tools blossom"><button onClick={() => navigate("/")}>Exit</button><button data-ocean-panel-toggle aria-expanded={figuresOpen} aria-controls={figuresId} onClick={() => { setFiguresOpen((current) => !current); setMusicOpen(false); }}>figura</button><button data-ocean-panel-toggle aria-expanded={musicOpen} aria-controls={musicId} onClick={() => { setMusicOpen((current) => !current); setFiguresOpen(false); }}>musica</button></div>
        <AnimatePresence>
          {figuresOpen && <motion.section key="figures" id={figuresId} data-ocean-control data-ocean-panel className="ocean-figures" aria-label="Figure del mondo" initial={{ y: 36 }} animate={{ y: 0 }} exit={{ y: 36 }} transition={reduced ? { duration: 0 } : introSpring}>{characterError && <p role="status">{characterError}</p>}{!characters.length && !characterError && <p>caricamento…</p>}{characters.map((character) => <button key={character.id} onClick={() => { setSelectedCharacter(character); setFiguresOpen(false); }}>{character.name}</button>)}</motion.section>}
          {musicOpen && <motion.div key="music" id={musicId} data-ocean-control data-ocean-panel className="ocean-music" initial={{ y: 36 }} animate={{ y: 0 }} exit={{ y: 36 }} transition={reduced ? { duration: 0 } : introSpring}><iframe title="Musica di Studier Zimmer" src="https://open.spotify.com/embed/playlist/5Z63kqzOn4CzWqazejJZEv?utm_source=generator" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /></motion.div>}
        </AnimatePresence>
        <div data-ocean-control data-blossom className="ocean-movement blossom">
          <button className="ocean-movement-descend" aria-label="Scendi" onPointerDown={(event) => hold(event, -1)} onPointerUp={() => send("explore-vertical", { y: 0 })} onPointerCancel={() => send("explore-vertical", { y: 0 })} onLostPointerCapture={() => send("explore-vertical", { y: 0 })}>↓</button>
          <div role="button" aria-label="Muovi la figura; tocca per saltare" tabIndex={0} className="ocean-joystick" onKeyDown={(event) => { if (event.key === "Enter") send("explore-jump"); }} onPointerDown={(event) => { if (exitingRef.current) return; event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); joystickStart.current = { x: event.clientX, y: event.clientY, moved: false }; }} onPointerMove={(event) => { const origin = joystickStart.current; if (!origin || exitingRef.current) return; const dx = event.clientX - origin.x; const dy = event.clientY - origin.y; if (Math.hypot(dx, dy) > 5) origin.moved = true; const distance = Math.max(1, Math.hypot(dx, dy) / 32); const x = dx / distance; const y = dy / distance; setKnob({ x, y }); send("explore-joystick", { x: x / 32, z: -y / 32 }); }} onPointerUp={() => stopJoystick()} onPointerCancel={() => stopJoystick(false)} onLostPointerCapture={() => stopJoystick(false)}><span style={{ transform: `translate(${knob.x}px, ${knob.y}px)` }} /></div>
          <button className="ocean-movement-ascend" aria-label="Sali" onPointerDown={(event) => hold(event, 1)} onPointerUp={() => send("explore-vertical", { y: 0 })} onPointerCancel={() => send("explore-vertical", { y: 0 })} onLostPointerCapture={() => send("explore-vertical", { y: 0 })}>↑</button>
          <button className="ocean-movement-roll-left" aria-label="Ruota a sinistra" onClick={() => send("explore-roll-step", { direction: -1 })}>↶</button><button className="ocean-movement-roll-right" aria-label="Ruota a destra" onClick={() => send("explore-roll-step", { direction: 1 })}>↷</button>
        </div>
      </>}
    </main>
  );
}

/** Triggered by navigation intent, never by the initial home module graph. */
export function preloadOceanExperience(): void {
  preloadOceanAssets();
}
