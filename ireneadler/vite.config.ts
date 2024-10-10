import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
    host: true, // exposes to the outside world (allows Docker container to communicate)
    port: 5173, // uses the same port
  },
})
