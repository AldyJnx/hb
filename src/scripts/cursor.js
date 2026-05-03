// Cursor personalizado con silueta de lazo Hello Kitty y seguimiento suave con Popmotion

import { animate } from 'popmotion'

export function init() {
  const dot  = document.getElementById('cursor-dot')
  const ring = document.getElementById('cursor-ring')
  if (!dot || !ring) return

  // No mostrar en touch devices
  if (window.matchMedia('(hover: none)').matches) {
    dot.style.display  = 'none'
    ring.style.display = 'none'
    document.body.style.cursor = 'auto'
    return
  }

  let mouseX = window.innerWidth / 2
  let mouseY = window.innerHeight / 2
  let ringX  = mouseX
  let ringY  = mouseY
  let raf

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX
    mouseY = e.clientY
    // El dot sigue instantáneamente
    dot.style.left = mouseX + 'px'
    dot.style.top  = mouseY + 'px'
  })

  // El ring sigue con lerp suave
  function lerp(a, b, t) { return a + (b - a) * t }

  function loop() {
    ringX = lerp(ringX, mouseX, 0.12)
    ringY = lerp(ringY, mouseY, 0.12)
    ring.style.left = ringX + 'px'
    ring.style.top  = ringY + 'px'
    raf = requestAnimationFrame(loop)
  }
  loop()

  // Hover effect en elementos interactivos
  const interactables = 'a, button, [role="button"], .polaroid, .candle-group, label'

  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactables)) {
      ring.classList.add('hovering')
      dot.style.transform = 'translate(-50%, -50%) scale(1.8)'
      dot.style.background = 'var(--champagne)'
    }
  })

  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactables)) {
      ring.classList.remove('hovering')
      dot.style.transform = 'translate(-50%, -50%) scale(1)'
      dot.style.background = 'var(--ink)'
    }
  })

  // Click pulse en el dot
  document.addEventListener('mousedown', () => {
    animate({
      from: 1,
      to: 0.6,
      duration: 100,
      onUpdate: s => {
        dot.style.transform = `translate(-50%, -50%) scale(${s})`
      },
      onComplete: () => {
        animate({
          from: 0.6,
          to: 1,
          duration: 200,
          onUpdate: s => {
            dot.style.transform = `translate(-50%, -50%) scale(${s})`
          }
        })
      }
    })
  })

  // Ocultar cursor al salir de la ventana
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0'
    ring.style.opacity = '0'
  })

  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1'
    ring.style.opacity = '1'
  })
}
