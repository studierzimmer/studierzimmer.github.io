
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float } from "@react-three/drei";

function Model({ scale = 1 }: { scale?: number }) {
  const { scene } = useGLTF("https://modelviewer.dev/shared-assets/models/Astronaut.glb"); // Replace URL if needed
  return <primitive object={scene} scale={scale} />;
}

export default function FloatingModelCanvas() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} />
        <Float speed={1} rotationIntensity={2} floatIntensity={2}>
          <Model scale={1.2} />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
      </Canvas>
    </div>
  );
}
