import ComponentFactory from '../ecs/component_factory'

import ClearColorComponent from './components/ClearColorComponent'
import ClearComponent from './components/ClearComponent'
// import ProjectionComponent from './components/ProjectionComponent'
// import ChildrenComponent from './components/ChildrenComponent'
// import BlendModeComponent from './components/BlendModeComponent'

export default function (registry) {
  registry.registerComponent('clear-color',
    ComponentFactory.createComponent(ClearColorComponent))
  registry.registerComponent('clear',
    ComponentFactory.createCssStyledPropsComponent(ClearComponent))
  // registry.registerComponent('projection', createFactory(ProjectionComponent))
  // registry.registerComponent('children', createFactory(ChildrenComponent))
  // registry.registerComponent('blend-mode', createFactory(BlendModeComponent))
}
