/* global HTMLElement */
import { removeItem } from 'picimo/utils'
import { ComponentRegistry } from 'picimo/ecs'
import entityManager from 'picimo/entityManager'
import rootComponentRegistry from 'picimo/componentRegistry'

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
    this._entity.setComponent('el', this)
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
        // debug('[entity] attributeValueChanged:', attrName, 'value=', value, 'oldValue=', oldValue)
        this.componentRegistry.createOrUpdateComponent(this.entity, attrName, value)
      }
    })
    prevAttrNames.forEach(attrName => {
      this.entity.destroyComponent(attrName)
      this.attributeValuesCache.delete(attrName)
      // debug('[entity] attributeRemoved:', attrName)
    })
  }

  renderFrame (canvasEl, webGlRenderer) {
    this.updateEntity()

    this.entity.emit('renderFrame', webGlRenderer, canvasEl)

    const { children } = this
    for (let i = 0; i < children.length; i++) {
      const childEl = children[i]
      if (childEl.renderFrame) {
        childEl.renderFrame(canvasEl, webGlRenderer)
      }
    }

    this.entity.emit('postRenderFrame', webGlRenderer, canvasEl)
  }

  /** @private */
  // connectedCallback () {
    // debug('[entity] connectedCallback()', this)
  // }

  /** @private */
  // disconnectedCallback () {
    // debug('[entity] disconnectedCallback()', this)
  // }
}
