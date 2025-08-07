import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// ADD vitest import
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  test: {
    globals: true, // ← also important (see next error)
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts', // optional
    exclude: [...configDefaults.exclude],
  },
})
