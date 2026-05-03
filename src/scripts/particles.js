// Partículas flotantes en canvas: lazos, corazones, estrellas y puntos decorativos

export function init() {
  const canvas = document.getElementById('particles-canvas')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  let particles = []
  let animFrame

  const isMobile = window.innerWidth < 640
  const COUNT    = isMobile ? 28 : 50

  function resize() {
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
  }

  resize()
  window.addEventListener('resize', () => {
    resize()
    particles.forEach(p => {
      if (p.x > canvas.width)  p.x = Math.random() * canvas.width
      if (p.y > canvas.height) p.y = Math.random() * canvas.height
    })
  })

  const colors = [
    'rgba(244, 182, 194, 0.40)',   // rose-deep
    'rgba(249, 205, 214, 0.35)',   // rose-mid
    'rgba(212, 175, 127, 0.28)',   // champagne
    'rgba(237, 217, 176, 0.30)',   // champagne-light
    'rgba(255, 228, 233, 0.50)',   // rose-soft
    'rgba(139, 123, 130, 0.18)',   // whisper
    'rgba(255, 249, 250, 0.40)',   // pearl
  ]

  const TYPES = ['bow', 'heart', 'dot', 'star', 'ring']

  function createParticle(spawnY = null) {
    return {
      x:        Math.random() * canvas.width,
      y:        spawnY !== null ? spawnY : Math.random() * canvas.height,
      size:     Math.random() * 11 + 3,
      color:    colors[Math.floor(Math.random() * colors.length)],
      type:     TYPES[Math.floor(Math.random() * TYPES.length)],
      vx:       (Math.random() - 0.5) * 0.22,
      vy:       -(Math.random() * 0.28 + 0.08),
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.014,
      opacity:  Math.random() * 0.55 + 0.15,
      phase:    Math.random() * Math.PI * 2,
      wobble:   Math.random() * 1.8 + 0.6,
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(createParticle())

  // ─── Dibujadores ───────────────────────────────────────────────────────────

  function drawBow(ctx, x, y, s, rot) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot)
    const r = s * 0.5
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(-r * 0.7, -r * 0.9, -r * 2.1, -r * 0.55, -r * 2.3, 0)
    ctx.bezierCurveTo(-r * 2.1, r * 0.55, -r * 0.7, r * 0.9, 0, 0)
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(r * 0.7, -r * 0.9, r * 2.1, -r * 0.55, r * 2.3, 0)
    ctx.bezierCurveTo(r * 2.1, r * 0.55, r * 0.7, r * 0.9, 0, 0)
    ctx.fillStyle = ctx.strokeStyle
    ctx.fill()
    ctx.beginPath()
    ctx.arc(0, 0, r * 0.46, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  function drawHeart(ctx, x, y, s, rot) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot)
    const sc = s * 0.042
    ctx.scale(sc, sc)
    ctx.beginPath()
    ctx.moveTo(0, -5)
    ctx.bezierCurveTo(5, -13, 14, -7, 14, 0)
    ctx.bezierCurveTo(14, 8, 0, 15, 0, 17)
    ctx.bezierCurveTo(0, 15, -14, 8, -14, 0)
    ctx.bezierCurveTo(-14, -7, -5, -13, 0, -5)
    ctx.fillStyle = ctx.strokeStyle
    ctx.fill()
    ctx.restore()
  }

  function drawStar(ctx, x, y, s, rot) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot)
    const r1 = s * 0.5, r2 = s * 0.22
    ctx.beginPath()
    for (let i = 0; i < 5; i++) {
      const a1 = (i * 2 * Math.PI) / 5 - Math.PI / 2
      const a2 = a1 + Math.PI / 5
      ctx.lineTo(Math.cos(a1) * r1, Math.sin(a1) * r1)
      ctx.lineTo(Math.cos(a2) * r2, Math.sin(a2) * r2)
    }
    ctx.closePath()
    ctx.fillStyle = ctx.strokeStyle
    ctx.fill()
    ctx.restore()
  }

  function drawRing(ctx, x, y, s, rot) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot)
    ctx.beginPath()
    ctx.arc(0, 0, s * 0.44, 0, Math.PI * 2)
    ctx.strokeStyle = ctx.fillStyle
    ctx.lineWidth = s * 0.12
    ctx.stroke()
    ctx.restore()
  }

  function drawDot(ctx, x, y, s) {
    ctx.beginPath()
    ctx.arc(x, y, s * 0.35, 0, Math.PI * 2)
    ctx.fillStyle = ctx.strokeStyle
    ctx.fill()
  }

  // ─── Loop principal ────────────────────────────────────────────────────────

  function loop(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      p.rotation += p.rotSpeed

      // Respawn al salir por arriba
      if (p.y < -20) {
        Object.assign(p, createParticle(canvas.height + 20))
        p.y = canvas.height + 20
      }
      if (p.x < -20)             p.x = canvas.width  + 20
      if (p.x > canvas.width + 20) p.x = -20

      const wobbleX = Math.sin(t * 0.0009 + p.phase) * p.wobble
      const alpha   = p.opacity * (0.65 + 0.35 * Math.sin(t * 0.0006 + p.phase))

      ctx.globalAlpha = alpha
      ctx.fillStyle   = p.color
      ctx.strokeStyle = p.color

      const px = p.x + wobbleX

      switch (p.type) {
        case 'bow':   drawBow  (ctx, px, p.y, p.size, p.rotation); break
        case 'heart': drawHeart(ctx, px, p.y, p.size, p.rotation); break
        case 'star':  drawStar (ctx, px, p.y, p.size, p.rotation); break
        case 'ring':  drawRing (ctx, px, p.y, p.size, p.rotation); break
        default:      drawDot  (ctx, px, p.y, p.size);              break
      }
    })

    ctx.globalAlpha = 1
    animFrame = requestAnimationFrame(loop)
  }

  animFrame = requestAnimationFrame(loop)
  return () => cancelAnimationFrame(animFrame)
}
