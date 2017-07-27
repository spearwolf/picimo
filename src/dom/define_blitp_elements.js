// https://github.com/WebReflection/document-register-element
import installCE from 'document-register-element/pony'

import BlitpCanvas from './elements/blitp_canvas'
import BlitpScene from './elements/blitp_scene'

import {
  BLITP_CANVAS_ELEMENT,
  BLITP_SCENE_ELEMENT
} from './constants'

import './blitp.scss'

/**
 * Define all `<blitp-*>` custom html elements.
 * Should be called once at startup.
 */
export default function defineBlitpElements () {
  // install custom elements polyfill
  installCE(window)

  // define element in the CustomElementRegistry
  window.customElements.define(BLITP_CANVAS_ELEMENT, BlitpCanvas)
  window.customElements.define(BLITP_SCENE_ELEMENT, BlitpScene)
}
