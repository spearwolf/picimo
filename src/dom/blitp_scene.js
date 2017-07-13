/* global HTMLElement */
import eventize from '@spearwolf/eventize'

// import BlitpElement from './blitp_element'
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

  get blitpNodeName () {
    return BLITP_SCENE_NODE_NAME
  }

  /** @private */
  connectedCallback () {
    this.parentBlitpElement = findParentElementByName(this, BLITP_SCENE_NODE_NAME, BLITP_CANVAS_NODE_NAME)
    // this.sgNode = new SGScene({ parentNode: this.parentBlitpElement.sgNode })
  }
}
