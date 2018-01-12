import resourceLibrary from 'picimo/resourceLibrary'

import voDescriptor from './voDescriptor'
import vertexShader from './vertexShader'
import fragmentShader from './fragmentShader'

import { RESOURCES_NAME } from './constants'

resourceLibrary
  .addDescriptor(RESOURCES_NAME, voDescriptor)
  .addVertexShader(RESOURCES_NAME, vertexShader)
  .addFragmentShader(RESOURCES_NAME, fragmentShader)

export { default } from './PictureElement'
