import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject';

// https://vite.dev/config
export default defineConfig({
  base: '/drum-machine/',
  resolve: { alias: { '@': '/src' } },
  plugins: [inject({ $: 'jquery', jQuery: 'jquery' })]
});