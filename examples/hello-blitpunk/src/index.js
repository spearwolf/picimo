import Blitpunk from '../../../src/blitpunk'

// Initialize <blitp-*> custom elements
//
Blitpunk()

// Start main animation loop
//
const el = document.getElementById('blitpunkCanvas')
el.animate()

console.log('hello blitpunk!', el);
