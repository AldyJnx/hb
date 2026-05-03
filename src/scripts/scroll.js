// GSAP ScrollTrigger: parallax, reveals y timeline. Optimizado para mobile e iOS.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function init() {
  // Prevenir acumulación de frames perdidos (suaviza en hardware lento)
  gsap.ticker.lagSmoothing(0)

  // Evitar re-render al aparecer el teclado virtual en iOS/Android
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  })

  const isMobile = window.innerWidth < 640

  initTimeline()
  initGalleryReveal(isMobile)
  initMessageReveals(isMobile)
  initFooter()
  initDividers()

  // Refresh tras carga completa (fuentes, imágenes)
  window.addEventListener('load', () => {
    ScrollTrigger.refresh()
  })

  // Refresh al orientar el dispositivo
  window.addEventListener('orientationchange', () => {
    setTimeout(() => ScrollTrigger.refresh(), 300)
  })
}

function initTimeline() {
  const section = document.querySelector('.section-timeline')
  const counter = document.getElementById('timeline-counter')
  const msgs    = document.querySelectorAll('.timeline-msg')
  if (!section || !counter) return

  const endAge = parseInt(counter.dataset.age || '0', 10)

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    invalidateOnRefresh: true,
    onUpdate: self => {
      const p = self.progress

      // Número que sube de 0 a endAge con ease suave
      const eased = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p
      counter.textContent = Math.round(eased * endAge)

      // Mensaje activo según tramo
      const idx = Math.min(Math.floor(p * msgs.length), msgs.length - 1)
      msgs.forEach((m, i) => m.classList.toggle('active', i === idx))
    }
  })

  // Parallax decorativo solo en desktop
  if (window.innerWidth >= 1024) {
    gsap.to('.timeline-deco', {
      yPercent: -18,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true,
      }
    })
  }
}

function initGalleryReveal(isMobile) {
  // Header: blur + slide con spring suave
  gsap.from('.gallery-title', {
    opacity: 0,
    y: isMobile ? 18 : 32,
    filter: 'blur(4px)',
    duration: 0.75,
    ease: 'power4.out',
    scrollTrigger: { trigger: '.gallery-header', start: 'top 88%' }
  })

  gsap.from('.gallery-subtitle', {
    opacity: 0,
    y: isMobile ? 10 : 18,
    duration: 0.6,
    delay: 0.14,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.gallery-header', start: 'top 88%' }
  })

  // Cards: cada polaroid entra diferente (no todos igual)
  const rotBases  = [-1.5, 1.2, -0.5, 1.8, -1.0, 0.8]
  const fromDirs  = [
    { x: -30, y: 40 }, { x: 0, y: 55 }, { x: 30, y: 35 },
    { x: -20, y: 50 }, { x: 25, y: 30 }, { x: 0, y: 48 },
  ]
  const durations = [0.72, 0.85, 0.68, 0.80, 0.75, 0.90]

  ScrollTrigger.batch('.polaroid', {
    onEnter: batch => {
      batch.forEach((card, i) => {
        const from = fromDirs[i % fromDirs.length]
        gsap.fromTo(card,
          { opacity: 0, x: isMobile ? 0 : from.x, y: isMobile ? 28 : from.y, scale: 0.92 },
          {
            opacity: 1,
            x: 0, y: 0,
            scale: 1,
            rotate: rotBases[i % rotBases.length],
            duration: isMobile ? 0.6 : durations[i % durations.length],
            delay: i * (isMobile ? 0.07 : 0.09),
            ease: 'back.out(1.15)',
            overwrite: true,
          }
        )
      })
    },
    start: 'top 90%',
    once: true,
  })
}

function initMessageReveals(isMobile) {
  const items = document.querySelectorAll('.message-item')
  if (!items.length) return

  // Variaciones de entrada para que no parezcan roboticas
  const configs = [
    { x: -35, y: 0   },
    { x: 28,  y: 15  },
    { x: -20, y: 0   },
    { x: 30,  y: 10  },
  ]

  items.forEach((item, i) => {
    const cfg   = isMobile ? { x: 0, y: 20 } : configs[i % configs.length]
    const delay = i * 0.04

    gsap.fromTo(item,
      { opacity: 0, x: cfg.x, y: cfg.y, filter: 'blur(3px)', scale: 0.97 },
      {
        opacity: 1,
        x: 0, y: 0,
        filter: 'blur(0px)',
        scale: 1,
        duration: isMobile ? 0.65 : 0.9,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 86%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        }
      }
    )
  })
}

function initFooter() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-footer',
      start: 'top 82%',
      once: true,
    }
  })

  tl.from('.footer-bow',     { opacity: 0, scale: 0.3, rotation: -15, duration: 0.7,  ease: 'back.out(2.2)' })
    .from('.footer-message', { opacity: 0, y: 14,  letterSpacing: '0.35em', duration: 0.55, ease: 'power3.out' }, '-=0.2')
    .to  ('.footer-signature', {
      opacity: 1, y: 0,
      duration: 1.1,
      ease: 'power4.out',
    }, '-=0.15')
    .from('.footer-hearts span', {
      opacity: 0, scale: 0, stagger: 0.12,
      duration: 0.5, ease: 'back.out(2)',
    }, '-=0.4')
}

function initDividers() {
  document.querySelectorAll('.section-divider').forEach(divider => {
    gsap.from(divider, {
      opacity: 0,
      scale: 0.75,
      duration: 0.55,
      ease: 'back.out(1.8)',
      scrollTrigger: {
        trigger: divider,
        start: 'top 92%',
        once: true,
      }
    })
  })
}
