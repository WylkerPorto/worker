import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Detecta build para GitHub Pages ou não
const isPreview = process.env.VITE_ROUTER_MODE === 'hash'

export default defineConfig({
  plugins: [vue()],
  base: isPreview ? '/worker/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 8080,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
  },
})
