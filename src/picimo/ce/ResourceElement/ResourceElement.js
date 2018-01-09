import { defineHiddenPropertyRW } from 'picimo/utils'

import EntityElement from '../EntityElement'

import {
  EVENT_LOAD_RESOURCE,
  EVENT_RESOURCE_LOADED,
  EVENT_RESOURCE_PROMISE
} from '../constants'

export default class ResourceElement extends EntityElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)

    self.resource = null

    /**
     * The resource Promise will be resolved when the resource has been loaded.
     * The Promise resolve value is the resource.
     *
     * The loading of the resource is triggered with `loadResource()`
     */
    self.resourcePromise = new Promise(resolve => {
      defineHiddenPropertyRW(self, 'resolveResourcePromise', resolve)
    })

    const { entity } = self

    entity.on(EVENT_RESOURCE_PROMISE, resourcePromise => {
      resourcePromise.then(resource => entity.emit(EVENT_RESOURCE_LOADED, resource))
      if (self.resolveResourcePromise) {
        self.resolveResourcePromise(resourcePromise)
        self.resolveResourcePromise = null
      }
    })

    entity.retain(EVENT_RESOURCE_LOADED)
    entity.on(EVENT_RESOURCE_LOADED, resource => {
      self.resource = resource
    })

    return self
  }

  /**
   * Loads the resource.
   * Does nothing when the resource has been loaded.
   *
   * Return value is a Promise.
   * The Promise resolve value is the resource.
   *
   * Emits the `loadResource` event.
   */
  loadResource () {
    if (!this.resource) {
      this.entity.emit(EVENT_LOAD_RESOURCE, this, resource => {
        this.entity.emit(EVENT_RESOURCE_PROMISE, Promise.resolve(resource))
      })
    }
    return this.resourcePromise
  }
}
