// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Astro 5 + Tailwind v4 (Vite plugin — no @astrojs/tailwind integration needed).
//
// El `base` cambia según el contexto, y todo link/asset se arma con
// `${import.meta.env.BASE_URL}…`, así que se adapta solo:
//
//   - DEV (`npm run dev`)              → '/'              → localhost limpio.
//   - BUILD staging (`npm run build`)   → '/exporteller/'  → subdirectorio de GitHub
//                                         Pages (https://lutviadesigndev.github.io/exporteller/).
//   - BUILD producción (`npm run build:prod`) → '/'        → dominio propio en la raíz
//                                         (FTP). El script pasa SITE_BASE='/'.
//
// Así el staging de Pages y la producción por FTP conviven sin tocar este archivo.
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://lutviadesigndev.github.io',
  base: isDev ? '/' : (process.env.SITE_BASE || '/exporteller/'),
  vite: {
    plugins: [tailwindcss()],
  },
});
