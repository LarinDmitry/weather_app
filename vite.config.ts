/// <reference types="vitest" />
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import {resolve} from 'path';

export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: {exportType: 'default', ref: true, svgo: false, titleProp: true},
      include: '**/*.svg',
    }),
    react(),
    checker({typescript: true}),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      assets: resolve(__dirname, './src/assets'),
      components: resolve(__dirname, './src/components'),
      pages: resolve(__dirname, './src/pages'),
      api: resolve(__dirname, './src/api'),
      services: resolve(__dirname, './src/services'),
      store: resolve(__dirname, './src/store'),
      theme: resolve(__dirname, './src/theme'),
    },
  },
});
