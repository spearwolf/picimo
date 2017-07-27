// https://github.com/WebReflection/document-register-element
import installCE from 'document-register-element/pony'

import Canvas from './elements/canvas'
import Scene from './elements/scene'

import {
  BLITPUNK_CANVAS_ELEMENT,
  BLITPUNK_SCENE_ELEMENT
} from './constants'

import './blitpunk.scss'

/**
 * Define all `<blitpunk-*>` custom html elements.
 * Should be called once at startup.
 */
export default function defineCustomElements () {
  // install custom elements polyfill
  installCE(window)

  // define element in the CustomElementRegistry
  window.customElements.define(BLITPUNK_CANVAS_ELEMENT, Canvas)
  window.customElements.define(BLITPUNK_SCENE_ELEMENT, Scene)
}
