import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'accessible-minimodal',
      formats: ['es', 'cjs', 'umd'],
      fileName: 'accessible-minimodal',
    },
  },
  plugins: [dts()],
});
