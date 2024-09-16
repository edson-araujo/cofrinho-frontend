import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() ],
  server: {
    host: '192.168.15.10',
    port: 5173,
  },
})
