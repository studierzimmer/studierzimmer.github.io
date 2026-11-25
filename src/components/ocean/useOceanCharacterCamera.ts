import { useCallback, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createCharacterCamera } from "./characterCamera";

interface Props {
  scene: THREE.Scene;
  camera: THREE.Camera;
  gl: { domElement: HTMLCanvasElement };
  playerRef: { current: THREE.Object3D | null };
  keys: Record<string, boolean>;
  isActive: boolean | (() => boolean);
}
interface Pointer { x: number; y: number; pan: boolean }

/** Exact original entry/reverse camera, then gesture-driven character orbit.
 * Priority-1 runs before underwater/fog readers without owning the render loop. */
export function useOceanCharacterCamera({ scene, camera, gl, playerRef, keys, isActive }: Props) {
  const controller = useMemo(() => createCharacterCamera({ scene, camera, getPlayer: () => playerRef.current }), [scene, camera, playerRef]);
  const old = useRef({ angle: 0, blend: 0, distance: 70, height: 22, lookHeight: 6 });
  const explore = useRef(false), manual = useRef(false), pointerEnabled = useRef(false);
  const pointers = useRef(new Map<number, Pointer>());
  const initialStyle = useRef<{ pointerEvents: string; touchAction: string } | null>(null);
  const activeRef = useRef(isActive); activeRef.current = isActive;
  const active = () => typeof activeRef.current === "function" ? activeRef.current() : activeRef.current;
  const lastPublished = useRef("");
  const publishState = useCallback((force = false) => {
    const state = controller.getState();
    const host = document.getElementById("global-sky-ocean-bg");
    const visible = explore.current && !document.hidden && !host?.hasAttribute("data-ocean-preparing") && (typeof activeRef.current === "function" ? activeRef.current() : activeRef.current);
    const detail = { detached: visible && state.detached, returning: visible && state.returning };
    const key = `${detail.detached}:${detail.returning}`;
    if (!force && key === lastPublished.current) return;
    lastPublished.current = key;
    window.dispatchEvent(new CustomEvent("ocean-camera-state", { detail }));
  }, [controller]);
  const vectors = useMemo(() => ({ offset: new THREE.Vector3(), follow: new THREE.Vector3(), intro: new THREE.Vector3(), look: new THREE.Vector3(), introLook: new THREE.Vector3(), axis: new THREE.Vector3(0, 1, 0) }), []);

  useEffect(() => {
    const canvas = gl.domElement;
    const previous = { pointerEvents: canvas.style.pointerEvents, touchAction: canvas.style.touchAction };
    initialStyle.current = previous;
    const clear = () => {
      for (const id of pointers.current.keys()) { try { if (canvas.hasPointerCapture(id)) canvas.releasePointerCapture(id); } catch { /* Already cancelled. */ } }
      pointers.current.clear();
    };
    const host = () => document.getElementById("global-sky-ocean-bg");
    explore.current = host()?.getAttribute("data-explore") === "1";
    const mode = (event: Event) => {
      const enabled = Boolean((event as CustomEvent<{ enabled: boolean }>).detail?.enabled);
      // Sky's visibility pause dispatches false without changing the user's
      // desired explore mode. Preserve orbit and entry progress across it.
      if (!enabled && document.hidden && host()?.getAttribute("data-explore") === "1") { clear(); return; }
      explore.current = enabled;
      if (!enabled) { clear(); pointerEnabled.current = false; canvas.style.pointerEvents = previous.pointerEvents; canvas.style.touchAction = previous.touchAction; }
      publishState();
    };
    const enabled = () => pointerEnabled.current && explore.current && active() && !document.hidden && !host()?.hasAttribute("data-ocean-preparing");
    const excluded = (target: EventTarget | null) => target instanceof Element && Boolean(target.closest("button,input,textarea,select,a,[role=button],[data-ocean-control],[data-inline-edit-ui]"));
    const pair = () => [...pointers.current.values()].slice(0, 2);
    const shape = () => {
      const points = pair();
      return points.length < 2 ? null : { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2, distance: Math.max(1, Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y)) };
    };
    const down = (event: PointerEvent) => {
      if (event.defaultPrevented || !enabled() || excluded(event.target) || (event.pointerType === "mouse" && event.button !== 0 && event.button !== 2)) return;
      event.preventDefault(); pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY, pan: event.button === 2 || event.shiftKey });
      canvas.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      const previousPoint = pointers.current.get(event.pointerId);
      if (!previousPoint || !enabled()) return;
      event.preventDefault(); const before = shape();
      pointers.current.set(event.pointerId, { ...previousPoint, x: event.clientX, y: event.clientY });
      const after = shape();
      if (before && after) { controller.pan(after.x - before.x, after.y - before.y); controller.zoom(Math.log(before.distance / after.distance) * 320); }
      else if (previousPoint.pan || event.shiftKey) controller.pan(event.clientX - previousPoint.x, event.clientY - previousPoint.y);
      else controller.orbit(event.clientX - previousPoint.x, event.clientY - previousPoint.y);
      publishState();
    };
    const end = (event: PointerEvent) => {
      pointers.current.delete(event.pointerId);
      try { if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId); } catch { /* Already cancelled. */ }
    };
    const wheel = (event: WheelEvent) => { if (enabled() && !excluded(event.target)) { event.preventDefault(); controller.zoom(event.deltaY); publishState(); } };
    const context = (event: MouseEvent) => { if (enabled()) event.preventDefault(); };
    const visibility = () => { if (document.hidden) clear(); publishState(); };
    const returnBehind = () => { if (!enabled()) return; clear(); controller.reset(); publishState(); };
    const requestState = () => publishState(true);
    window.addEventListener("explore-mode", mode); window.addEventListener("blur", clear);
    window.addEventListener("ocean-camera-return", returnBehind);
    window.addEventListener("ocean-camera-state-request", requestState);
    document.addEventListener("visibilitychange", visibility);
    canvas.addEventListener("pointerdown", down); canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", end); canvas.addEventListener("pointercancel", end); canvas.addEventListener("lostpointercapture", end);
    canvas.addEventListener("wheel", wheel, { passive: false }); canvas.addEventListener("contextmenu", context);
    return () => {
      clear(); pointerEnabled.current = false;
      canvas.style.pointerEvents = previous.pointerEvents; canvas.style.touchAction = previous.touchAction;
      window.removeEventListener("explore-mode", mode); window.removeEventListener("blur", clear);
      window.removeEventListener("ocean-camera-return", returnBehind);
      window.removeEventListener("ocean-camera-state-request", requestState);
      document.removeEventListener("visibilitychange", visibility);
      canvas.removeEventListener("pointerdown", down); canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", end); canvas.removeEventListener("pointercancel", end); canvas.removeEventListener("lostpointercapture", end);
      canvas.removeEventListener("wheel", wheel); canvas.removeEventListener("contextmenu", context);
    };
  }, [controller, gl, publishState]);

  useFrame((_, delta) => {
    if (!active() || document.hidden) return;
    const player = playerRef.current; if (!player) return;
    const state = old.current;
    state.blend = THREE.MathUtils.clamp(state.blend + delta * (explore.current ? 1 : -1), 0, 1);
    const ease = state.blend * state.blend * (3 - 2 * state.blend);
    const strafe = (keys.arrowright || keys.d ? 1 : 0) - (keys.arrowleft || keys.a ? 1 : 0) + (Number(player.userData.joyX) || 0);
    if (Math.abs(strafe) > .05) state.angle -= strafe * delta * 2.5;
    state.distance = THREE.MathUtils.damp(state.distance, Number(player.userData.cameraDistance) || 70, 3.5, delta);
    state.height = THREE.MathUtils.damp(state.height, Number(player.userData.cameraHeight) || 22, 3.5, delta);
    state.lookHeight = THREE.MathUtils.damp(state.lookHeight, Number(player.userData.lookHeight) || 6, 3.5, delta);
    const isManual = explore.current && state.blend >= 1 && !document.getElementById("global-sky-ocean-bg")?.hasAttribute("data-ocean-preparing");
    if (isManual) {
      if (!manual.current) controller.resume();
      controller.update(delta, { x: strafe });
    } else {
      vectors.offset.set(0, state.height, state.distance).applyAxisAngle(vectors.axis, state.angle);
      vectors.follow.copy(player.position).add(vectors.offset);
      vectors.intro.set(Math.sin(state.blend * Math.PI) * 20, 20, 100).lerp(vectors.follow, ease);
      camera.position.lerp(vectors.intro, .12);
      vectors.look.copy(player.position); vectors.look.y += state.lookHeight;
      vectors.introLook.set(0, 5, 0).lerp(vectors.look, ease); camera.lookAt(vectors.introLook); camera.updateMatrixWorld();
    }
    manual.current = isManual; pointerEnabled.current = isManual;
    publishState();
    const style = initialStyle.current;
    if (style) { gl.domElement.style.pointerEvents = isManual ? "auto" : style.pointerEvents; gl.domElement.style.touchAction = isManual ? "none" : style.touchAction; }
  }, -1);
}
