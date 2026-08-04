// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Astro 5 + Tailwind v4 (Vite plugin — no @astrojs/tailwind integration needed).
//
// GitHub Pages (staging) sirve en un subdirectorio:
//   https://lutviadesigndev.github.io/exporteller/
// Por eso el BUILD necesita `base: '/exporteller/'`. Pero en DESARROLLO no hace
// falta: dejamos `base: '/'` para que el local quede en http://localhost:4321/
// (limpio) en vez de .../exporteller/. Como todos los links/assets del starter se
// arman con `${import.meta.env.BASE_URL}…`, funcionan igual con cualquiera de los dos.
//
// Cuando el sitio pase a su dominio propio por FTP (raíz del dominio), poné
// `base: '/'` fijo (borrá el condicional) y listo.
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://lutviadesigndev.github.io',
  base: isDev ? '/' : '/exporteller/',
  vite: {
    plugins: [tailwindcss()],
  },
});
