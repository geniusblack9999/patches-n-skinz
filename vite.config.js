import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://geniusblack9999.github.io/patches-n-skinz/ in production,
// so assets need that base path. Local dev stays at root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/patches-n-skinz/' : '/',
  plugins: [react()],
}))
