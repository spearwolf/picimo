import componentRegistry from './componentRegistry'
import {
  parseCssStyledProperties,
  isFunction,
  isString
} from 'picimo/utils'
import { debug } from 'common/log'

const deferPropertyValue = (deferFuncName, getValuePromise) => {
  const regex = new RegExp(`${deferFuncName}\\((.*)\\)`)
  return (component, key, value, verifyCreated) => {
    const m = value.match(regex)
    if (m) {
      const el = document.querySelector(m[1])
      if (el) {
        Promise.resolve(getValuePromise(el)).then(resolved => {
          if (resolved) {
            component[key] = resolved
            verifyCreated()
          }
        })
        return true
      }
    }
  }
}

const deferTexture = deferPropertyValue('texture', el => el.loadTexture())
const deferSpriteGroup = deferPropertyValue('spriteGroup', el => el.spriteGroupPromise)

const assignProperties = (component, props, verifyCreated) => {
  Object.entries(props).forEach(([key, value]) => {
    if (isString(value)) {
      if (deferTexture(component, key, value, verifyCreated) ||
        deferSpriteGroup(component, key, value, verifyCreated)) {
        return
      }
    }
    component[key] = value
  })
  verifyCreated()
}

const createDisconnectedEntity = component => {
  Object.defineProperty(component, '_disconnectedEntity', { value: component.disconnectedEntity })

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

      Object.defineProperties(component, {
        entity: { value: entity, enumerable: true },
        el: { value: entity.el, enumerable: true },
        _isCreated: { value: false, writable: true },
        _preConditionAttributes: {
          value: ((ComponentConstructor.preConditionAttributes &&
            ComponentConstructor.preConditionAttributes()) || []
          )
        }
      })

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
