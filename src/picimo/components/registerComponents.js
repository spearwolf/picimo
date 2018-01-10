import { ComponentFactory } from 'picimo/ecs'

import {
  BLEND,
  CLEAR,
  DISPLAY_POSITION,
  PROJECTION,
  TEXTURE,
  TRANSFORM
} from './constants'

import ClearComponent from './ClearComponent'
import BlendComponent from './BlendComponent'
import ProjectionComponent from './ProjectionComponent'
import TextureComponent from './TextureComponent'
import DisplayPositionComponent from './DisplayPositionComponent'
import TransformComponent from './TransformComponent'

/** @private */
export default function (registry) {
  registry.registerComponent(CLEAR, ComponentFactory.createCssStyledPropsComponent(ClearComponent))
  registry.registerComponent(BLEND, ComponentFactory.createCssStyledPropsComponent(BlendComponent))
  registry.registerComponent(PROJECTION, ComponentFactory.createCssStyledPropsComponent(ProjectionComponent))
  registry.registerComponent(TEXTURE, ComponentFactory.createCssStyledPropsComponent(TextureComponent))
  registry.registerComponent(DISPLAY_POSITION, ComponentFactory.createCssStyledPropsComponent(DisplayPositionComponent))
  registry.registerComponent(TRANSFORM, ComponentFactory.createCssStyledPropsComponent(TransformComponent))
}
