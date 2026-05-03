// Sección hero: nombre letra a letra, typewriter, lazo SVG animado y edad

import anime from 'animejs/lib/anime.es.js'

const BOW_SVG = `
<svg viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg"
     style="width:110px;color:var(--rose-deep)" class="svg-draw" aria-hidden="true">
  <path d="M60,36 C54,22 22,8 10,18 C2,25 8,44 60,36 Z"
    stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M60,36 C66,22 98,8 110,18 C118,25 112,44 60,36 Z"
    stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="60" cy="36" r="6"
    stroke="currentColor" stroke-width="1.8" fill="none"/>
  <path d="M55,40 C50,52 42,58 46,64"
    stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
  <path d="M65,40 C70,52 78,58 74,64"
    stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
</svg>`

export function init({ name, age }) {
  buildDOM(name, age)

  // Esperar que el intro termine antes de animar el hero
  // El intro dura ~2300ms total
  setTimeout(() => {
    animateBow()
    animateName(name)
    animateSubtitle()
    animateAge(age)
    animateScrollIndicator()
  }, 2400)
}

function buildDOM(name, age) {
  // Lazo en la parte superior
  const bowTop = document.querySelector('.hero-bow-top')
  if (bowTop) bowTop.innerHTML = BOW_SVG

  // Nombre dividido en spans por letra
  const nameEl = document.querySelector('.hero-name')
  if (nameEl) {
    nameEl.setAttribute('aria-label', name)
    nameEl.innerHTML = name
      .split('')
      .map(ch => ch === ' '
        ? `<span class="letter" style="display:inline-block;width:0.35em"> </span>`
        : `<span class="letter">${ch}</span>`)
      .join('')
  }

  // Edad
  const ageEl = document.querySelector('.hero-age .age-number')
  if (ageEl) ageEl.textContent = `${age} años`

  // Footer: signature (acceso directo para no duplicar lógica)
  // Se gestiona en footer.js
}

function animateBow() {
  const paths = document.querySelectorAll('.hero-bow-top path, .hero-bow-top circle')
  paths.forEach(el => {
    const len = el.getTotalLength ? el.getTotalLength() : 200
    el.style.strokeDasharray  = len
    el.style.strokeDashoffset = len
  })

  anime({
    targets: '.hero-bow-top path, .hero-bow-top circle',
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 1000,
    delay: anime.stagger(120),
    easing: 'easeInOutSine',
  })
}

function animateName(name) {
  anime({
    targets: '.hero-name .letter',
    opacity:      [0, 1],
    translateY:   [20, 0],
    filter:       ['blur(8px)', 'blur(0px)'],
    duration:     700,
    delay:        anime.stagger(60, { start: 200 }),
    easing:       'easeOutExpo',
  })
}

function animateSubtitle() {
  const subtitleText = 'Feliz Cumpleaños'
  const el = document.querySelector('.subtitle-text')
  if (!el) return

  el.textContent = ''
  const cursor = document.createElement('span')
  cursor.className = 'cursor-blink'
  el.appendChild(cursor)

  let i = 0
  const delay = 1200 // empieza después del nombre

  setTimeout(() => {
    const interval = setInterval(() => {
      if (i < subtitleText.length) {
        el.insertBefore(document.createTextNode(subtitleText[i]), cursor)
        i++
      } else {
        clearInterval(interval)
        // Cursor desaparece tras 2s
        setTimeout(() => {
          anime({
            targets: cursor,
            opacity: 0,
            duration: 400,
            complete: () => cursor.remove()
          })
        }, 2000)
      }
    }, 70)
  }, delay)
}

function animateAge(age) {
  const ageEl = document.querySelector('.hero-age')
  if (!ageEl) return

  setTimeout(() => {
    anime({
      targets: ageEl,
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 600,
      easing: 'easeOutQuad',
    })
  }, 2500)
}

function animateScrollIndicator() {
  const indicator = document.querySelector('.scroll-indicator')
  if (!indicator) return

  setTimeout(() => {
    anime({
      targets: indicator,
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 500,
      easing: 'easeOutQuad',
    })
  }, 3000)
}
