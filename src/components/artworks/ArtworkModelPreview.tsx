import { Component, Suspense, useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Html, useGLTF } from "@react-three/drei";
import { Box3, Group, Sphere } from "three";
import { SkeletonUtils, STLLoader } from "three-stdlib";
import type { ThreeDModel } from "@/types/threeDModels";

class PreviewBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return <span className="artwork-preview-status">3D</span>;
    }
    return this.props.children;
  }
}

function GlbPreview({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const fitted = useMemo(() => {
    const object = SkeletonUtils.clone(scene);
    object.updateMatrixWorld(true);
    const sphere = new Box3().setFromObject(object, true).getBoundingSphere(new Sphere());
    const scale = Number.isFinite(sphere.radius) && sphere.radius > 0 ? 1.45 / sphere.radius : 1;
    return { object, scale, position: sphere.center.multiplyScalar(-scale) };
  }, [scene]);

  return (
    <group scale={fitted.scale} position={fitted.position}>
      <primitive object={fitted.object} />
    </group>
  );
}

function StlPreview({ model }: { model: ThreeDModel }) {
  const original = useLoader(STLLoader, model.public_url);
  const fitted = useMemo(() => {
    const geometry = original.clone();
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
    const sphere = geometry.boundingSphere;
    const scale = sphere && sphere.radius > 0 ? 1.45 / sphere.radius : 1;
    if (sphere) geometry.translate(-sphere.center.x, -sphere.center.y, -sphere.center.z);
    return { geometry, scale };
  }, [original]);

  useEffect(() => () => fitted.geometry.dispose(), [fitted]);

  return (
    <mesh geometry={fitted.geometry} scale={fitted.scale}>
      <meshStandardMaterial color={model.plaster_color || "#eeeae1"} roughness={0.7} />
    </mesh>
  );
}

function MovingModel({ model, motion }: { model: ThreeDModel; motion: boolean }) {
  const group = useRef<Group>(null);
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    if (!group.current || !motion) return;
    // Pausing a hidden canvas must not fast-forward or reset its visible pose.
    elapsed.current += Math.min(delta, .05);
    const time = elapsed.current;
    group.current.rotation.y = time * 0.2;
    group.current.rotation.z = Math.sin(time * 0.55) * 0.055;
    group.current.position.y = Math.sin(time * 0.8) * 0.11;
  });

  const stl = /\.stl$/i.test(model.file_name) || /\.stl$/i.test(model.storage_path);
  return <group ref={group}>{stl ? <StlPreview model={model} /> : <GlbPreview url={model.public_url} />}</group>;
}

/** The small catalogue preview. Full interaction stays in the existing model studio. */
export default function ArtworkModelPreview({ model, motion = true }: { model: ThreeDModel; motion?: boolean }) {
  return (
    <PreviewBoundary key={model.id}>
      <Canvas
        resize={{ offsetSize: true }}
        camera={{ position: [0, 0, 5.6], fov: 37 }}
        dpr={[1, 1.4]}
        frameloop={motion ? "always" : "demand"}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ pointerEvents: "none" }}
        aria-hidden="true"
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={2.4} />
        <directionalLight position={[-3, 1, -2]} intensity={1.1} />
        <Suspense fallback={<Html center><span className="artwork-preview-status">...</span></Html>}>
          <Environment files={`${import.meta.env.BASE_URL}studio.hdr`} />
          <MovingModel model={model} motion={motion} />
        </Suspense>
      </Canvas>
    </PreviewBoundary>
  );
}
