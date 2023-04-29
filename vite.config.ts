import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AccessibleMinimodal',
      formats: ['es', 'umd', 'iife'],
      fileName: format => `accessible-minimodal.${format}.js`,
    },
  },
});
