import ComponentFactory from 'blitpunk/ecs/component_factory'

import ClearComponent from './ClearComponent'
import BlendComponent from './BlendComponent'
// import ProjectionComponent from './components/ProjectionComponent'

export default function (registry) {
  registry.registerComponent('clear',
    ComponentFactory.createCssStyledPropsComponent(ClearComponent))
  registry.registerComponent('blend',
    ComponentFactory.createCssStyledPropsComponent(BlendComponent))
  // registry.registerComponent('projection', createFactory(ProjectionComponent))
}
