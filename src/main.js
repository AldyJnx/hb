// Punto de entrada: configura las constantes personalizables e inicializa todos los módulos

import './styles/main.css'

// ─── PERSONALIZACIÓN ────────────────────────────────────────────────────────
// ← Cambia estos valores para personalizar la página
const BIRTHDAY_PERSON_NAME = 'Nombre'   // ← Nombre real de la persona
const BIRTHDAY_AGE         = 25         // ← Edad que cumple

const MESSAGES_ARRAY = [
  'Cada día contigo es un regalo.',
  'Tu sonrisa ilumina hasta el día más gris.',
  'Eres la prueba de que la magia existe.',
  'Que este año esté lleno de todos tus sueños.',
]

const WISH_TEXT  = 'Que todos tus deseos se hagan realidad.'
const SIGNATURE  = 'Con todo mi cariño'        // ← Aparece como firma manuscrita
// ─────────────────────────────────────────────────────────────────────────────

// Componentes
import { init as initHero }      from './components/hero.js'
import { init as initTimeline }  from './components/timeline.js'
import { init as initGallery }   from './components/gallery.js'
import { init as initMessages }  from './components/messages-section.js'
import { init as initWish }      from './components/wish.js'
import { init as initFooter }    from './components/footer.js'

// Scripts de comportamiento
import { init as initIntro }         from './scripts/intro.js'
import { init as initScroll }        from './scripts/scroll.js'
import { init as initInteractions }  from './scripts/interactions.js'
import { init as initMessages2 }     from './scripts/messages.js'
import { init as initParticles }     from './scripts/particles.js'
import { init as initCursor }        from './scripts/cursor.js'

// ─── Bootstrap ───────────────────────────────────────────────────────────────

// 1. Cursor y partículas: inmediato
initCursor()
initParticles()

// 2. Componentes de contenido: construyen el DOM antes de animar
initGallery()
initMessages({ messages: MESSAGES_ARRAY })
initWish({ wishText: WISH_TEXT })
initFooter({ signature: SIGNATURE })
initTimeline({ age: BIRTHDAY_AGE })

// 3. Intro overlay (empieza la animación del lazo)
initIntro()

// 4. Hero (espera al intro con delay interno)
initHero({ name: BIRTHDAY_PERSON_NAME, age: BIRTHDAY_AGE })

// 5. Scroll y micro-interacciones (después de que el DOM esté completo)
document.addEventListener('DOMContentLoaded', () => {
  initScroll()
  initInteractions()
  initMessages2()
})

// También inicializar scroll/interacciones si DOMContentLoaded ya pasó
if (document.readyState !== 'loading') {
  initScroll()
  initInteractions()
  initMessages2()
}

// ─── Accesibilidad: reducir movimiento ───────────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

if (prefersReducedMotion.matches) {
  // Eliminar intro overlay directamente
  const overlay = document.getElementById('intro-overlay')
  if (overlay) {
    overlay.style.display = 'none'
  }
}
