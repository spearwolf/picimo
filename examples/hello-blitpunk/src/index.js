/* global BLITPUNK */
BLITPUNK.initialize().then(() => {
  const el = document.querySelector('blitpunk-canvas')
  el.setAttribute('clear', 'rgba(100, 0, 50, .5)')
  console.log('Press Ctrl-D for <blitpunk> debug output ..')
})
