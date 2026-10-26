import { defineConfig } from "vite";
export default defineConfig({
  base: process.env.DEPLOY_BASE || "/",
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
