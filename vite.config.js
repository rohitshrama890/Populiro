import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  // server: {
  //   host: "0.0.0.0",
  //   port: 5173,
  //   strictPort: true,
  //   allowedHosts: ["4920-2409-40d7-44-e30-e4f4-7832-8ce6-1ab.ngrok-free.app"], // Add Ngrok host here
  // },
})

