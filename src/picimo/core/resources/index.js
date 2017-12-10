import * as simple from './simple'

const SIMPLE = 'simple'

export default function (spriteLibrary) {
  spriteLibrary
    .addDescriptor(SIMPLE, simple.description)
    .addVertexShader(SIMPLE, simple.vertexShader)
    .addFragmentShader(SIMPLE, simple.fragmentShader)
}
