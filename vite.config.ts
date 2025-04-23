import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// ⚠️ Precisamos da função com o mode pra carregar o .env corretamente
export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente conforme o modo (preview, production, etc)
  const env = loadEnv(mode, process.cwd())

  const isPreview = env.VITE_ROUTER_MODE === 'hash'

  return {
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
  }
})
