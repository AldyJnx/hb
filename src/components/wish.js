// Sección de deseo: pastel SVG con velas interactivas y efecto de apagado con humo

import anime from 'animejs/lib/anime.es.js'
import { animate } from 'popmotion'

const CANDLE_COUNT = 5

export function init({ wishText }) {
  buildCake()
  setWishText(wishText)
  bindCandleClicks()
}

function buildCake() {
  const container = document.getElementById('cake-container')
  if (!container) return

  container.innerHTML = buildCakeSVG()
}

function buildCakeSVG() {
  // Construir velas dinámicamente
  const candleSpacing = 40
  const startX = 100 - ((CANDLE_COUNT - 1) * candleSpacing) / 2
  const candlesHTML = Array.from({ length: CANDLE_COUNT }, (_, i) => {
    const cx = startX + i * candleSpacing
    const color = ['#F4B6C2', '#D4AF7F', '#FFE4E9', '#F9CDD6', '#EDD9B0'][i % 5]
    const flameColor = '#FFB347'
    const flameGlow = '#FF8C00'

    return `
      <g class="candle-group" data-candle="${i}" style="cursor:pointer" role="button"
         tabindex="0" aria-label="Vela ${i + 1}, haz clic para apagar">
        <!-- Mecha -->
        <line x1="${cx}" y1="72" x2="${cx}" y2="70" stroke="#8B7B82" stroke-width="1" stroke-linecap="round"/>
        <!-- Vela -->
        <rect x="${cx - 7}" y="72" width="14" height="32" rx="3" fill="${color}" stroke="none"/>
        <!-- Reflejo en la vela -->
        <rect x="${cx - 4}" y="75" width="3" height="22" rx="1.5" fill="white" opacity="0.35"/>
        <!-- Llama -->
        <g class="flame" data-candle="${i}">
          <ellipse class="candle-flame" cx="${cx}" cy="64" rx="5" ry="8"
            fill="${flameColor}" opacity="0.95" style="transform-origin:${cx}px 72px"/>
          <ellipse class="candle-flame" cx="${cx}" cy="66" rx="3" ry="5"
            fill="white" opacity="0.6" style="transform-origin:${cx}px 72px;animation-delay:-0.3s"/>
          <ellipse class="flame-glow" cx="${cx}" cy="64" rx="8" ry="10"
            fill="${flameGlow}" opacity="0.2" filter="url(#glow)"/>
        </g>
        <!-- Humo (oculto inicialmente) -->
        <g class="smoke" data-candle="${i}" style="display:none">
          <ellipse cx="${cx - 2}" cy="62" rx="2" ry="3" fill="#C4B4BA" opacity="0"/>
          <ellipse cx="${cx + 2}" cy="56" rx="2.5" ry="3.5" fill="#C4B4BA" opacity="0"/>
          <ellipse cx="${cx}" cy="50" rx="2" ry="3" fill="#C4B4BA" opacity="0"/>
        </g>
        <!-- Área táctil expandida (invisible, mínimo 44px para mobile) -->
        <rect x="${cx - 22}" y="48" width="44" height="60" fill="transparent"/>
      </g>`
  }).join('')

  return `
    <svg id="birthday-cake" viewBox="0 0 200 200" fill="none"
         xmlns="http://www.w3.org/2000/svg" style="overflow:visible" aria-label="Pastel de cumpleaños">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="cakeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFF9FA"/>
          <stop offset="100%" stop-color="#FFE4E9"/>
        </linearGradient>
        <linearGradient id="frostGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFF9FA"/>
          <stop offset="100%" stop-color="#F4B6C2"/>
        </linearGradient>
      </defs>

      ${candlesHTML}

      <!-- Base del pastel: capa inferior -->
      <rect x="20" y="138" width="160" height="44" rx="6" fill="#F4B6C2"/>
      <rect x="20" y="138" width="160" height="12" rx="4" fill="#FFF9FA" opacity="0.7"/>
      <!-- Decoración capa inferior -->
      <circle cx="50"  cy="158" r="4" fill="#D4AF7F" opacity="0.7"/>
      <circle cx="80"  cy="165" r="3" fill="#FFF9FA" opacity="0.6"/>
      <circle cx="110" cy="158" r="4" fill="#D4AF7F" opacity="0.7"/>
      <circle cx="140" cy="165" r="3" fill="#FFF9FA" opacity="0.6"/>
      <circle cx="160" cy="158" r="2.5" fill="#D4AF7F" opacity="0.6"/>

      <!-- Capa superior del pastel -->
      <rect x="35" y="104" width="130" height="38" rx="6" fill="url(#cakeGrad)"/>
      <rect x="35" y="104" width="130" height="12" rx="4" fill="url(#frostGrad)" opacity="0.8"/>
      <!-- Decoración capa superior -->
      <circle cx="65"  cy="122" r="3.5" fill="#F4B6C2" opacity="0.8"/>
      <circle cx="100" cy="128" r="2.5" fill="#D4AF7F" opacity="0.7"/>
      <circle cx="135" cy="122" r="3.5" fill="#F4B6C2" opacity="0.8"/>

      <!-- Plato -->
      <ellipse cx="100" cy="184" rx="95" ry="6" fill="#EDD9B0" opacity="0.4"/>
    </svg>`
}

function setWishText(text) {
  const el = document.querySelector('.wish-text')
  if (el) el.textContent = text
}

function bindCandleClicks() {
  let blownCount = 0

  // Esperar a que el DOM tenga el cake
  requestAnimationFrame(() => {
    const groups = document.querySelectorAll('.candle-group')

    groups.forEach(group => {
      const candle = parseInt(group.dataset.candle, 10)
      let blown = false

      const blow = () => {
        if (blown) return
        blown = true
        blownCount++

        const flame = document.querySelector(`.flame[data-candle="${candle}"]`)
        const smoke = document.querySelector(`.smoke[data-candle="${candle}"]`)

        // Apagar llama con anime.js
        if (flame) {
          anime({
            targets: flame,
            opacity: 0,
            scaleY: 0,
            duration: 300,
            easing: 'easeInQuad',
            complete: () => { flame.style.display = 'none' }
          })
        }

        // Mostrar humo con Popmotion
        if (smoke) {
          smoke.style.display = 'block'
          const smokePuffs = smoke.querySelectorAll('ellipse')

          smokePuffs.forEach((puff, idx) => {
            setTimeout(() => {
              const startY = parseFloat(puff.getAttribute('cy'))
              animate({
                from: { opacity: 0, y: 0 },
                to: { opacity: 0.5, y: -1 },
                duration: 200,
                onUpdate: v => {
                  puff.setAttribute('opacity', v.opacity)
                },
                onComplete: () => {
                  animate({
                    from: { opacity: 0.5, y: 0 },
                    to: { opacity: 0, y: -20 },
                    duration: 800,
                    onUpdate: v => {
                      puff.setAttribute('opacity', v.opacity)
                      puff.setAttribute('cy', startY + v.y)
                      puff.setAttribute('rx', 2 + Math.abs(v.y) * 0.1)
                    },
                    onComplete: () => { smoke.style.display = 'none' }
                  })
                }
              })
            }, idx * 150)
          })
        }

        // Cuando todas las velas están apagadas
        if (blownCount === CANDLE_COUNT) {
          setTimeout(showWish, 600)
        }

        group.setAttribute('aria-label', `Vela ${candle + 1}, apagada`)
        group.style.cursor = 'default'
      }

      // touchend evita el delay de 300ms del click en mobile
      group.addEventListener('touchend', e => { e.preventDefault(); blow() }, { passive: false })
      group.addEventListener('click', blow)
      group.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') blow()
      })
    })
  })
}

function showWish() {
  const wrap = document.getElementById('wish-reveal')
  if (!wrap) return
  wrap.classList.add('visible')

  // Añadir estrellas
  const stars = document.createElement('p')
  stars.className = 'wish-stars'
  stars.setAttribute('aria-hidden', 'true')
  stars.textContent = '✦  ✦  ✦'
  wrap.appendChild(stars)

  // Animación de entrada del texto
  anime({
    targets: wrap.querySelector('.wish-text'),
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    easing: 'easeOutExpo',
  })

  anime({
    targets: stars,
    opacity: [0, 1],
    scale: [0.5, 1],
    delay: 400,
    duration: 600,
    easing: 'spring(1, 80, 10, 0)',
  })
}
