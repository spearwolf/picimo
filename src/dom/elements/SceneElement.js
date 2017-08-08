/* global HTMLElement */
import eventize from '@spearwolf/eventize'

import findParentElementByName from '../lib/find_parent_element_by_name'

import {
  NODE_NAME_CANVAS,
  NODE_NAME_SCENE
} from '../constants'

export default class SceneElement extends HTMLElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)
    return eventize(self)
  }

  get blitpunkNodeName () { return NODE_NAME_SCENE }

  get blitpunk () { return this.blitpunkCanvas.blitpunk }

  /** @private */
  connectedCallback () {
    this.blitpunkCanvas = findParentElementByName(this, NODE_NAME_CANVAS)
  }

  /** @private */
  disconnectedCallback () {
    this.blitpunkCanvas = null
  }
}
