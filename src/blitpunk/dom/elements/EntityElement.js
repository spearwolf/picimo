/* global HTMLElement */

export default class EntityElement extends HTMLElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)

    Object.defineProperties(self, {
      attributesValueCache: {
        value: new Map()
      }
    })

    console.log('[EntityElement] constructor, self=', self)

    return self
  }

  update () {
    this.getAttributeNames().forEach(attrName => {
      const { attributesValueCache } = this
      const oldValue = attributesValueCache.get(attrName)
      const value = this.getAttribute(attrName)
      if (oldValue !== value) {
        attributesValueCache.set(attrName, value)
        console.log('[EntityElement] attributeValueChanged: ', attrName, ', value', value, ', oldValue', oldValue)
        const { componentRegistry } = this
        if (componentRegistry) {
          componentRegistry.createOrUpdateComponent(this.entity, attrName, value)
        }
      }
    })
  }

  /** @private */
  connectedCallback () {
    console.log('[EntityElement] connectedCallback()')
  }

  /** @private */
  disconnectedCallback () {
    console.log('[EntityElement] disconnectedCallback()')
  }

  /** @private */
  // static get observedAttributes () {
    // console.log('[EntityElement] observedAttributes() getter called')
    // return [ ]
  // }

  /** @private */
  // attributeChangedCallback (attr, oldValue, newValue) {
    // console.log('[EntityElement] attributeChangedCallback(', attr, ',', oldValue, ',', newValue, ')')
  // }
}
