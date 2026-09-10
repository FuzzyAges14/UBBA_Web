/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Bind all interfaces so Cursor / cloud port-forward can reach the process.
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // Cloudflare quick tunnels + Cursor port-forwards send a non-localhost Host.
    allowedHosts: ['.trycloudflare.com', 'localhost', '127.0.0.1'],
    // Keep HMR on the same forwarded port (avoids client connecting to an
    // unreachable internal host and resetting the Simple Browser session).
    hmr: {
      clientPort: 5173,
    },
    proxy: {
      // Forward form submissions to the local API (`pnpm dev:api`).
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
    // Allow Cloudflare quick-tunnel hostnames used for shared previews.
    allowedHosts: ['.trycloudflare.com', 'localhost', '127.0.0.1'],
  },
  build: {
    // Separate long-lived vendor code from route chunks for better caching.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion')) return 'motion'
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/react-router') ||
            id.includes('/scheduler/')
          ) {
            return 'react-vendor'
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'server/**/*.{test,spec}.{ts,tsx}'],
  },
})
