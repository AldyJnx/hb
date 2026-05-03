// Inicializa GSAP ScrollTrigger para parallax, pins y reveals de secciones

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function init() {
  // ─── Timeline: números que cuentan ───
  initTimeline()

  // ─── Galería: reveal en cascada ───
  initGalleryReveal()

  // ─── Mensajes: fade+slide individuales ───
  initMessageReveals()

  // ─── Footer: entrada de la firma ───
  initFooter()

  // ─── Divisores de sección ───
  initDividers()
}

function initTimeline() {
  const section = document.querySelector('.section-timeline')
  const counter = document.getElementById('timeline-counter')
  const msgs    = document.querySelectorAll('.timeline-msg')
  if (!section || !counter) return

  const endAge = parseInt(counter.dataset.age || '0', 10)

  // Pin de la sección sticky (GSAP refuerza el native sticky)
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    pin: false, // el sticky lo maneja CSS
    onUpdate: self => {
      const progress = self.progress

      // Número que sube de 0 a endAge
      const val = Math.round(progress * endAge)
      counter.textContent = val

      // Cambiar mensaje según tramos
      const msgIndex = Math.min(Math.floor(progress * msgs.length), msgs.length - 1)
      msgs.forEach((m, i) => {
        m.classList.toggle('active', i === msgIndex)
      })
    }
  })

  // Parallax en los elementos decorativos del timeline
  gsap.to('.timeline-deco', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  })
}

function initGalleryReveal() {
  const cards = document.querySelectorAll('.polaroid')
  if (!cards.length) return

  gsap.fromTo(cards,
    { opacity: 0, y: 50, rotate: (i) => (i % 2 === 0 ? -3 : 3) },
    {
      opacity: 1,
      y: 0,
      rotate: (i) => (i % 2 === 0 ? -1.5 : 1.2),
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    }
  )

  // Header de la galería
  gsap.from('.gallery-title', {
    opacity: 0,
    y: 30,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.gallery-header',
      start: 'top 85%',
    }
  })

  gsap.from('.gallery-subtitle', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.gallery-header',
      start: 'top 85%',
    }
  })
}

function initMessageReveals() {
  const items = document.querySelectorAll('.message-item')
  if (!items.length) return

  items.forEach((item, i) => {
    const direction = i % 2 === 0 ? 1 : -1

    gsap.fromTo(item,
      {
        opacity: 0,
        x: direction * 40,
        filter: 'blur(4px)',
      },
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    )
  })
}

function initFooter() {
  gsap.to('.footer-signature', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.section-footer',
      start: 'top 80%',
    }
  })

  gsap.from('.footer-message', {
    opacity: 0,
    y: 20,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.section-footer',
      start: 'top 85%',
    }
  })

  gsap.from('.footer-bow', {
    opacity: 0,
    scale: 0.5,
    duration: 0.8,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.section-footer',
      start: 'top 85%',
    }
  })
}

function initDividers() {
  document.querySelectorAll('.section-divider').forEach(divider => {
    gsap.from(divider, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: divider,
        start: 'top 90%',
      }
    })
  })
}
