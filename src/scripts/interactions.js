// Micro-interacciones con Popmotion: springs en hover (desktop) y tap (mobile)

import { animate } from 'popmotion'

const isTouch = window.matchMedia('(hover: none)').matches

export function init() {
  initPolaroidInteractions()
  if (!isTouch) initButtonHover()
  initScrollArrow()
}

// ─── Galería: hover en desktop, tap-flash en mobile ───────────────────────────

function initPolaroidInteractions() {
  const cards = document.querySelectorAll('.polaroid')

  cards.forEach(card => {
    // Leer rotación base aplicada por CSS
    const style    = window.getComputedStyle(card)
    const matrix   = new DOMMatrix(style.transform)
    const baseRot  = Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI))
    card.dataset.baseRotate = baseRot

    if (isTouch) {
      // Mobile: flash de escala en tap
      card.addEventListener('touchstart', () => springFlash(card, baseRot), { passive: true })
    } else {
      // Desktop: hover con spring + tilt 3D
      let currentScale = 1
      let scaleAnim

      const applySpring = to => {
        if (scaleAnim) scaleAnim.stop()
        scaleAnim = animate({
          from: currentScale,
          to,
          type: 'spring',
          stiffness: 320,
          damping: 22,
          mass: 0.8,
          onUpdate: v => {
            currentScale = v
            card.style.transform = `scale(${v}) rotate(${baseRot}deg)`
            card.style.zIndex    = v > 1 ? '10' : ''
            card.style.boxShadow = v > 1
              ? '6px 8px 0 rgba(42,30,37,0.10), 0 20px 40px rgba(42,30,37,0.16)'
              : ''
          }
        })
      }

      card.addEventListener('mouseenter', () => applySpring(1.055))
      card.addEventListener('mouseleave', () => {
        applySpring(1)
        card.style.transform = ''
      })

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width  / 2
        const cy = rect.top  + rect.height / 2
        const dx = (e.clientX - cx) / (rect.width  / 2)
        const dy = (e.clientY - cy) / (rect.height / 2)
        card.style.transform = `scale(${currentScale}) rotate(${baseRot}deg) perspective(700px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg)`
      })
    }
  })
}

function springFlash(el, baseRot) {
  animate({
    from: 1,
    to: 1.05,
    type: 'spring',
    stiffness: 450,
    damping: 20,
    mass: 0.7,
    onUpdate: v => {
      el.style.transform = `scale(${v}) rotate(${baseRot}deg)`
    },
    onComplete: () => {
      animate({
        from: 1.05,
        to: 1,
        type: 'spring',
        stiffness: 350,
        damping: 28,
        onUpdate: v => {
          el.style.transform = `scale(${v}) rotate(${baseRot}deg)`
        }
      })
    }
  })
}

// ─── Botones: hover con spring (solo desktop) ────────────────────────────────

function initButtonHover() {
  document.querySelectorAll('[role="button"]:not(.candle-group)').forEach(btn => {
    let anim

    btn.addEventListener('mouseenter', () => {
      if (anim) anim.stop()
      anim = animate({
        from: 1,
        to: 1.04,
        type: 'spring',
        stiffness: 500,
        damping: 28,
        onUpdate: v => { btn.style.transform = `scale(${v})` }
      })
    })

    btn.addEventListener('mouseleave', () => {
      if (anim) anim.stop()
      anim = animate({
        from: 1.04,
        to: 1,
        type: 'spring',
        stiffness: 400,
        damping: 26,
        onUpdate: v => { btn.style.transform = `scale(${v})` }
      })
    })
  })
}

// ─── Indicador de scroll: bounce suave ───────────────────────────────────────

function initScrollArrow() {
  const indicator = document.querySelector('.scroll-indicator')
  if (!indicator) return

  let active = true

  function bounce() {
    if (!active) return
    animate({
      from: 0,
      to: 7,
      type: 'spring',
      stiffness: 180,
      damping: 10,
      onUpdate: v => {
        indicator.style.transform = `translateX(-50%) translateY(${v}px)`
      },
      onComplete: () => {
        if (!active) return
        animate({
          from: 7,
          to: 0,
          type: 'spring',
          stiffness: 200,
          damping: 18,
          onUpdate: v => {
            indicator.style.transform = `translateX(-50%) translateY(${v}px)`
          },
          onComplete: () => setTimeout(bounce, 400)
        })
      }
    })
  }

  bounce()

  // Fade al hacer scroll
  const onScroll = () => {
    if (window.scrollY > 80) {
      active = false
      indicator.style.transition = 'opacity 0.4s ease'
      indicator.style.opacity = '0'
      window.removeEventListener('scroll', onScroll)
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
}
