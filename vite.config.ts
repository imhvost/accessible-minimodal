import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json' assert { type: 'json' };

export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'terser',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AccessibleMinimodal',
      formats: ['es', 'umd', 'iife', 'cjs'],
      fileName: format => `accessible-minimodal.${format}.js`,
    },
    rollupOptions: {
      output: {
        banner: `
/*!
* accessible-minimodal v${pkg.version}
* https://github.com/imhvost/accessible-minimodal
*/
`,
        footer: `
          for (const key of Object.keys(globalThis.AccessibleMinimodal)) {
            globalThis[key] = globalThis.AccessibleMinimodal[key]
          }
        `,
      },
    },
  },
  plugins: [dts()],
});
