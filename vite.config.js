import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Premier proxy
        changeOrigin: true,
        secure: false,
      },
      '/mediacollection': {
        target: 'http://192.168.1.179:8000', // Deuxième proxy
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/mediacollection/, '/api/mediacollection'), // Ajout d'une réécriture si nécessaire
      },
    },
  },
});
