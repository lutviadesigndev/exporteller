# Exporteller

Sitio estático hecho con [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com). Sin CMS, sin base de datos, sin mantenimiento: solo archivos estáticos servidos desde un CDN.

## Estructura

```
src/
├── styles/global.css   ← MANUAL DE MARCA: colores, tipografías, espaciados (tokens)
├── layouts/Base.astro  ← molde común (header + footer) de todas las páginas
├── components/         ← Header, Footer, Button, Section reutilizables
└── pages/              ← una página = un archivo (routing automático)
public/                 ← assets estáticos (favicon, imágenes)
```

La consistencia sale de un solo lugar: editás `global.css` o un componente y el cambio se propaga a todo el sitio.

## Comandos

```bash
npm install       # instalar dependencias (una vez)
npm run dev       # servidor local en http://localhost:4321
npm run build     # compila a ./dist (esto es lo que se publica)
npm run preview   # previsualizar el build
```

## Deploy

- **Staging (GitHub Pages):** automático en cada push a `main` vía `.github/workflows/deploy.yml`. Activá Settings → Pages → Source: "GitHub Actions".
- **Hosting propio por FTP (caso clon de WP):** ver `.github/workflows/deploy-ftp.yml.disabled` o `scripts/deploy-ftp.sh`.

## Personalizar la marca

Todo el diseño vive en `src/styles/global.css`, bloque `@theme`. Cambiá los valores de `--color-brand-*`, las fuentes y los radios. No hace falta tocar los componentes.
