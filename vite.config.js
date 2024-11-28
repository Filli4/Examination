// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // Ensure paths are relative
  plugins: [react()],
   server: {
    proxy: {
      '/api': {
        target: 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
