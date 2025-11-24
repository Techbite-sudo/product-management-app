import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Base path for GitHub Pages deployment
  // IMPORTANT: Change this to match your repository name
  // For repo named 'product-management-app', use '/product-management-app/'
  // For root-level GitHub Pages (username.github.io), use '/'
  const base = mode === 'production' 
    ? (process.env.VITE_BASE_PATH || '/product-management-app/')
    : '/'
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    }
  }
})

