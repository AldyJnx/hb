// Partículas flotantes en canvas: lazos y corazones en el fondo

export function init() {
  const canvas = document.getElementById('particles-canvas')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  let particles = []
  let animFrame
  const COUNT = window.innerWidth < 640 ? 18 : 30

  function resize() {
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
  }

  resize()
  window.addEventListener('resize', () => {
    resize()
    // Reposicionar partículas al cambiar tamaño
    particles.forEach(p => {
      if (p.x > canvas.width)  p.x = Math.random() * canvas.width
      if (p.y > canvas.height) p.y = Math.random() * canvas.height
    })
  })

  // Colores de las partículas (transparentes y sutiles)
  const colors = [
    'rgba(244, 182, 194, 0.35)',  // rose-deep
    'rgba(212, 175, 127, 0.25)',  // champagne
    'rgba(255, 228, 233, 0.45)',  // rose-soft
    'rgba(139, 123, 130, 0.20)',  // whisper
  ]

  // Tipos de partículas
  const TYPES = ['bow', 'heart', 'dot']

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 10 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: TYPES[Math.floor(Math.random() * TYPES.length)],
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.3 + 0.1),
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.012,
      opacity: Math.random() * 0.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(createParticle())

  // Dibuja un lazo pequeño
  function drawBow(ctx, x, y, size, rotation) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)

    const s = size * 0.55
    ctx.beginPath()
    // Ala izquierda
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(-s * 0.8, -s * 0.9, -s * 2.2, -s * 0.6, -s * 2.4, 0)
    ctx.bezierCurveTo(-s * 2.2, s * 0.6, -s * 0.8, s * 0.9, 0, 0)
    // Ala derecha
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(s * 0.8, -s * 0.9, s * 2.2, -s * 0.6, s * 2.4, 0)
    ctx.bezierCurveTo(s * 2.2, s * 0.6, s * 0.8, s * 0.9, 0, 0)
    ctx.fillStyle = ctx.strokeStyle
    ctx.fill()

    // Nudo central
    ctx.beginPath()
    ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }

  // Dibuja un corazón pequeño
  function drawHeart(ctx, x, y, size, rotation) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)
    ctx.scale(size * 0.04, size * 0.04)

    ctx.beginPath()
    ctx.moveTo(0, -5)
    ctx.bezierCurveTo(5, -12, 14, -6, 14, 0)
    ctx.bezierCurveTo(14, 7, 0, 14, 0, 16)
    ctx.bezierCurveTo(0, 14, -14, 7, -14, 0)
    ctx.bezierCurveTo(-14, -6, -5, -12, 0, -5)
    ctx.fillStyle = ctx.strokeStyle
    ctx.fill()

    ctx.restore()
  }

  function draw(p, t) {
    const wobble = Math.sin(t * 0.001 + p.phase) * 1.5
    const alpha = p.opacity * (0.7 + 0.3 * Math.sin(t * 0.0008 + p.phase))

    ctx.globalAlpha = alpha
    ctx.fillStyle   = p.color
    ctx.strokeStyle = p.color

    if (p.type === 'bow') {
      drawBow(ctx, p.x + wobble, p.y, p.size, p.rotation)
    } else if (p.type === 'heart') {
      drawHeart(ctx, p.x + wobble, p.y, p.size, p.rotation)
    } else {
      ctx.beginPath()
      ctx.arc(p.x + wobble, p.y, p.size * 0.4, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalAlpha = 1
  }

  let lastTime = 0
  function loop(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      p.rotation += p.rotSpeed

      // Wrap alrededor del canvas
      if (p.y < -20)             p.y = canvas.height + 20
      if (p.x < -20)             p.x = canvas.width + 20
      if (p.x > canvas.width + 20) p.x = -20

      draw(p, t)
    })

    animFrame = requestAnimationFrame(loop)
  }

  animFrame = requestAnimationFrame(loop)

  // Limpiar en navegación SPA (por si acaso)
  return () => cancelAnimationFrame(animFrame)
}
