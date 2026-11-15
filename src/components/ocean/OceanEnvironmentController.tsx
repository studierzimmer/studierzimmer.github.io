import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { createOriginalWaterAdapter } from "./originalWaterAdapter";
import { normalizeOceanEnvironment, OCEAN_ENVIRONMENT_EVENT } from "@/types/oceanEnvironment";

export const oceanEnvironmentState = { current: normalizeOceanEnvironment() };

/** Uniform updates only; the original scene, materials and underwater stay mounted. */
export default function OceanEnvironmentController({ disabled = false }: { disabled?: boolean }) {
  const { scene, camera, gl } = useThree();
  const adapter = useRef<ReturnType<typeof createOriginalWaterAdapter> | null>(null);
  const settings = useRef(normalizeOceanEnvironment());
  useEffect(() => {
    if (disabled) return;
    const read = () => {
      const serialized = document.getElementById("global-sky-ocean-bg")?.getAttribute("data-ocean-environment");
      try { settings.current = normalizeOceanEnvironment(serialized ? JSON.parse(serialized) : undefined); }
      catch { settings.current = normalizeOceanEnvironment(); }
      oceanEnvironmentState.current = settings.current;
    };
    read();
    window.addEventListener(OCEAN_ENVIRONMENT_EVENT, read);
    return () => window.removeEventListener(OCEAN_ENVIRONMENT_EVENT, read);
  }, [disabled]);
  useEffect(() => {
    if (disabled) return;
    const instance = createOriginalWaterAdapter({ scene, gl });
    adapter.current = instance;
    return () => { if (adapter.current === instance) adapter.current = null; instance.dispose(); };
  }, [scene, gl, disabled]);
  // All original callbacks have run: capture current geometry and then render
  // once, with the original Canvas' Cineon tone mapping, shadows and MSAA.
  useFrame((state) => {
    if (!adapter.current) return;
    adapter.current.update(camera, state.clock.elapsedTime, settings.current);
    gl.render(scene, camera);
  }, disabled ? 0 : 1);
  return null;
}
