import initialize from 'blitpunk'

window.el = document.getElementById('c0')

initialize().then(() => {
  // el.setAttribute('clear-color', 'rgba(255, 0, 64, .8)')

  console.log('blitpunk canvas example', window.el)
})
