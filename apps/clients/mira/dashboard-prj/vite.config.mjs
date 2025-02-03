import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ mode, command }) => {
  const target = (mode === 'development') ? '/' : './'
  console.log("command:", command)
  console.log("mode:", mode)
  console.log("target:", target)
  return {
    ssr: false,
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      quasar({
        sassVariables: fileURLToPath(
          new URL('./dashboard/css/quasar-variables.sass', import.meta.url)
        )
      })
    ],
   /* base: target, */
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./app', import.meta.url))
      }
    },

    build: {
      modulePreload: false,
      /* base: target, */
      rollupOptions: {
        preserveEntrySignatures: "allow-extension",
        input: {
          main: resolve(__dirname, 'index.html'),
          /* dashboard: resolve(__dirname, 'dashboard/index.html') */
        }
      }
    },

    rollupOptions: {
      external: ['vue', 'vue-router'],
      input: {
        main: resolve(__dirname, 'index.html'),
       /* dashboard: resolve(__dirname, 'dashboard/index.html') */
      }
    }}})
