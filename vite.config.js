import { defineConfig } from "vite";
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ["gsap", "gsap/ScrollTrigger", "lenis"],
          three: ["three"],
        },
      },
    },
  },
});
