/* global HTMLElement */
import eventize from '@spearwolf/eventize'

import findParentElementByName from './lib/find_parent_element_by_name'

import {
  BLITP_CANVAS_NODE_NAME,
  BLITP_SCENE_NODE_NAME
} from './constants'

export default class BlitpScene extends HTMLElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)
    return eventize(self)
  }

  get blitpunkNodeName () { return BLITP_SCENE_NODE_NAME }

  get blitpunk () { return this.blitpunkCanvas.blitpunk }

  /** @private */
  connectedCallback () {
    this.blitpunkCanvas = findParentElementByName(this, BLITP_CANVAS_NODE_NAME)
  }

  /** @private */
  disconnectedCallback () {
    this.blitpunkCanvas = null
  }
}
