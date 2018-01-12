import { VO_HINT_STATIC } from 'picimo/core'
import { RESOURCES_NAME } from './constants'

export default {
  descriptor: RESOURCES_NAME,
  vertexShader: RESOURCES_NAME,
  fragmentShader: RESOURCES_NAME,
  primitive: 'TRIANGLES',
  usage: VO_HINT_STATIC
}
