import { debug } from 'common/log'

import callComponentMethod from './callComponentMethod'

import { COMPONENT_CREATED } from './constants'

export default (name, component) => () => {
  if (component._isCreated) return
  if (component._preConditionAttributes.every(attr => component[attr])) {
    component._isCreated = true

    debug(`[${name}] create component`, component)
    callComponentMethod(component, COMPONENT_CREATED)

    const events = component._eventSubscriptions
    if (Array.isArray(events) && events.length) {
      component.entity.on(events, component)
    }
  }
}
