export type OceanControlsPhase = "visible" | "hiding" | "returning" | "showing";
export interface OceanCameraState { detached: boolean; returning: boolean }

interface Options {
  animate: (visible: boolean) => Promise<boolean>;
  reset: () => void;
  releaseInputs: () => void;
  canReturn: () => boolean;
  returnCamera: () => void;
  requestCameraState: () => void;
  onPhase: (phase: OceanControlsPhase) => void;
  schedule: (callback: () => void, delay: number) => number;
  clearTimer: (timer: number) => void;
}

/** Only controls move. The world, exploration mode and aperture are untouched. */
export function createOceanControlsTransition(options: Options) {
  let phase: OceanControlsPhase = "visible";
  let generation = 0;
  let disposed = false;
  let acknowledged = false;
  let watchdog: number | null = null;
  const getPhase = () => phase;
  const clear = () => { if (watchdog !== null) options.clearTimer(watchdog); watchdog = null; };
  const publish = (next: OceanControlsPhase) => { phase = next; options.onPhase(next); };
  const show = async (token: number) => {
    if (disposed || token !== generation || phase === "showing") return;
    clear();
    publish("showing");
    await options.animate(true).catch(() => false);
    if (disposed || token !== generation) return;
    options.reset();
    publish("visible");
  };
  const cancel = () => {
    generation++;
    clear();
    acknowledged = false;
    options.reset();
    if (!disposed) publish("visible");
  };
  return {
    getPhase,
    async begin() {
      if (disposed || phase !== "visible" || !options.canReturn()) return;
      const token = ++generation;
      options.releaseInputs();
      publish("hiding");
      const hidden = await options.animate(false).catch(() => false);
      if (disposed || token !== generation) return;
      if (!hidden || !options.canReturn()) { await show(token); return; }
      acknowledged = false;
      publish("returning");
      // This is an ignored-command safety net, not the camera's timing.
      // Normal restoration is driven by its actual returning:false event.
      watchdog = options.schedule(() => { void show(token); }, 1000);
      options.returnCamera();
      if (getPhase() === "returning") options.requestCameraState();
    },
    cameraState(state: OceanCameraState) {
      if (disposed || phase !== "returning") return;
      if (state.returning) {
        if (acknowledged) return;
        acknowledged = true;
        clear();
        const token = generation;
        watchdog = options.schedule(() => { void show(token); }, 6000);
      } else if (acknowledged || !state.detached) {
        // A manual orbit interrupts the return with detached:true/returning:false.
        void show(generation);
      }
    },
    cancel,
    dispose() { disposed = true; cancel(); },
  };
}
