import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // ✅ Vite 8 — function form
        manualChunks: (id) => {
          if (id.includes('node_modules/react')) return 'react-vendor';
        }
      }
    }
  }
})
