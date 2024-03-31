import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dts from 'vite-plugin-dts'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['lib'], insertTypesEntry: true })],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, 'lib/main.ts'),
      name: 'tailwind-md3',
      formats: ['es', 'umd'],
      fileName: 'tailwind-md3'
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'tailwindcss']
    }
  }
})
