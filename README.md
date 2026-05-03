# Birthday Page 🎂

Landing page single-page de cumpleaños con storytelling animado por scroll y estética Hello Kitty sutil y elegante. Construida con Vite, anime.js, GSAP + ScrollTrigger y Popmotion.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

## Build de producción

```bash
npm run build
```

La carpeta `dist/` contiene el sitio listo para desplegar.

## Personalización

Abre **`src/main.js`** y edita las constantes al inicio del archivo:

```js
const BIRTHDAY_PERSON_NAME = 'Nombre'   // ← Nombre de la persona
const BIRTHDAY_AGE         = 25         // ← Edad que cumple

const MESSAGES_ARRAY = [
  'Cada día contigo es un regalo.',
  // ... añade o edita los mensajes
]

const WISH_TEXT  = 'Que todos tus deseos se hagan realidad.'
const SIGNATURE  = 'Con todo mi cariño'
```

### Añadir fotos a la galería

1. Coloca las imágenes en `src/assets/images/` (JPG, PNG o WebP).
2. Abre `src/components/gallery.js`.
3. Edita el array `PHOTOS`:

```js
const PHOTOS = [
  { src: './assets/images/foto1.jpg', caption: 'Un día especial' },
  { src: './assets/images/foto2.jpg', caption: 'Siempre sonriendo' },
  // ... hasta 6 fotos
]
```

Deja `src: null` para mantener el placeholder cuando no tengas foto.

## Deploy en Netlify

### Opción A — Drag & Drop (más rápida)

1. Ejecuta `npm run build`
2. Arrastra la carpeta `dist/` a [app.netlify.com/drop](https://app.netlify.com/drop)

### Opción B — Con CI/CD desde GitHub

1. Sube el repositorio a GitHub.
2. Entra a [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**.
3. Selecciona tu repositorio.
4. Netlify detectará automáticamente el `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Haz clic en **Deploy site**.

Cada `git push` a la rama principal desplegará automáticamente.

## Estructura del proyecto

```
birthday-page/
├── index.html           # HTML principal con todas las secciones
├── package.json
├── vite.config.js
├── netlify.toml
├── public/
│   └── favicon.svg
└── src/
    ├── main.js          # ← EDITAR AQUÍ para personalizar
    ├── styles/          # CSS modular
    ├── scripts/         # Cursor, partículas, scroll, intro
    ├── components/      # Hero, timeline, galería, mensajes, pastel, footer
    └── assets/
        ├── svg/         # Lazos decorativos
        └── images/      # ← Coloca las fotos aquí
```
