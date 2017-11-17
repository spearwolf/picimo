/* global BLITPUNK */
BLITPUNK.whenReady().then(() => {
  const el = document.querySelector('blitpunk-canvas')
  el.setAttribute('clear-color', 'rgba(100, 0, 50, .5)')
  console.log('Press Ctrl-D for <blitpunk> debug output ..')
})
