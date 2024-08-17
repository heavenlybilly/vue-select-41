import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import * as path from 'path'
import dts from 'vite-plugin-dts'
import alias from '@rollup/plugin-alias';

export default defineConfig({
  plugins: [
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
      ]
    }),
    vue(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VueSelect41',
      fileName: (format) => `vue-select-41.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})