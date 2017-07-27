import parseComponentData from './lib/parseComponentData'

import ProjectionComponent from './components/ProjectionComponent'

const createFactory = (ComponentConstructor) => ({
  create (entity, data) {
    return new ComponentConstructor(entity, parseComponentData(data))
  },
  update (component, data) {
    component.update(parseComponentData(data))
  }
})

export default function (registry) {
  registry.registerComponent('projection', createFactory(ProjectionComponent))
}
