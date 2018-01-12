import camelCase from 'lodash/camelCase'
import { debug } from 'common/log'
import {
  definePublicPropertiesRO,
  defineHiddenPropertyRO,
  defineHiddenPropertyRW,
  parseCssStyledProperties,
  isFunction
} from 'picimo/utils'

import componentRegistry from '../componentRegistry'

import createDisconnectedEntity from './createDisconnectedEntity'
import assignProperties from './assignProperties'
import checkComponentCreated from './checkComponentCreated'
import readComponentAttribute from './readComponentAttribute'
import callComponentMethod from './callComponentMethod'

import {
  COMPONENT_DESTROY,
  COMPONENT_UPDATED,
  EVENT_SUBSCRIPTIONS,
  POST_RENDER_FRAME,
  PRE_CONDITION_ATTRIBUTES,
  RENDER_FRAME
} from './constants'

export default (rawName, ComponentConstructor) => {
  const name = camelCase(rawName)

  componentRegistry.registerComponent(name, {
    create (entity, data) {
      const component = new ComponentConstructor(entity)

      definePublicPropertiesRO(component, { entity, el: entity.el })
      defineHiddenPropertyRW(component, '_isCreated', false)

      defineHiddenPropertyRO(component, '_preConditionAttributes',
        readComponentAttribute(ComponentConstructor, PRE_CONDITION_ATTRIBUTES))

      defineHiddenPropertyRO(component, '_eventSubscriptions',
        readComponentAttribute(ComponentConstructor, EVENT_SUBSCRIPTIONS, () => {
          const events = []
          if (isFunction(component[RENDER_FRAME])) events.push(RENDER_FRAME)
          if (isFunction(component[POST_RENDER_FRAME])) events.push(POST_RENDER_FRAME)
          return events
        }))

      createDisconnectedEntity(component)

      assignProperties(component, parseCssStyledProperties(data), checkComponentCreated(name, component))

      return component
    },

    update (component, data) {
      assignProperties(component, parseCssStyledProperties(data), checkComponentCreated(name, component))

      if (component._isCreated) {
        debug(`[${name}] update component`, component)
        callComponentMethod(component, COMPONENT_UPDATED)
      }
    },

    destroy (component) {
      if (component._isCreated) {
        debug(`[${name}] destroy component`, component)
        callComponentMethod(component, COMPONENT_DESTROY)
      }
    }
  })
}
