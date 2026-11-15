import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    sourcemap: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(moduleId) {
          // Vite's tiny lazy-import runtime must not be captured by a 3D
          // chunk, otherwise every lazy route would eagerly import Three.
          if (moduleId.includes("vite/preload-helper") || moduleId.includes("commonjsHelpers.js")) return "react-core";
          if (!moduleId.includes("node_modules")) return;
          if (moduleId.includes("node_modules/three/")) return "three";
          if (
            moduleId.includes("node_modules/@react-three/") ||
            moduleId.includes("node_modules/three-stdlib/")
          ) {
            return "react-three";
          }
          if (moduleId.includes("node_modules/postprocessing/")) {
            return "postprocessing";
          }
          if (
            moduleId.includes("node_modules/framer-motion/") ||
            moduleId.includes("node_modules/motion-dom/") ||
            moduleId.includes("node_modules/motion-utils/")
          ) {
            return "motion";
          }
          if (moduleId.includes("node_modules/@supabase/")) return "supabase";
          // A catch-all vendor chunk can pull lazy 3D dependencies back into
          // the home page through shared imports. Keep only the actual UI
          // runtime together; let Rollup split everything else by usage.
          if (/node_modules\/(react|react-dom|scheduler|react-router|react-router-dom)\//.test(moduleId)) return "react-core";
          return undefined;
        },
      },
    },
  },
}));
