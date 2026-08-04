# Exporteller

Clon **estático** de [exporteller.com](https://exporteller.com) (originalmente WordPress + Elementor), reconstruido con [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com). Sin CMS, sin base de datos, sin plugins ni parches de seguridad: solo archivos estáticos servidos desde un CDN.

- **Staging (GitHub Pages):** https://lutviadesigndev.github.io/exporteller/
- **Repo:** https://github.com/lutviadesigndev/exporteller
- **Origen clonado:** https://exporteller.com

El clon preserva **todo el contenido** del original (textos verbatim, incluidas sus expresiones y erratas). El diseño se reconstruyó limpio con HTML semántico + Tailwind, descartando el markup de Elementor; puede haber diferencias visuales/estructurales, pero **no de contenido**.

## Estructura

```
src/
├── styles/global.css     ← MANUAL DE MARCA: tokens de color, tipografía, radios, sombras
├── layouts/Base.astro    ← molde común (head + Header + Footer) de todas las páginas
├── components/
│   ├── Header.astro      ← nav compartido (desktop + menú hamburguesa mobile sin JS)
│   ├── Footer.astro      ← pie con contacto, links y año auto-actualizable
│   ├── Button.astro      ← CTA (variantes primary / secondary)
│   └── Section.astro     ← contenedor de ancho/padding consistente
└── pages/                ← una página = un archivo (routing automático)
    ├── index.astro       ← Home
    ├── support.astro     ← Support (formulario de contacto)
    ├── privacy.astro     ← Privacy Policy
    └── terms.astro       ← Terms and Conditions
public/
├── favicon.svg           ← favicon de marca (globo cian sobre navy)
└── img/                  ← logo, ilustraciones e íconos descargados del original
```

La consistencia sale de un solo lugar: editás `global.css` o un componente y el cambio se propaga a todo el sitio.

## Marca (reconstruida del original)

Todos los valores viven en `src/styles/global.css`, bloque `@theme`.

| Rol | Token | Valor |
|-----|-------|-------|
| Navy principal (texto, títulos, botón, footer) | `--color-ink` | `#262e33` |
| Texto de cuerpo | `--color-ink-soft` | `#6b6b73` |
| Cian de marca (banda del hero) | `--color-brand-500` | `#07ebf2` |
| Teal para texto/links sobre blanco (AA) | `--color-brand-700` | `#0b7378` |
| Amarillo (tiles de features, badge) | `--color-accent-yellow` | `#ffd957` |
| Coral decorativo / coral para texto (AA) | `--color-accent-coral` / `--color-accent-coral-ink` | `#ff5c72` / `#c62a45` |
| Tipografía | `--font-display` / `--font-body` | Poppins |

**Accesibilidad:** todo el texto cumple contraste **WCAG AA** (≥4.5:1 normal, ≥3:1 grande). Los tokens `*-700` / `*-ink` son las variantes seguras para texto sobre blanco; si agregás texto de color, usá esas.

## Comandos

```bash
npm install        # instalar dependencias (una vez)
npm run dev        # servidor local en http://localhost:4321/ (base '/', limpio)
npm run build      # build STAGING → ./dist con base /exporteller/ (GitHub Pages)
npm run build:prod # build PRODUCCIÓN → ./dist con base '/' (dominio propio, FTP)
npm run preview    # previsualizar el build de staging
```

El `base` se ajusta solo según el comando (ver [Deploy](#deploy) y `astro.config.mjs`),
así que **staging y producción conviven** sin editar el config.

## Editar contenido

- **Textos y secciones:** cada página en `src/pages/`. El Home arma features y pasos desde arrays al inicio del archivo.
- **Header / Footer / nav:** `src/components/`. El nav se define una vez y sirve a desktop y mobile.
- **Marca (colores, fuentes, radios):** `src/styles/global.css` → `@theme`. No hace falta tocar componentes.
- **Imágenes:** en `public/img/`. Se referencian con `` `${import.meta.env.BASE_URL}img/archivo.png` `` para que funcionen en local y bajo el subdirectorio de Pages.

### Formulario de Support

Un sitio estático no procesa formularios server-side, así que el de `support.astro` envía a **[FormSubmit](https://formsubmit.co)** (sin backend ni registro), apuntando a `hello@exporteller.com`. La **primera** vez que llega un envío, FormSubmit manda un mail de confirmación para activar el endpoint. Para cambiar de servicio (Formspree, Basin, etc.), editá `formAction` en `support.astro`.

## Deploy

### Staging — GitHub Pages (automático)

Cada push a `main` dispara `.github/workflows/deploy.yml` y republica https://lutviadesigndev.github.io/exporteller/. Pages está configurado con Source = "GitHub Actions".

### Producción — FTP al hosting existente (reemplazar el WordPress)

El sitio va en la **raíz del dominio**, no en el subdirectorio de Pages, por eso el build de producción usa `base: '/'`. Ya está separado del de staging, así que no hay que tocar `astro.config.mjs`:

1. **Manual:** `npm run build:prod` y subí el **contenido** de `./dist` al web root del hosting (`public_html/` o equivalente).
2. **Automático:** renombrar `.github/workflows/deploy-ftp.yml.disabled` → `deploy-ftp.yml` y cargar los secrets del repo: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`. Ajustar `server-dir` (ej: `public_html/`). El workflow ya buildea con base `/` (`build:prod`). Alternativa manual asistida: `scripts/deploy-ftp.sh` (requiere `lftp`).

> ⚠️ No subas el `dist` del `npm run build` normal a la raíz del dominio: tiene las rutas de Pages (`/exporteller/…`) y se rompe — usá `build:prod`. Y antes de sobrescribir el WordPress, hacé **backup** (archivos + base de datos) y probá primero en un subdominio o subcarpeta.

## Notas técnicas (decisiones del clon)

- **`base` según contexto** (`astro.config.mjs`): `/` en dev (localhost limpio), `/exporteller/` en el build de staging (subdirectorio de Pages) y `/` en `build:prod` (dominio propio). Como todo se arma con `${import.meta.env.BASE_URL}…`, se adapta solo. Requisito: el `base` **debe terminar en `/`**; sin la barra las rutas se pegan (`/exportellersupport`, `/exportellerfavicon.svg`) y se rompen.
- **Estilos base en `@layer base`** (`global.css`): en Tailwind v4 las utilidades viven en `@layer utilities`. Si las reglas de elemento (`h1..h4 { color }`) van **sin capa**, pisan a `text-white` y un título sobre fondo oscuro se vuelve ilegible. Por eso van dentro de `@layer base`.
- **Año del copyright auto-actualizable:** en un estático `new Date().getFullYear()` se congela en el build. El footer lo resuelve con un `<script is:inline>` que actualiza el año en el cliente en cada visita (con el año del build como fallback sin JS).
- **Menú mobile sin JS:** el hamburguesa usa `<details>`/`<summary>`, accesible por teclado y sin dependencias.

## Stack

Astro 5 · Tailwind CSS v4 (plugin de Vite) · GitHub Pages / FTP.
