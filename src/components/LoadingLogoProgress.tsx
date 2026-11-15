import { useEffect } from "react";
import { useProgress } from "@react-three/drei";

/** Loaded only by splashes which actually display Three.js loading progress. */
export default function LoadingLogoProgress({ onProgress }: { onProgress: (progress: number) => void }) {
  const { progress } = useProgress();
  useEffect(() => { onProgress(progress); }, [onProgress, progress]);
  return null;
}
