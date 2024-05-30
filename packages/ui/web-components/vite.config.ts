import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ rollupTypes: true })],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'main',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
    }
  },
  define: {
    'process.env': process.env
  }
});
