// https://github.com/WebReflection/document-register-element
import installCE from 'document-register-element/pony'

import BlitpCanvas from './blitp_canvas'

/**
 * Define all `<blitp-*>` custom html elements.
 * Should be called once at startup.
 */
export default function defineBlitpElements () {
  // install custom elements polyfill
  installCE(global)

  // define element in the CustomElementRegistry
  global.customElements.define('blitp-canvas', BlitpCanvas)
}
