import componentRegistry from './componentRegistry'
import { parseCssStyledProperties, isFunction } from 'blitpunk/utils'
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
    if (typeof value === 'string') {
      if (deferTexture(component, key, value, verifyCreated) ||
        deferSpriteGroup(component, key, value, verifyCreated)) {
        return
      }
    }
    component[key] = value
  })
  verifyCreated()
}

const createConnectedEntity = c => {
  Object.defineProperty(c, '_connectedEntity', { value: c.connectedEntity })

  c.connectedEntity = entity => {
    Object.defineProperty(c, '_renderFrameId', {
      value: entity.on('renderFrame', (...args) => {
        if (c._isCreated && isFunction(c.renderFrame)) {
          c.renderFrame(...args)
        }
      })
    })
    Object.defineProperty(c, '_postRenderFrameId', {
      value: entity.on('postRenderFrame', (...args) => {
        if (c._isCreated && isFunction(c.postRenderFrame)) {
          c.postRenderFrame(...args)
        }
      })
    })

    if (isFunction(c._connectedEntity)) {
      c._connectedEntity(entity)
    }
  }
}

const createDisconnectedEntity = c => {
  Object.defineProperty(c, '_disconnectedEntity', { value: c.disconnectedEntity })

  c.disconnectedEntity = (entity) => {
    entity.off('renderFrame', c._renderFrameId)
    entity.off('postRenderFrame', c._postRenderFrameId)

    if (c._disconnectedEntity) {
      c._disconnectedEntity(entity)
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

      assignProperties(component, parseCssStyledProperties(data), verifyComponentCreated(name, component))

      createConnectedEntity(component)
      createDisconnectedEntity(component)

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
