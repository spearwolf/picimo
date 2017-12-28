import { ComponentFactory } from 'picimo/ecs'

import ClearComponent from './ClearComponent'
import BlendComponent from './BlendComponent'
import ProjectionComponent from './ProjectionComponent'
import TextureComponent from './TextureComponent'
import DisplayPositionComponent, { DISPLAY_POSITION } from './DisplayPositionComponent'

/** @private */
export default function (registry) {
  registry.registerComponent('clear', ComponentFactory.createCssStyledPropsComponent(ClearComponent))
  registry.registerComponent('blend', ComponentFactory.createCssStyledPropsComponent(BlendComponent))
  registry.registerComponent('projection', ComponentFactory.createCssStyledPropsComponent(ProjectionComponent))
  registry.registerComponent('texture', ComponentFactory.createCssStyledPropsComponent(TextureComponent))
  registry.registerComponent(DISPLAY_POSITION, ComponentFactory.createCssStyledPropsComponent(DisplayPositionComponent))
}
