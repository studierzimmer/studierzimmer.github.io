import { Spherical, Vector3 } from "three";

interface CameraPose {
  position: Vector3;
  up: Vector3;
  zoom: number;
  updateProjectionMatrix: () => void;
}
interface Controls {
  target: Vector3;
  enabled: boolean;
  enableDamping: boolean;
  autoRotate: boolean;
  update: () => unknown;
}
export interface CameraReturnHandle {
  restore: () => Promise<boolean>;
  tick: (delta: number) => void;
  cancel: () => void;
  dispose: () => void;
}

/** Runs on the existing Canvas clock: no extra RAF, timer or hidden-tab work. */
export function createCameraReturn(camera: CameraPose, controls: Controls, home: readonly [number, number, number], onBusy: (busy: boolean) => void, reduced: () => boolean): CameraReturnHandle {
  const destination = new Vector3(...home);
  const target = new Vector3();
  const homeOrbit = new Spherical().setFromVector3(destination);
  const offset = new Vector3();
  let disposed = false;
  let job: { fromTarget: Vector3; orbit: Spherical; theta: number; zoom: number; elapsed: number; promise: Promise<boolean>; resolve: (complete: boolean) => void; enabled: boolean; damping: boolean; autoRotate: boolean } | null = null;
  const finish = (complete: boolean) => {
    const current = job;
    if (!current) return;
    job = null;
    if (complete) {
      camera.position.copy(destination); camera.up.set(0, 1, 0); camera.zoom = 1;
      controls.target.copy(target); camera.updateProjectionMatrix(); controls.update();
    }
    controls.enabled = current.enabled;
    controls.enableDamping = current.damping;
    controls.autoRotate = current.autoRotate;
    onBusy(false);
    current.resolve(complete);
  };
  const restore = (): Promise<boolean> => {
    if (disposed) return Promise.resolve(false);
    if (job) return job.promise;
    if (camera.position.distanceToSquared(destination) < 1e-8 && controls.target.lengthSq() < 1e-8 && Math.abs(camera.zoom - 1) < 1e-6) return Promise.resolve(true);
    const fromPosition = camera.position.clone();
    const fromTarget = controls.target.clone();
    const fromUp = camera.up.clone();
    const zoom = camera.zoom;
    const enabled = controls.enabled, damping = controls.enableDamping, autoRotate = controls.autoRotate;
    controls.enabled = false; controls.enableDamping = false; controls.autoRotate = false;
    // Drain residual OrbitControls damping synchronously, then put the exact
    // starting pose back before any frame is painted. No reset() snap is shown.
    controls.update();
    camera.position.copy(fromPosition); camera.up.copy(fromUp); camera.zoom = zoom;
    controls.target.copy(fromTarget); camera.updateProjectionMatrix(); controls.update();
    const orbit = new Spherical().setFromVector3(offset.copy(fromPosition).sub(fromTarget));
    const theta = Math.atan2(Math.sin(homeOrbit.theta - orbit.theta), Math.cos(homeOrbit.theta - orbit.theta));
    let resolve!: (complete: boolean) => void;
    const promise = new Promise<boolean>((done) => { resolve = done; });
    job = { fromTarget, orbit, theta, zoom, elapsed: 0, promise, resolve, enabled, damping, autoRotate };
    onBusy(true);
    if (reduced()) finish(true);
    return promise;
  };
  return {
    restore,
    tick(delta) {
      if (!job || !Number.isFinite(delta)) return;
      job.elapsed += Math.max(0, Math.min(delta, .05));
      const progress = Math.min(1, job.elapsed / .76);
      const x = progress - 1;
      const eased = 1 + 1.75 * x * x * x + .75 * x * x;
      controls.target.copy(job.fromTarget).lerp(target, eased);
      const radius = Math.exp(Math.log(Math.max(.0001, job.orbit.radius)) * (1 - eased) + Math.log(homeOrbit.radius) * eased);
      offset.setFromSphericalCoords(radius, job.orbit.phi + (homeOrbit.phi - job.orbit.phi) * eased, job.orbit.theta + job.theta * eased);
      camera.position.copy(controls.target).add(offset);
      camera.zoom = Math.exp(Math.log(Math.max(.0001, job.zoom)) * (1 - eased));
      camera.updateProjectionMatrix(); controls.update();
      if (progress === 1) finish(true);
    },
    cancel: () => finish(false),
    dispose() { disposed = true; finish(false); },
  };
}
