/* global HTMLElement */

/**
* Common interface for all **custom HTML `<blitp-*>` elements**
*/
export default class BlitpElement extends HTMLElement {
  /** @ignore */
  connectedCallback () {
    if (this.initialize) this.initialize()
  }
}
