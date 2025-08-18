import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:process.env.VITE_BASE_PATH || "/Data-Visualization/tree/main/DV%20frontend/DV%20Web"
})
