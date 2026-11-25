import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { preloadOceanAssets } from "@/components/SkyOceanBackground";
import { activateOceanWorld, cancelOceanWorldPreparation, prepareOceanWorld, updateOceanWorldEnvironment } from "@/components/ocean/oceanWorldHost";
import SiteEditControl, { useInlineSiteEditing } from "@/components/SiteEditControl";
import { listPublishedCharacters } from "@/services/characterRepository";
import type { Character3D } from "@/types/characters3d";
import OceanEnvironmentEditor from "@/components/ocean/OceanEnvironmentEditor";
import OceanInlineText from "@/components/ocean/OceanInlineText";
import { useOceanControlsTransition } from "@/components/ocean/useOceanControlsTransition";
import { normalizeOceanEnvironment, OCEAN_ENVIRONMENT_EVENT } from "@/types/oceanEnvironment";
import { DEFAULT_OCEAN_LABELS, normalizeOceanLabels, type OceanLabels } from "@/types/oceanText";
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
  const { editing, settings, draft, update, saving } = useInlineSiteEditing();
  const content = editing ? draft : settings;
  const labels = normalizeOceanLabels(content.ocean_labels);
  const updateLabel = (key: keyof OceanLabels, value: string) => update({ ocean_labels: { ...labels, [key]: value } });
  const environment = useMemo(() => normalizeOceanEnvironment(content.ocean_environment), [content.ocean_environment]);
  const entryEnvironment = useRef(environment);
  const reduced = useReducedMotion();
  const [submerged, setSubmerged] = useState(() => document.getElementById("global-sky-ocean-bg")?.getAttribute("data-underwater") === "1");
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [started, setStarted] = useState(false);
  const [introClosing, setIntroClosing] = useState(false);
  const [figuresOpen, setFiguresOpen] = useState(false);
  const [cameraState, setCameraState] = useState({ detached: false, returning: false });
  const [activeCharacterKind, setActiveCharacterKind] = useState<"avatar" | "aircraft" | "ship">("avatar");
  const [characters, setCharacters] = useState<Character3D[]>([]);
  const [characterError, setCharacterError] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character3D | null>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const circle = useRef<SVGCircleElement>(null);
  const aperture = useRef<Animation | null>(null);
  const exitingRef = useRef(false);
  const startTimer = useRef<ReturnType<typeof setTimeout>>();
  const joystickStart = useRef<{ x: number; y: number; moved: boolean; pointerId: number } | null>(null);
  const heldControls = useRef(new Map<number, HTMLElement>());
  const mask = `ocean-aperture-${useId().replace(/:/g, "")}`;
  const figuresId = useId();
  const releaseHeldControls = useCallback(() => {
    joystickStart.current = null;
    const held = [...heldControls.current];
    heldControls.current.clear();
    held.forEach(([pointerId, element]) => {
      try { if (element.hasPointerCapture?.(pointerId)) element.releasePointerCapture(pointerId); } catch { /* Contact already ended. */ }
    });
    setKnob({ x: 0, y: 0 });
    send("explore-joystick-contact", { active: false });
    send("explore-joystick", { x: 0, z: 0 });
    send("explore-vertical", { y: 0 });
    send("explore-sprint", { active: false });
    send("ocean-controls-release");
  }, []);
  const controlsTransition = useOceanControlsTransition({
    enabled: ready && started && !editing && !exiting,
    reduced: Boolean(reduced), detached: cameraState.detached,
    releaseInputs: () => { setFiguresOpen(false); releaseHeldControls(); },
  });

  useEffect(() => {
    const depth = (event: Event) => setSubmerged(Boolean((event as CustomEvent<{ underwater: boolean }>).detail.underwater));
    window.addEventListener("ocean-depth-state", depth);
    return () => window.removeEventListener("ocean-depth-state", depth);
  }, []);

  useEffect(() => {
    const release = () => {
      if (!joystickStart.current) return;
      joystickStart.current = null; setKnob({ x: 0, y: 0 });
      send("explore-joystick-contact", { active: false });
      send("explore-joystick", { x: 0, z: 0 });
    };
    const visibility = () => { if (document.hidden) release(); };
    window.addEventListener("blur", release); document.addEventListener("visibilitychange", visibility);
    return () => { window.removeEventListener("blur", release); document.removeEventListener("visibilitychange", visibility); release(); };
  }, []);

  useEffect(() => {
    if (editing || !figuresOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest("[data-ocean-panel], [data-ocean-panel-toggle]")) return;
      setFiguresOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFiguresOpen(false);
    };
    document.addEventListener("pointerdown", dismiss, true);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", dismiss, true); document.removeEventListener("keydown", escape); };
  }, [editing, figuresOpen]);

  useEffect(() => {
    const updateCamera = (event: Event) => {
      const state = (event as CustomEvent<{ detached: boolean; returning: boolean }>).detail;
      setCameraState({ detached: Boolean(state.detached), returning: Boolean(state.returning) });
    };
    window.addEventListener("ocean-camera-state", updateCamera);
    send("ocean-camera-state-request");
    return () => window.removeEventListener("ocean-camera-state", updateCamera);
  }, []);

  useEffect(() => {
    const updateCharacter = (event: Event) => {
      const kind = (event as CustomEvent<{ id: string; kind: string }>).detail.kind;
      setActiveCharacterKind(kind === "ship" || kind === "aircraft" ? kind : "avatar");
    };
    window.addEventListener("ocean-active-character-change", updateCharacter);
    // The retained world may already be using a ship when this page remounts.
    send("ocean-active-character-state-request");
    return () => window.removeEventListener("ocean-active-character-change", updateCharacter);
  }, []);

  useEffect(() => {
    void preloadOceanAssets().catch(() => undefined);
    activateOceanWorld(entryEnvironment.current);
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
      releaseHeldControls();
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
  }, [reduced, releaseHeldControls]);

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
    void listPublishedCharacters().then((items) => { if (active) { setCharacters(items); setCharacterError(false); } }).catch(() => { if (active) setCharacterError(true); });
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
    send("ocean-audio-unlock");
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
    joystickStart.current = null; setKnob({ x: 0, y: 0 }); send("explore-joystick-contact", { active: false }); send("explore-joystick", { x: 0, z: 0 });
  };
  const hold = (event: React.PointerEvent<HTMLButtonElement>, y: number) => { if (exitingRef.current || controlsTransition.busy()) return; event.currentTarget.setPointerCapture(event.pointerId); heldControls.current.set(event.pointerId, event.currentTarget); send("explore-vertical", { y }); };
  const releaseVertical = (event: React.PointerEvent<HTMLButtonElement>) => { heldControls.current.delete(event.pointerId); send("explore-vertical", { y: 0 }); };

  return (
    <main className={`ocean-page${editing ? " is-editing" : ""}`} style={{ color: content.ocean_text_color ?? (submerged ? "#dcebf1" : content.menu_color) }} aria-busy={exiting} onKeyDownCapture={(event) => { if (exitingRef.current) { event.preventDefault(); event.stopPropagation(); } }}>
      <SiteEditControl section="navigate" />
      <OceanEnvironmentEditor />
      <svg className="ocean-aperture" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><mask id={mask} maskUnits="userSpaceOnUse" x="-100" y="-100" width="300" height="300"><rect x="-100" y="-100" width="300" height="300" fill="white" /><circle ref={circle} cx="50" cy="50" r="9" fill="black" style={{ transformOrigin: "50px 50px", transform: reduced ? "scale(9)" : "scale(0)" }} /></mask></defs><rect className="ocean-aperture-veil" width="100" height="100" fill={content.menu_background_color ?? "#ffffff"} mask={`url(#${mask})`} /></svg>
      {ready && (!started || editing) && <div className={`ocean-intro ${introClosing ? "is-closing" : ""}`}>
        <motion.div layout="position" transition={{ layout: reduced ? { duration: 0 } : introSpring }} className="ocean-intro-content blossom" data-blossom style={{ fontFamily: content.menu_font_family, fontSize: `${content.menu_font_size}px`, backgroundColor: content.ocean_background_color ?? "transparent", letterSpacing: `${content.menu_letter_spacing}px` }}>
          {editing ? <><OceanInlineText label="Titolo Ocean" value={content.ocean_title ?? "Studierzimmer-Ozean"} disabled={saving} onChange={(value) => update({ ocean_title: value })} /><OceanInlineText label="Sottotitolo Ocean" value={content.ocean_subtitle ?? "studierzimmer.ch"} disabled={saving} onChange={(value) => update({ ocean_subtitle: value })} /></> : <><p>{content.ocean_title ?? "Studierzimmer-Ozean"}</p><p>{content.ocean_subtitle ?? "studierzimmer.ch"}</p></>}
          <div className="ocean-intro-actions">{editing ? <>
            <OceanInlineText action label="Testo pulsante Exit" value={labels.exit} disabled={saving} onChange={(value) => updateLabel("exit", value)} />
            <OceanInlineText action label="Testo pulsante start" value={labels.start} disabled={saving} onChange={(value) => updateLabel("start", value)} />
          </> : <><button aria-label={labels.exit.trim() || DEFAULT_OCEAN_LABELS.exit} onClick={() => navigate("/")}>{labels.exit}</button><button aria-label={labels.start.trim() || DEFAULT_OCEAN_LABELS.start} onClick={start}>{labels.start}</button></>}</div>
          {editing && <p className="ocean-edit-hint" role="status">Modifica i testi sottolineati · Salva o Annulla per tornare alla navigazione.</p>}
        </motion.div>
      </div>}
      {ready && (started || editing) && <>
        <div data-ocean-control data-blossom className="ocean-tools blossom"><div ref={controlsTransition.tools} className="ocean-tools-inner ocean-controls-scale">{editing ? <>
          <OceanInlineText action label="Testo Exit nella navigazione" value={labels.exit} disabled={saving} onChange={(value) => updateLabel("exit", value)} />
          <OceanInlineText action label="Testo pulsante figura" value={labels.figure} disabled={saving} onChange={(value) => updateLabel("figure", value)} />
        </> : <><button aria-label={labels.exit.trim() || DEFAULT_OCEAN_LABELS.exit} onClick={() => navigate("/")}>{labels.exit}</button><button aria-label={labels.figure.trim() || DEFAULT_OCEAN_LABELS.figure} data-ocean-panel-toggle aria-expanded={figuresOpen} aria-controls={figuresId} onClick={() => setFiguresOpen((current) => !current)}>{labels.figure}</button><AnimatePresence initial={false}>{started && cameraState.detached && <motion.button key="recenter" aria-label="Riporta la camera dietro la figura" disabled={cameraState.returning || controlsTransition.phase !== "visible"} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 380, damping: 18, mass: .8 }} onClick={controlsTransition.begin}>Re-Center</motion.button>}</AnimatePresence>{started && activeCharacterKind === "ship" && <button aria-label="Riporta la nave in superficie" onClick={() => { if (exitingRef.current || controlsTransition.busy()) return; send("ocean-audio-unlock"); send("ocean-ship-surface"); }}>Surface</button>}</>}</div></div>
        {!editing && <>
        <AnimatePresence>
          {figuresOpen && <motion.section key="figures" id={figuresId} data-ocean-control data-ocean-panel className="ocean-figures" aria-label="Figure del mondo" initial={{ y: 36 }} animate={{ y: 0 }} exit={{ y: 36 }} transition={reduced ? { duration: 0 } : introSpring}>{characterError && <p role="status">{labels.figuresUnavailable}</p>}{!characters.length && !characterError && <p>{labels.loadingFigures}</p>}{characters.map((character) => <button key={character.id} onClick={() => { setSelectedCharacter(character); setFiguresOpen(false); }}>{character.name}</button>)}</motion.section>}
        </AnimatePresence>
        <div data-ocean-control data-blossom className="ocean-movement blossom">
          <div ref={controlsTransition.movement} className="ocean-movement-inner ocean-controls-scale">
          <button className="ocean-movement-descend" aria-label="Scendi" onPointerDown={(event) => hold(event, -1)} onPointerUp={releaseVertical} onPointerCancel={releaseVertical} onLostPointerCapture={releaseVertical}>↓</button>
          <div role="button" aria-label="Muovi la figura; tocca per saltare" tabIndex={0} className="ocean-joystick" onKeyDown={(event) => { if (!controlsTransition.busy() && event.key === "Enter") send("explore-jump"); }} onPointerDown={(event) => { if (exitingRef.current || controlsTransition.busy() || joystickStart.current) return; event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); heldControls.current.set(event.pointerId, event.currentTarget); joystickStart.current = { x: event.clientX, y: event.clientY, moved: false, pointerId: event.pointerId }; send("explore-joystick-contact", { active: true, pointerId: event.pointerId }); }} onPointerMove={(event) => { const origin = joystickStart.current; if (!origin || origin.pointerId !== event.pointerId || exitingRef.current || controlsTransition.busy()) return; const dx = event.clientX - origin.x; const dy = event.clientY - origin.y; if (Math.hypot(dx, dy) > 5) origin.moved = true; const distance = Math.max(1, Math.hypot(dx, dy) / 32); const x = dx / distance; const y = dy / distance; setKnob({ x, y }); send("explore-joystick", { x: x / 32, z: -y / 32 }); }} onPointerUp={(event) => { heldControls.current.delete(event.pointerId); if (joystickStart.current?.pointerId === event.pointerId) stopJoystick(); }} onPointerCancel={(event) => { heldControls.current.delete(event.pointerId); if (joystickStart.current?.pointerId === event.pointerId) stopJoystick(false); }} onLostPointerCapture={(event) => { heldControls.current.delete(event.pointerId); if (joystickStart.current?.pointerId === event.pointerId) stopJoystick(false); }}><span style={{ transform: `translate(${knob.x}px, ${knob.y}px)` }} /></div>
          <button className="ocean-movement-ascend" aria-label="Sali" onPointerDown={(event) => hold(event, 1)} onPointerUp={releaseVertical} onPointerCancel={releaseVertical} onLostPointerCapture={releaseVertical}>↑</button>
          <button className="ocean-movement-roll-left" aria-label="Ruota a sinistra" onClick={() => { if (!exitingRef.current && !controlsTransition.busy()) send("explore-roll-step", { direction: -1 }); }}>↶</button><button className="ocean-movement-roll-right" aria-label="Ruota a destra" onClick={() => { if (!exitingRef.current && !controlsTransition.busy()) send("explore-roll-step", { direction: 1 }); }}>↷</button>
          </div>
        </div>
        </>}
      </>}
    </main>
  );
}

/** Asset-only preparation: never mounts the world, starts audio or the intro. */
// eslint-disable-next-line react-refresh/only-export-components -- Public imperative preload API consumed before this route mounts.
export function preloadOceanExperience(): Promise<void> {
  return preloadOceanAssets();
}

// eslint-disable-next-line react-refresh/only-export-components -- Explicit-entry preparation, never used by idle background warmup.
export function prepareOceanEntryWorld(environment?: unknown): Promise<boolean> { return prepareOceanWorld(environment); }
// eslint-disable-next-line react-refresh/only-export-components -- Cancels only hidden preparation, not the displayed Ocean exit.
export function cancelOceanEntryWorld(): void { cancelOceanWorldPreparation(); }
// eslint-disable-next-line react-refresh/only-export-components -- Saved settings must precede the first complete hidden frame.
export function updatePreparedOceanEnvironment(environment?: unknown): void { updateOceanWorldEnvironment(environment); }
