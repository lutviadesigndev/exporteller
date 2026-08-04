// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Astro 5 + Tailwind v4 (Vite plugin — no @astrojs/tailwind integration needed).
//
// GitHub Pages (staging):
//   - If the repo is a PROJECT page (https://<user>.github.io/<repo>), set:
//       site: 'https://<user>.github.io'
//       base: '/<repo>'
//   - If it's a USER/ORG page or a custom domain, set `site` to that URL and
//     REMOVE `base` (or set it to '/').
//
// The scaffolder fills these in from the repo name it creates.
export default defineConfig({
  site: 'https://lutviadesigndev.github.io',
  base: '/exporteller/',
  vite: {
    plugins: [tailwindcss()],
  },
});
