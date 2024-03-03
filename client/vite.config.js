import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000' || 'https://oj-mern-project.onrender.com/',
        secure: false,
      },
      '/problem': {
        target: 'http://localhost:3000' || 'https://oj-mern-project.onrender.com/',
        secure: true,
      },
      '/compiler': {
        target: 'http://localhost:3000' || 'https://oj-mern-project.onrender.com/',
        secure: true,
      },
    },
  },
  plugins: [react()],
});
