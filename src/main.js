// Punto de entrada: configura las constantes personalizables e inicializa todos los módulos

import './styles/main.css'

// ─── PERSONALIZACIÓN ────────────────────────────────────────────────────────
// ← Cambia estos valores para personalizar la página
const BIRTHDAY_PERSON_NAME = 'Gracia'   // ← Nombre real de la persona
const BIRTHDAY_AGE         = 20         // ← Edad que cumple

const MESSAGES_ARRAY = [
  'Hay muchas cosas cursis que podria decirte pero te odio mucho <3',
  'Niña tontaaaaa',
  'Eres la prueba de porque deberiamos extinguirnos <3',
  'Logra todos tus metas tontitaaa',
]

const WISH_TEXT  = 'Que todas tus pesadillas se hagan realidad <3'
const SIGNATURE  = 'Con todo mi cariño aunque no peuda decirtelo facilmente en persona'        // ← Aparece como firma manuscrita
// ─────────────────────────────────────────────────────────────────────────────

// Componentes
import { init as initHero }      from './components/hero.js'
import { init as initTimeline }  from './components/timeline.js'
import { init as initGallery }   from './components/gallery.js'
import { init as initMessages }  from './components/messages-section.js'
import { init as initWish }      from './components/wish.js'
import { init as initFooter }    from './components/footer.js'
import { init as initKitty }     from './components/kitty-companion.js'

// Scripts de comportamiento
import { init as initIntro }         from './scripts/intro.js'
import { init as initScroll }        from './scripts/scroll.js'
import { init as initInteractions }  from './scripts/interactions.js'
import { init as initMessages2 }     from './scripts/messages.js'
import { init as initParticles }     from './scripts/particles.js'
import { init as initCursor }        from './scripts/cursor.js'

// ─── Bootstrap ───────────────────────────────────────────────────────────────

// 1. Cursor, partículas y companion
initCursor()
initParticles()
initKitty()

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
