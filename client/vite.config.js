import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  plugins: [
    react(), // Add @vitejs/plugin-react here
    envCompatible({
      // Specify the path to your .env file (assuming it's in the root)
      filepath: './.env',
    }),
  ],
});
