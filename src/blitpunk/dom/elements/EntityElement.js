/* global HTMLElement */
import rootComponentRegistry from 'blitpunk/componentRegistry'
import { ComponentRegistry } from 'blitpunk/ecs'
import entityManager from 'blitpunk/entityManager'
import removeItem from 'blitpunk/utils/removeItem'
import { debug } from 'common/log'

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

    debug('[entity] constructor, self=', self)

    return self
  }

  get componentRegistry () {
    if (!this._componentRegistry) {
      this._componentRegistry = new ComponentRegistry(rootComponentRegistry)
    }
    return this._componentRegistry
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

  /** @private */
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
        debug('[entity] attributeValueChanged:', attrName, 'value=', value, 'oldValue=', oldValue)
        this.componentRegistry.createOrUpdateComponent(this.entity, attrName, value)
      }
    })
    prevAttrNames.forEach(attrName => {
      this.entity.destroyComponent(attrName)
      this.attributeValuesCache.delete(attrName)
      debug('[entity] attributeRemoved:', attrName)
    })
    this.entity.emit('updateEntity', this)
  }

  renderFrame (canvasEl, webGlRenderer, parentEl) {
    this.updateEntity()

    this.entity.emit('renderFrame', webGlRenderer)

    const { children } = this
    for (let i = 0; i < children.length; i++) {
      const childEl = children[i]
      if (childEl.renderFrame) {
        childEl.renderFrame(canvasEl, webGlRenderer, this)
      }
    }
  }

  /** @private */
  connectedCallback () {
    debug('[entity] connectedCallback()')
  }

  /** @private */
  disconnectedCallback () {
    debug('[entity] disconnectedCallback()')
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
