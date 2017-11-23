import parseCssStyledProperties from '../utils/parseCssStyledProperties.js'

import ProjectionComponent from './components/ProjectionComponent'
import ChildrenComponent from './components/ChildrenComponent'
import BlendModeComponent from './components/BlendModeComponent'

const createFactory = (ComponentConstructor) => ({
  create (entity, data) {
    return new ComponentConstructor(entity, parseCssStyledProperties(data))
  },
  update (component, data) {
    component.update(parseCssStyledProperties(data))
  }
})

export default function (registry) {
  registry.registerComponent('projection', createFactory(ProjectionComponent))
  registry.registerComponent('children', createFactory(ChildrenComponent))
  registry.registerComponent('blend-mode', createFactory(BlendModeComponent))
}
