import { fileURLToPath } from 'url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@nuxtjs/composition-api': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
})
