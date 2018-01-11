import camelCase from 'lodash/camelCase'
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
  const register = (name, component) => {
    registry.registerComponent(camelCase(name), ComponentFactory.createCssStyledPropsComponent(component))
  }

  register(CLEAR, ClearComponent)
  register(BLEND, BlendComponent)
  register(PROJECTION, ProjectionComponent)
  register(TEXTURE, TextureComponent)
  register(DISPLAY_POSITION, DisplayPositionComponent)
  register(TRANSFORM, TransformComponent)
}
