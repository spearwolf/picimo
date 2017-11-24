/* global HTMLElement */
import componentRegistry from 'blitpunk/componentRegistry'
import entityManager from 'blitpunk/entityManager'
import removeItem from 'blitpunk/utils/removeItem'

export default class EntityElement extends HTMLElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)

    Object.defineProperties(self, {
      attributeValuesCache: { value: new Map() },
      attributeNamesCache: { value: [] },
      _componentRegistry: { value: null, writable: true },
      _entityManager: { value: null, writable: true },
      _entity: { value: null, writable: true }
    })

    console.log('[EntityElement] constructor, self=', self)

    return self
  }

  get componentRegistry () {
    return this._componentRegistry || componentRegistry
  }

  set componentRegistry (registry) {
    this._componentRegistry = registry
  }

  get entityManager () {
    return this._entityManager || entityManager
  }

  set entityManager (manager) {
    this._entityManager = manager
  }

  get entity () {
    const entity = this._entity
    if (entity) {
      return entity
    }
    this._entity = this.entityManager.createEntity()
    return this._entity
  }

  updateEntity () {
    const attributeNames = this.getAttributeNames()
    const prevAttrNames = this.attributeNamesCache.slice(0)
    this.attributeNamesCache.length = 0
    attributeNames.forEach(attrName => {
      removeItem(prevAttrNames, attrName)
      this.attributeNamesCache.push(attrName)
      const { attributeValuesCache } = this
      const oldValue = attributeValuesCache.get(attrName)
      const value = this.getAttribute(attrName)
      if (oldValue !== value) {
        attributeValuesCache.set(attrName, value)
        console.log('[EntityElement] attributeValueChanged:', attrName, 'value=', value, 'oldValue=', oldValue)
        this.componentRegistry.createOrUpdateComponent(this.entity, attrName, value)
      }
    })
    prevAttrNames.forEach(attrName => {
      console.log('[EntityElement] attributeRemoved:', attrName)
      this.entity.destroyComponent(attrName)
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