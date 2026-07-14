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
            moduleId.includes("node_modules/@react-spring/")
          ) {
            return "motion";
          }
          if (moduleId.includes("node_modules/@supabase/")) return "supabase";
          return "vendor";
        },
      },
    },
  },
}));
