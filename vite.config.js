import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  root: '.',
  build: {
    target: 'es2019',
    minify: 'esbuild',
    cssMinify: 'lightningcss',
    cssCodeSplit: false,
    sourcemap: false,
    reportCompressedSize: false,
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          three: ['three']
        }
      }
    }
  }
})
