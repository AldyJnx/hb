// Hello Kitty fiel a la original: acompaña el scroll, reacciona a cada sección.
// Al llegar al footer revela un corazón con la letra A en forma de triángulo.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── SVG: Hello Kitty ────────────────────────────────────────────────────────
// Fiel a la original: lazo rojo en su oreja izquierda (derecha del viewer),
// ojos ovalados separados, nariz amarilla, bigotes, sin boca (icónico).

const KITTY_SVG = `
<svg id="kitty-svg" viewBox="0 0 100 132" fill="none"
     xmlns="http://www.w3.org/2000/svg" style="overflow:visible">

  <!-- Sombra suave -->
  <ellipse cx="50" cy="129" rx="16" ry="3.5" fill="rgba(42,30,37,0.07)"/>

  <!-- ══ CUERPO / VESTIDO ══ -->
  <g id="k-body">
    <!-- Cuerpo principal -->
    <rect x="29" y="88" width="42" height="36" rx="13"
          fill="white" stroke="#E2D0D5" stroke-width="1.3"/>
    <!-- Cuello/escote en V -->
    <path d="M41,91 L50,98 L59,91"
          stroke="#F4B6C2" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <!-- Botón central -->
    <circle cx="50" cy="106" r="2.2" fill="#F4B6C2" opacity="0.6"/>
    <!-- Zapatillas negras -->
    <ellipse cx="39" cy="122" rx="8.5" ry="4.8" fill="#1A1118"/>
    <ellipse cx="61" cy="122" rx="8.5" ry="4.8" fill="#1A1118"/>
    <!-- Brillo de zapatos -->
    <ellipse cx="39" cy="120.5" rx="4.5" ry="1.8" fill="white" opacity="0.28"/>
    <ellipse cx="61" cy="120.5" rx="4.5" ry="1.8" fill="white" opacity="0.28"/>
  </g>

  <!-- ══ BRAZO IZQUIERDO (viewer izq) ══ -->
  <g id="k-arm-l">
    <ellipse cx="21" cy="101" rx="10.5" ry="6.5"
             fill="white" stroke="#E2D0D5" stroke-width="1.3"
             transform="rotate(-22,21,101)"/>
    <circle cx="13" cy="105" r="5.5"
            fill="white" stroke="#E2D0D5" stroke-width="1.3"/>
  </g>

  <!-- ══ BRAZO DERECHO (viewer der – el que saluda) ══ -->
  <g id="k-arm-r">
    <ellipse cx="79" cy="101" rx="10.5" ry="6.5"
             fill="white" stroke="#E2D0D5" stroke-width="1.3"
             transform="rotate(22,79,101)"/>
    <circle cx="87" cy="105" r="5.5"
            fill="white" stroke="#E2D0D5" stroke-width="1.3"/>
  </g>

  <!-- ══ CABEZA ══ -->
  <g id="k-head">

    <!-- Oreja izquierda (viewer) -->
    <ellipse cx="21" cy="19" rx="12" ry="14"
             fill="white" stroke="#E2D0D5" stroke-width="1.5"/>
    <ellipse cx="21" cy="21" rx="7"  ry="9"  fill="#FFB7C5"/>

    <!-- Oreja derecha (viewer) – donde va el lazo -->
    <ellipse cx="79" cy="19" rx="12" ry="14"
             fill="white" stroke="#E2D0D5" stroke-width="1.5"/>
    <ellipse cx="79" cy="21" rx="7"  ry="9"  fill="#FFB7C5"/>

    <!-- Cabeza: círculo blanco grande -->
    <circle cx="50" cy="50" r="37"
            fill="white" stroke="#E2D0D5" stroke-width="1.6"/>

    <!-- ══ LAZO ROJO en oreja izquierda de Kitty (derecha del viewer ≈ x=73) ══ -->
    <!-- Ala izquierda del lazo -->
    <path d="M73,13 C69,6 59,4 59,10 C59,17 68,18 73,13 Z" fill="#FF1744"/>
    <!-- Ala derecha del lazo -->
    <path d="M73,13 C77,6 87,4 87,10 C87,17 78,18 73,13 Z" fill="#FF1744"/>
    <!-- Nudo central del lazo -->
    <circle cx="73" cy="13" r="3.8" fill="#C62828"/>
    <!-- Punto dorado del nudo -->
    <circle cx="73" cy="13" r="1.6" fill="#FFD700"/>

    <!-- ══ OJOS: dos óvalos negros bien separados ══ -->
    <ellipse cx="37" cy="50" rx="4.8" ry="5.8" fill="#1A1118"/>
    <circle  cx="38.6" cy="47.2" r="1.9" fill="white"/>
    <ellipse cx="63" cy="50" rx="4.8" ry="5.8" fill="#1A1118"/>
    <circle  cx="64.6" cy="47.2" r="1.9" fill="white"/>

    <!-- ══ NARIZ: óvalo amarillo pequeño (sin boca – icónico) ══ -->
    <ellipse cx="50" cy="60.5" rx="3.6" ry="2.3" fill="#FFD700"/>

    <!-- ══ BIGOTES: 3 a cada lado ══ -->
    <line x1="8"  y1="53" x2="33" y2="57.5" stroke="#D4C4CA" stroke-width="1" stroke-linecap="round"/>
    <line x1="8"  y1="59" x2="33" y2="59.5" stroke="#D4C4CA" stroke-width="1" stroke-linecap="round"/>
    <line x1="8"  y1="65" x2="33" y2="62.5" stroke="#D4C4CA" stroke-width="1" stroke-linecap="round"/>
    <line x1="92" y1="53" x2="67" y2="57.5" stroke="#D4C4CA" stroke-width="1" stroke-linecap="round"/>
    <line x1="92" y1="59" x2="67" y2="59.5" stroke="#D4C4CA" stroke-width="1" stroke-linecap="round"/>
    <line x1="92" y1="65" x2="67" y2="62.5" stroke="#D4C4CA" stroke-width="1" stroke-linecap="round"/>

  </g>
</svg>`

// ─── SVG: Corazón con "A" triangular ─────────────────────────────────────────
// La A está trazada como triángulo de líneas blancas: dos piernas + travesaño.

const HEART_A_SVG = `
<svg id="heart-a-svg" viewBox="0 0 90 86" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <!-- Corazón -->
  <path d="M45,77 C22,61 5,44 5,27 C5,16 13,7 23,7 C33,7 45,20 45,20
           C45,20 57,7 67,7 C77,7 85,16 85,27 C85,44 68,61 45,77 Z"
        fill="#FF1744" opacity="0.93"/>
  <!-- Brillo sutil izquierdo arriba -->
  <path d="M25,13 C19,17 15,24 15,32"
        stroke="white" stroke-width="2.8" stroke-linecap="round" opacity="0.32"/>
  <!-- Letra A como triángulo de líneas blancas -->
  <g stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <!-- Pierna izquierda de la A -->
    <line x1="45" y1="23" x2="28" y2="60"/>
    <!-- Pierna derecha de la A -->
    <line x1="45" y1="23" x2="62" y2="60"/>
    <!-- Travesaño horizontal -->
    <line x1="32.5" y1="46" x2="57.5" y2="46"/>
  </g>
</svg>`

// ─── Estado de la máquina de animación ───────────────────────────────────────
let currentState  = ''
let stateTweens   = []

// Pivotes en coordenadas SVG (para gsap svgOrigin)
const O_ARM_R = '75 93'   // hombro brazo derecho (viewer)
const O_ARM_L = '25 93'   // hombro brazo izquierdo (viewer)
const O_HEAD  = '50 84'   // base cuello / cabeza

// ─── Init ─────────────────────────────────────────────────────────────────────
export function init() {
  const wrapper = document.createElement('div')
  wrapper.id = 'kitty-companion'
  wrapper.setAttribute('aria-hidden', 'true')
  wrapper.innerHTML = `
    <div class="kitty-heart-wrap" id="kitty-heart-wrap">${HEART_A_SVG}</div>
    <div class="kitty-svg-wrap"   id="kitty-svg-wrap"  >${KITTY_SVG}</div>
  `
  document.body.appendChild(wrapper)

  // Estado inicial del corazón (oculto)
  gsap.set('#kitty-heart-wrap', { opacity: 0, scale: 0, y: 16 })

  requestAnimationFrame(() => {
    startFloat()
    setState('hero')
    bindScrollStates()
  })
}

// ─── Float: siempre activo ────────────────────────────────────────────────────
function startFloat() {
  gsap.to('#kitty-svg-wrap', {
    y: -9,
    duration: 1.7,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  })
}

// ─── Máquina de estados ───────────────────────────────────────────────────────
function clearState() {
  stateTweens.forEach(t => t.kill())
  stateTweens = []
  // Reset suave de brazos y cabeza, manteniendo el svgOrigin correcto
  stateTweens.push(
    gsap.to('#k-arm-r', { rotate: 0, x: 0, y: 0, svgOrigin: O_ARM_R, duration: 0.32, ease: 'power2.out' }),
    gsap.to('#k-arm-l', { rotate: 0, x: 0, y: 0, svgOrigin: O_ARM_L, duration: 0.32, ease: 'power2.out' }),
    gsap.to('#k-head',  { rotate: 0, x: 0, y: 0, scale: 1, svgOrigin: O_HEAD,  duration: 0.32, ease: 'power2.out' }),
    gsap.to('#kitty-svg-wrap', { x: 0, duration: 0.32, ease: 'power2.out' }),
  )
}

function setState(name) {
  if (name === currentState) return
  currentState = name
  clearState()
  setTimeout(() => applyState(name), 340)
}

function applyState(name) {
  switch (name) {
    case 'hero':     stateHero();     break
    case 'timeline': stateTimeline(); break
    case 'gallery':  stateGallery();  break
    case 'messages': stateMessages(); break
    case 'wish':     stateWish();     break
    case 'footer':   stateFooter();   break
  }
}

// ─── Estados por sección ─────────────────────────────────────────────────────

function stateHero() {
  // Saluda con el brazo derecho
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 })
  tl.to('#k-arm-r', { rotate: -68, svgOrigin: O_ARM_R, duration: 0.42, ease: 'back.out(1.4)' })
    .to('#k-arm-r', { rotate: -28, svgOrigin: O_ARM_R, duration: 0.28, ease: 'power2.in' })
    .to('#k-arm-r', { rotate: -68, svgOrigin: O_ARM_R, duration: 0.28, ease: 'power2.out' })
    .to('#k-arm-r', { rotate:   0, svgOrigin: O_ARM_R, duration: 0.45, ease: 'back.out(1)' })
  stateTweens.push(tl)
}

function stateTimeline() {
  // Pensativa: mano al mentón, cabeza inclinada
  stateTweens.push(
    gsap.to('#k-arm-l', {
      rotate: -58, x: 11, y: -15,
      svgOrigin: O_ARM_L, duration: 0.7, ease: 'back.out(1.5)',
    }),
    gsap.to('#k-head', {
      rotate: 11, svgOrigin: O_HEAD, duration: 0.7, ease: 'back.out(1.3)',
    }),
    // Cabeza balancea lentamente
    gsap.to('#k-head', {
      rotate: 7, svgOrigin: O_HEAD,
      duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.8,
    }),
  )
}

function stateGallery() {
  // Curiosa: cabeza ladeada, ligero balanceo
  stateTweens.push(
    gsap.to('#k-head', {
      rotate: -13, svgOrigin: O_HEAD, duration: 0.6, ease: 'back.out(1.6)',
    }),
    gsap.to('#k-arm-r', {
      rotate: -15, svgOrigin: O_ARM_R, duration: 0.6, ease: 'back.out(1.2)',
    }),
    gsap.to('#kitty-svg-wrap', {
      x: 4, duration: 2.4, yoyo: true, repeat: -1, ease: 'sine.inOut',
    }),
  )
}

function stateMessages() {
  // Brazos abiertos, feliz, corazón con las manos
  stateTweens.push(
    gsap.to('#k-arm-l', {
      rotate: 50, svgOrigin: O_ARM_L, duration: 0.6, ease: 'back.out(2)',
    }),
    gsap.to('#k-arm-r', {
      rotate: -50, svgOrigin: O_ARM_R, duration: 0.6, ease: 'back.out(2)',
    }),
    // Pequeño bamboleo de la cabeza
    gsap.to('#k-head', {
      rotate: 6, svgOrigin: O_HEAD,
      duration: 1.6, yoyo: true, repeat: -1, ease: 'sine.inOut',
    }),
  )
}

function stateWish() {
  // Brazos en alto, emocionada, cabeza pulsa
  stateTweens.push(
    gsap.to('#k-arm-l', {
      rotate: 80, y: -12, svgOrigin: O_ARM_L, duration: 0.55, ease: 'back.out(2.2)',
    }),
    gsap.to('#k-arm-r', {
      rotate: -80, y: -12, svgOrigin: O_ARM_R, duration: 0.55, ease: 'back.out(2.2)',
    }),
    gsap.to('#k-head', {
      scale: 1.07, svgOrigin: '50 50',
      duration: 0.75, yoyo: true, repeat: -1, ease: 'sine.inOut',
    }),
  )
}

function stateFooter() {
  // Kitty sostiene el corazón con las dos manos en alto
  const t1 = gsap.to('#k-arm-l', {
    rotate: 70, y: -22, svgOrigin: O_ARM_L, duration: 0.85, ease: 'back.out(1.7)',
  })
  const t2 = gsap.to('#k-arm-r', {
    rotate: -70, y: -22, svgOrigin: O_ARM_R, duration: 0.85, ease: 'back.out(1.7)',
  })

  // Revelar el corazón con A
  const heartTl = gsap.timeline({ delay: 0.55 })
  heartTl
    .to('#kitty-heart-wrap', {
      opacity: 1, scale: 1, y: 0,
      duration: 0.75, ease: 'back.out(2)',
    })
    .to('#heart-a-svg', {
      scale: 1.09, duration: 0.85, yoyo: true, repeat: -1, ease: 'sine.inOut',
    }, '+=0.25')

  stateTweens.push(t1, t2, heartTl)
}

// ─── Bind de estados a las secciones con ScrollTrigger ────────────────────────
function bindScrollStates() {
  const sections = [
    { trigger: '#hero',     state: 'hero'     },
    { trigger: '#timeline', state: 'timeline' },
    { trigger: '#gallery',  state: 'gallery'  },
    { trigger: '#messages', state: 'messages' },
    { trigger: '#wish',     state: 'wish'     },
    { trigger: '#footer',   state: 'footer'   },
  ]

  sections.forEach(({ trigger, state }) => {
    ScrollTrigger.create({
      trigger,
      start:       'top 58%',
      onEnter:     () => setState(state),
      onEnterBack: () => setState(state),
    })
  })
}
