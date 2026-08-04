// build-prod.mjs — build de PRODUCCIÓN para el dominio propio (raíz), típicamente
// para subir por FTP al hosting existente.
//
// Diferencia con `npm run build`: fuerza `base='/'` (raíz del dominio) en vez del
// subdirectorio de GitHub Pages. Así el staging de Pages (`npm run build`) y la
// producción en dominio propio (`npm run build:prod`) conviven sin tocar el config.
//
// Sin dependencias extra y cross-platform (Windows/macOS/Linux): setea la variable
// SITE_BASE — que lee astro.config.mjs — y corre `astro build`.
import { spawnSync } from 'node:child_process';

const res = spawnSync('astro', ['build'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, SITE_BASE: '/' },
});

process.exit(res.status ?? 1);
