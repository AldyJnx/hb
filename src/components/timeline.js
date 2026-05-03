// Sección timeline: contador de años con pin sticky y textos de momentos

export function init({ age }) {
  const counter = document.getElementById('timeline-counter')
  if (counter) counter.dataset.age = age
  // La lógica de scroll está en scroll.js (initTimeline)
  // Aquí solo aseguramos que el DOM tenga los datos correctos
}
