import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MiraiDBThemes',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue', '@miraidb/core-components'],
      output: {
        globals: {
          vue: 'Vue',
          '@miraidb/core-components': 'MiraiDBComponents'
        }
      }
    }
  }
})
