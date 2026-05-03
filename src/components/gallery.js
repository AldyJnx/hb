// Galería de momentos: crea polaroids con placeholders o imágenes reales

import { animate } from 'popmotion'

// ─── Configurar fotos aquí ───────────────────────────────────────────────────
// Para añadir fotos reales, coloca imágenes en src/assets/images/
// y reemplaza los objetos `src: null` con `src: './assets/images/foto1.jpg'`
// El campo `caption` es el texto manuscrito bajo cada foto.
const PHOTOS = [
  { src: null, caption: 'fotos que habría si me mandaras ush' },
  { src: null, caption: 'fotos que habría si me mandaras ush' },
  { src: null, caption: 'fotos que habría si me mandaras ush' },
  { src: null, caption: 'fotos que habría si me mandaras ush' },
  { src: null, caption: 'fotos que habría si me mandaras ush' },
  { src: null, caption: 'fotos que habría si me mandaras ush' },
]
// ─────────────────────────────────────────────────────────────────────────────

const PLACEHOLDER_SVG = `
<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="10" width="32" height="28" rx="3" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="18" cy="22" r="4" stroke="currentColor" stroke-width="1.5"/>
  <path d="M8,34 L16,26 L22,32 L30,22 L40,34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

export function init() {
  const grid = document.querySelector('.gallery-grid')
  if (!grid) return

  PHOTOS.forEach((photo, i) => {
    const card = document.createElement('div')
    card.className = 'polaroid'
    card.setAttribute('role', 'figure')
    card.setAttribute('aria-label', photo.caption || `Foto ${i + 1}`)

    const imgWrap = document.createElement('div')
    imgWrap.className = 'polaroid-img'

    if (photo.src) {
      const img = document.createElement('img')
      img.src = photo.src
      img.alt = photo.caption || `Recuerdo ${i + 1}`
      img.loading = 'lazy'
      imgWrap.appendChild(img)
    } else {
      const placeholder = document.createElement('div')
      placeholder.className = 'polaroid-placeholder'
      placeholder.innerHTML = `${PLACEHOLDER_SVG}<span>${photo.caption}</span>`
      imgWrap.appendChild(placeholder)
    }

    card.appendChild(imgWrap)

    // Caption debajo del polaroid
    const caption = document.createElement('p')
    caption.className = 'polaroid-caption'
    caption.textContent = photo.src ? photo.caption : 'ush'
    card.appendChild(caption)

    grid.appendChild(card)
  })
}
