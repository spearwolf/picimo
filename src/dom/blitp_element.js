/* global HTMLElement */
import eventize from '@spearwolf/eventize'

/**
* Common interface for all **custom HTML `<blitp-*>` elements**
*/
export default class BlitpElement extends HTMLElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)
    return eventize(self)
  }

  /** @ignore */
  connectedCallback () {
    if (this.initialize) this.initialize()
  }
}
