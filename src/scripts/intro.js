// Pantalla de intro: animación del lazo con path drawing y fade out al cargar

import anime from 'animejs/lib/anime.es.js'

export function init() {
  const overlay = document.getElementById('intro-overlay')
  if (!overlay) return

  // Inyectar SVG animado en el intro
  overlay.querySelector('.intro-bow').innerHTML = `
    <svg viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg"
         style="width:120px;color:var(--rose-deep)">
      <path class="bow-path-l"
        d="M60,36 C54,22 22,8 10,18 C2,25 8,44 60,36 Z"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        fill="none"/>
      <path class="bow-path-r"
        d="M60,36 C66,22 98,8 110,18 C118,25 112,44 60,36 Z"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        fill="none"/>
      <circle class="bow-knot"
        cx="60" cy="36" r="6"
        stroke="currentColor" stroke-width="2" fill="none"/>
      <path class="bow-tail-l" d="M55,40 C50,52 42,58 46,64"
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <path class="bow-tail-r" d="M65,40 C70,52 78,58 74,64"
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
    <p style="font-family:var(--font-body);font-size:0.65rem;letter-spacing:0.2em;
              text-transform:uppercase;color:var(--whisper);margin-top:1.5rem;">
      Un momento especial
    </p>`

  // Preparar paths para stroke-dashoffset
  const paths = overlay.querySelectorAll('path, circle')
  paths.forEach(el => {
    const len = el.getTotalLength ? el.getTotalLength() : 200
    el.style.strokeDasharray  = len
    el.style.strokeDashoffset = len
  })

  // Timeline: dibujar lazo → esperar → fade out overlay
  const tl = anime.timeline({ easing: 'easeInOutQuad' })

  tl.add({
    targets: overlay.querySelectorAll('path, circle'),
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 1200,
    delay: anime.stagger(150),
    easing: 'easeInOutSine',
  })
  .add({
    targets: overlay,
    opacity: [1, 0],
    duration: 700,
    easing: 'easeInQuad',
    complete: () => {
      overlay.style.display   = 'none'
      overlay.style.pointerEvents = 'none'
    }
  }, '+=400')
}
