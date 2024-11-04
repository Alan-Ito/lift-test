import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  define: {
    'process.env': process.env
  }
})
