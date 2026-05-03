// Micro-interacciones con física natural usando Popmotion springs en hover y drag

import { animate } from 'popmotion'

export function init() {
  initPolaroidHover()
  initButtonHover()
  initScrollArrow()
}

function springTo({ el, prop, from, to, stiffness = 400, damping = 28, mass = 1 }) {
  return animate({
    from,
    to,
    type: 'spring',
    stiffness,
    damping,
    mass,
    onUpdate: v => {
      if (prop === 'scale') {
        el.style.transform = `scale(${v}) rotate(${el.dataset.baseRotate || '0'}deg)`
      } else if (prop === 'y') {
        el.style.transform = `translateY(${v}px)`
      }
    }
  })
}

function initPolaroidHover() {
  const cards = document.querySelectorAll('.polaroid')

  cards.forEach(card => {
    // Guardar la rotación base del CSS
    const style  = window.getComputedStyle(card)
    const matrix = new DOMMatrix(style.transform)
    const baseRot = Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI))
    card.dataset.baseRotate = baseRot

    let currentScale = 1

    const applySpring = (to) => {
      animate({
        from: currentScale,
        to,
        type: 'spring',
        stiffness: 350,
        damping: 25,
        mass: 0.8,
        onUpdate: v => {
          currentScale = v
          card.style.transform = `scale(${v}) rotate(${baseRot}deg)`
          card.style.zIndex    = v > 1 ? '10' : ''
          card.style.boxShadow = v > 1
            ? `6px 6px 2px rgba(42,30,37,0.12), 0 16px 40px rgba(42,30,37,0.18)`
            : ''
        }
      })
    }

    card.addEventListener('mouseenter', () => applySpring(1.06))
    card.addEventListener('mouseleave', () => applySpring(1.0))

    // Tilt 3D suave con el movimiento del mouse
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width  / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)

      card.style.transform = `scale(${currentScale}) rotate(${baseRot}deg) perspective(600px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg)`
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = ''
    })
  })
}

function initButtonHover() {
  const btns = document.querySelectorAll('button, a, [role="button"]')

  btns.forEach(btn => {
    let scaleAnim

    btn.addEventListener('mouseenter', () => {
      if (scaleAnim) scaleAnim.stop()
      scaleAnim = animate({
        from: 1,
        to: 1.04,
        type: 'spring',
        stiffness: 500,
        damping: 30,
        onUpdate: v => {
          btn.style.transform = `scale(${v})`
        }
      })
    })

    btn.addEventListener('mouseleave', () => {
      if (scaleAnim) scaleAnim.stop()
      scaleAnim = animate({
        from: 1.04,
        to: 1,
        type: 'spring',
        stiffness: 400,
        damping: 25,
        onUpdate: v => {
          btn.style.transform = `scale(${v})`
        }
      })
    })
  })
}

function initScrollArrow() {
  const indicator = document.querySelector('.scroll-indicator')
  if (!indicator) return

  let y = 0
  let dir = 1
  let raf

  function bounce() {
    animate({
      from: 0,
      to: 8,
      type: 'spring',
      stiffness: 200,
      damping: 12,
      onUpdate: v => {
        indicator.style.transform = `translateX(-50%) translateY(${v}px)`
      },
      onComplete: () => {
        animate({
          from: 8,
          to: 0,
          type: 'spring',
          stiffness: 200,
          damping: 16,
          onUpdate: v => {
            indicator.style.transform = `translateX(-50%) translateY(${v}px)`
          },
          onComplete: bounce
        })
      }
    })
  }

  bounce()

  // Ocultar al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      indicator.style.opacity = '0'
    }
  }, { passive: true })
}
