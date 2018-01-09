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

// TODO create registry for custom query selectors
const deferTexture = deferPropertyValue('texture', el => el.loadResource())
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
