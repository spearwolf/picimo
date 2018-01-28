import { defineHiddenPropertyRO } from 'picimo/utils'

export default component => {
  defineHiddenPropertyRO(component, '_disconnectedEntity', component.disconnectedEntity)

  component.disconnectedEntity = (entity) => {
    entity.off(component)

    if (component._disconnectedEntity) {
      component._disconnectedEntity(entity)
    }
  }
}
