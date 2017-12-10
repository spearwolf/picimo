import ComponentFactory from 'picimo/ecs/component_factory'

import ClearComponent from './ClearComponent'
import BlendComponent from './BlendComponent'
import ProjectionComponent from './ProjectionComponent'
import TextureComponent from './TextureComponent'

export default function (registry) {
  registry.registerComponent('clear', ComponentFactory.createCssStyledPropsComponent(ClearComponent))
  registry.registerComponent('blend', ComponentFactory.createCssStyledPropsComponent(BlendComponent))
  registry.registerComponent('projection', ComponentFactory.createCssStyledPropsComponent(ProjectionComponent))
  registry.registerComponent('texture', ComponentFactory.createCssStyledPropsComponent(TextureComponent))
}
