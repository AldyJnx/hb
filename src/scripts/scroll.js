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
  // Header
  gsap.from('.gallery-title', {
    opacity: 0,
    y: isMobile ? 20 : 35,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.gallery-header', start: 'top 88%' }
  })

  gsap.from('.gallery-subtitle', {
    opacity: 0,
    y: isMobile ? 12 : 20,
    duration: 0.55,
    delay: 0.12,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.gallery-header', start: 'top 88%' }
  })

  // Cards con ScrollTrigger.batch para mejor rendimiento
  ScrollTrigger.batch('.polaroid', {
    onEnter: batch => {
      gsap.fromTo(batch,
        {
          opacity: 0,
          y: isMobile ? 30 : 50,
          scale: 0.95,
          rotate: (i) => (i % 2 === 0 ? -3 : 3),
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: (i) => {
            const base = [- 1.5, 1.2, -0.5, 1.8, -1.0, 0.8]
            return base[parseInt(batch[i]?.dataset?.index || i) % base.length] ?? -1.5
          },
          duration: isMobile ? 0.6 : 0.8,
          stagger: isMobile ? 0.08 : 0.12,
          ease: 'power3.out',
          overwrite: true,
        }
      )
    },
    start: 'top 90%',
    once: true,
  })
}

function initMessageReveals(isMobile) {
  const items = document.querySelectorAll('.message-item')
  if (!items.length) return

  items.forEach((item, i) => {
    const dir    = i % 2 === 0 ? 1 : -1
    const xDist  = isMobile ? 18 : 40

    gsap.fromTo(item,
      { opacity: 0, x: dir * xDist, filter: 'blur(3px)' },
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: isMobile ? 0.7 : 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
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

  tl.from('.footer-bow',       { opacity: 0, scale: 0.4, duration: 0.6, ease: 'back.out(2)' })
    .from('.footer-message',   { opacity: 0, y: 16, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    .to  ('.footer-signature', { opacity: 1, y: 0,  duration: 0.9, ease: 'power3.out' }, '-=0.1')
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
