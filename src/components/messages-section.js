// Sección de mensajes: genera los items con quote marks decorativos

export function init({ messages }) {
  const container = document.querySelector('.messages-container')
  if (!container) return

  messages.forEach((text, i) => {
    const item = document.createElement('div')
    item.className = 'message-item'

    const quote = document.createElement('span')
    quote.className = 'message-quote-mark'
    quote.setAttribute('aria-hidden', 'true')
    quote.textContent = '“'

    const p = document.createElement('p')
    p.className = 'message-text'
    p.textContent = text

    const line = document.createElement('div')
    line.className = 'message-line'

    item.appendChild(quote)
    item.appendChild(p)
    item.appendChild(line)
    container.appendChild(item)
  })
}
