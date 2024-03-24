import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { vitePlugin as remix } from '@remix-run/dev'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), remix(), tsconfigPaths()]
})
