import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    rollupOptions: {
      input: resolve('index.html'),
      output: { manualChunks: id => id.includes('/node_modules/three/') ? 'three' : id.includes('/node_modules/gsap/') ? 'motion' : undefined },
    },
  },
});
