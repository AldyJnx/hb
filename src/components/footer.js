// Footer: firma manuscrita con lazo decorativo final

const BOW_SVG = `
<svg viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg"
     style="width:80px" aria-hidden="true">
  <path d="M60,36 C54,22 22,8 10,18 C2,25 8,44 60,36 Z"
    stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M60,36 C66,22 98,8 110,18 C118,25 112,44 60,36 Z"
    stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="60" cy="36" r="6"
    stroke="currentColor" stroke-width="1.8" fill="none"/>
  <path d="M55,40 C50,52 42,58 46,64"
    stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
  <path d="M65,40 C70,52 78,58 74,64"
    stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
</svg>`

export function init({ signature }) {
  const bowEl = document.querySelector('.footer-bow')
  if (bowEl) bowEl.innerHTML = BOW_SVG

  const sigEl = document.querySelector('.footer-signature')
  if (sigEl) sigEl.textContent = signature
}
