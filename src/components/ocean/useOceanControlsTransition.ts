import { useCallback, useEffect, useRef, useState } from "react";
import { createOceanControlsTransition, type OceanCameraState, type OceanControlsPhase } from "./oceanControlsTransition";

const incoming: Keyframe[] = [
  { scale: "0", offset: 0 }, { scale: "1.075", offset: .48 },
  { scale: ".97", offset: .66 }, { scale: "1.018", offset: .8 },
  { scale: ".994", offset: .91 }, { scale: "1", offset: 1 },
];
const outgoing = incoming.map((frame) => ({ ...frame, offset: 1 - Number(frame.offset) })).reverse();

export function useOceanControlsTransition({ enabled, reduced, detached, releaseInputs }: {
  enabled: boolean;
  reduced: boolean;
  detached: boolean;
  releaseInputs: () => void;
}) {
  const tools = useRef<HTMLDivElement>(null);
  const movement = useRef<HTMLDivElement>(null);
  const current = useRef({ enabled, reduced, detached, releaseInputs });
  current.current = { enabled, reduced, detached, releaseInputs };
  const [phase, setPhase] = useState<OceanControlsPhase>("visible");
  const controller = useRef<ReturnType<typeof createOceanControlsTransition> | null>(null);

  useEffect(() => {
    let animations: Animation[] = [];
    let animationGeneration = 0;
    const elements = () => [tools.current, movement.current].filter((element): element is HTMLDivElement => Boolean(element));
    const stop = () => { animationGeneration++; animations.forEach((animation) => animation.cancel()); animations = []; };
    const reset = () => {
      stop();
      elements().forEach((element) => { element.style.scale = "1"; element.inert = false; element.style.pointerEvents = ""; });
    };
    const dispatch = (name: string) => window.dispatchEvent(new CustomEvent(name));
    const machine = createOceanControlsTransition({
      animate: async (visible) => {
        stop();
        const token = animationGeneration;
        const nodes = elements();
        nodes.forEach((element) => { element.inert = true; element.style.pointerEvents = "none"; });
        if (current.current.reduced || nodes.some((element) => !element.animate)) {
          nodes.forEach((element) => { element.style.scale = visible ? "1" : "0"; });
          return true;
        }
        animations = nodes.map((element) => element.animate(visible ? incoming : outgoing, {
          duration: 760, easing: "cubic-bezier(.22,.88,.3,1)", fill: "forwards",
        }));
        const finished = await Promise.all(animations.map((animation) => animation.finished.then(() => true, () => false)));
        if (token !== animationGeneration) return false;
        nodes.forEach((element) => { element.style.scale = visible ? "1" : "0"; });
        animations.forEach((animation) => animation.cancel()); animations = [];
        return finished.every(Boolean);
      },
      reset,
      releaseInputs: () => current.current.releaseInputs(),
      canReturn: () => current.current.enabled && current.current.detached && !document.hidden,
      returnCamera: () => dispatch("ocean-camera-return"),
      requestCameraState: () => dispatch("ocean-camera-state-request"),
      onPhase: setPhase,
      schedule: (callback, delay) => window.setTimeout(callback, delay),
      clearTimer: (timer) => window.clearTimeout(timer),
    });
    controller.current = machine;
    const state = (event: Event) => machine.cameraState((event as CustomEvent<OceanCameraState>).detail);
    const cancel = () => machine.cancel();
    const visibility = () => { if (document.hidden) machine.cancel(); };
    window.addEventListener("ocean-camera-state", state);
    window.addEventListener("portfolio:ocean-exit", cancel);
    window.addEventListener("blur", cancel);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      machine.dispose(); controller.current = null;
      window.removeEventListener("ocean-camera-state", state);
      window.removeEventListener("portfolio:ocean-exit", cancel);
      window.removeEventListener("blur", cancel);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => { if (!enabled) controller.current?.cancel(); }, [enabled]);
  const begin = useCallback(() => { void controller.current?.begin(); }, []);
  const busy = useCallback(() => controller.current?.getPhase() !== "visible" && controller.current !== null, []);
  return { tools, movement, phase, begin, busy };
}
