import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
    define: {
    'process.env' :{}
  },
   server: {
    watch: {
      usePolling: true, // Needed for Docker/WSL2 or some file systems
      interval: 1000,  // Polling interval (ms)
    },
    hmr: true,         // Enable Hot Module Replacement
  },
})
