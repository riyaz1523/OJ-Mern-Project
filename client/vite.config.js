import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
      '/problem': {
        target: 'http://localhost:3000',
        secure: true,
      },
      '/compiler': {
        target: 'http://localhost:3000',
        secure: true,
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['axios', 'react-split'] 
    },
  },
  plugins: [react()],
  define: { global: 'globalThis'} 
});
