// Animaciones específicas de los mensajes: typewriter suave y quote marks decorativos

import anime from 'animejs/lib/anime.es.js'

export function init() {
  animateQuoteMarks()
}

function animateQuoteMarks() {
  // Los quote marks aparecen con un scale bounce cuando el mensaje llega al viewport
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return

      const quote = entry.target.querySelector('.message-quote-mark')
      const line  = entry.target.querySelector('.message-line')

      if (quote) {
        anime({
          targets: quote,
          scale: [0, 1],
          opacity: [0, 0.3],
          rotate: [-10, 0],
          duration: 600,
          easing: 'spring(1, 80, 10, 0)',
        })
      }

      if (line) {
        anime({
          targets: line,
          width: ['0px', '60px'],
          opacity: [0, 1],
          duration: 500,
          delay: 400,
          easing: 'easeOutQuad',
        })
      }

      observer.unobserve(entry.target)
    })
  }, { threshold: 0.3 })

  document.querySelectorAll('.message-item').forEach(el => observer.observe(el))
}
