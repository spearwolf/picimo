import defineBlitpElements from './dom/define_blitp_elements'

const BLITPUNK_ELEMENTS_ARE_DEFINED = Symbol.for('BLITPUNK_ELEMENTS_ARE_DEFINED')

if (!window[BLITPUNK_ELEMENTS_ARE_DEFINED]) {
  window[BLITPUNK_ELEMENTS_ARE_DEFINED] = true
  defineBlitpElements()
}

function Blitpunk () {
  // TODO console.log welcome
}

export default Blitpunk
