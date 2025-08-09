import { defineConfig } from 'vite'

// vite.config.ts
export default defineConfig({
  base: '/authFormExample/',
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`
      }
    }
  }
});