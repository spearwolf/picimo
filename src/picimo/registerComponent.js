import {
  definePublicPropertiesRO,
  defineHiddenPropertyRO,
  defineHiddenPropertyRW,
  parseCssStyledProperties,
  isFunction,
  isString
} from 'picimo/utils'

import { debug } from 'common/log'

import componentRegistry from './componentRegistry'

const RESERVED_PROPERTY_NAMES = ['url', 'vec2', 'vec3', 'vec4']

const deferredPropertySelectorRegex = RegExp(`([a-zA-Z][a-zA-Z0-9]*)\\((.*)\\)`)

const selectDeferredProperty = (propertyName, selector, component, key, verifyCreated) => {
  const el = document.querySelector(selector)
  if (el) {
    const { entity } = el
    if (entity) {
      entity.emit(`selectDeferred:${propertyName}`, propertyValue => {
        Promise.resolve(propertyValue).then(value => {
          component[key] = value
          verifyCreated()
        })
      })
    }
  }
}

const assignProperties = (component, props, verifyCreated) => {
  Object.entries(props).forEach(([key, value]) => {
    if (isString(value)) {
      const m = value.match(deferredPropertySelectorRegex)
      if (m) {
        if (!RESERVED_PROPERTY_NAMES.includes(m[0])) {
          selectDeferredProperty(m[1], m[2], component, key, verifyCreated)
          return
        }
      }
    }
    component[key] = value
  })
  verifyCreated()
}

const createDisconnectedEntity = component => {
  defineHiddenPropertyRO(component, '_disconnectedEntity', component.disconnectedEntity)

  component.disconnectedEntity = (entity) => {
    entity.off(component)

    if (component._disconnectedEntity) {
      component._disconnectedEntity(entity)
    }
  }
}

const verifyComponentCreated = (name, component) => () => {
  if (component._isCreated) return
  if (component._preConditionAttributes.every(attr => component[attr])) {
    component._isCreated = true

    debug(`[${name}] create`, component)

    if (isFunction(component.create)) {
      component.create()
    }

    component.entity.on(component)  // TODO add configurable event-list filter?
  }
}

export default (name, ComponentConstructor) => {
  componentRegistry.registerComponent(name, {
    create (entity, data) {
      const component = new ComponentConstructor(entity)

      definePublicPropertiesRO(component, { entity, el: entity.el })
      defineHiddenPropertyRW(component, '_isCreated', false)
      defineHiddenPropertyRO(component, '_preConditionAttributes', (
        (ComponentConstructor.preConditionAttributes && ComponentConstructor.preConditionAttributes()) || []
      ))

      createDisconnectedEntity(component)

      assignProperties(component, parseCssStyledProperties(data), verifyComponentCreated(name, component))

      return component
    },

    update (component, data) {
      assignProperties(component, parseCssStyledProperties(data), verifyComponentCreated(name, component))

      if (component._isCreated) {
        debug(`[${name}] update`, component)

        if (isFunction(component.update)) {
          component.update()
        }
      }
    },

    destroy (component) {
      if (component._isCreated) {
        debug(`[${name}] destroy`, component)

        if (isFunction(component.destroy)) {
          component.destroy()
        }
      }
    }
  })
}
