import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ads': {
        target: 'https://manydownload.pythonanywhere.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/ads/, ''),
      },
    },
  },
})
