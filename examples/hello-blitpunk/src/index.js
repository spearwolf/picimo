import '../../../src/blitpunk'

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('blitpunkCanvas')
  el.setAttribute('clear-color', 'rgba(100, 0, 50, .5)')
  console.log('hello blitpunk!', el)
})
