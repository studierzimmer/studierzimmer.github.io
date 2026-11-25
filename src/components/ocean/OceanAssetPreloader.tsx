import { Component, Suspense, useEffect, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { TextureLoader } from "three";
import { oceanBootAssetUrl } from "@/lib/oceanBootAssets";

interface BoundaryProps { children: ReactNode; onError: (error: Error) => void }
class AssetBoundary extends Component<BoundaryProps, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error) { this.props.onError(error); }
  render() { return this.state.failed ? null : this.props.children; }
}

// eslint-disable-next-line react-refresh/only-export-components -- Imperative, detached asset primer; never a visible refresh boundary.
function AssetCacheReady({ onReady }: { onReady: () => void }) {
  // These are the renderer's exact public hooks/constructors/cache keys. No
  // Canvas, world components, lights, Audio, controls or animation loop mount.
  useGLTF(oceanBootAssetUrl("wolfy.glb"));
  useGLTF(oceanBootAssetUrl("island.gltf"));
  useLoader(TextureLoader, oceanBootAssetUrl("waternormals.jpeg"));
  useLoader(TextureLoader, oceanBootAssetUrl("caustics.png"));
  useEffect(onReady, [onReady]);
  return null;
}

let pending: Promise<void> | null = null;
export function prepareOceanAssetCache(): Promise<void> {
  if (pending) return pending;
  const attempt = new Promise<void>((resolve, reject) => {
    let root: Root | null = null;
    let settled = false;
    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      queueMicrotask(() => {
        root?.unmount(); root = null;
        if (error) {
          useGLTF.clear(oceanBootAssetUrl("wolfy.glb"));
          useGLTF.clear(oceanBootAssetUrl("island.gltf"));
          useLoader.clear(TextureLoader, oceanBootAssetUrl("waternormals.jpeg"));
          useLoader.clear(TextureLoader, oceanBootAssetUrl("caustics.png"));
          reject(error);
        } else resolve();
      });
    };
    try {
      useGLTF.preload(oceanBootAssetUrl("wolfy.glb"));
      useGLTF.preload(oceanBootAssetUrl("island.gltf"));
      useLoader.preload(TextureLoader, oceanBootAssetUrl("waternormals.jpeg"));
      useLoader.preload(TextureLoader, oceanBootAssetUrl("caustics.png"));
      root = createRoot(document.createDocumentFragment());
      root.render(<AssetBoundary onError={(error) => finish(error)}><Suspense fallback={null}><AssetCacheReady onReady={() => finish()} /></Suspense></AssetBoundary>);
    } catch (error) { finish(error instanceof Error ? error : new Error(String(error))); }
  });
  pending = attempt.catch((error) => { pending = null; throw error; });
  return pending;
}
