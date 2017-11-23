import * as simple from './simple'

export default function (spriteLibrary) {
  spriteLibrary
    .addDescriptor('simple', simple.description)
    .addVertexShader('simple', simple.vertexShader)
    .addFragmentShader('simple', simple.fragmentShader)
}
