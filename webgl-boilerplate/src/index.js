import '../../src/blitpunk'

import ShaderSource from '../../src/core/shader_source'
import ShaderProgram from '../../src/core/shader_program'
import ShaderUniformVariable from '../../src/core/shader_uniform_variable'
import ShaderVariableBufferGroup from '../../src/core/shader_variable_buffer_group'
import ShaderTextureGroup from '../../src/core/shader_texture_group'

import Projection from '../../src/core/projection'

import PowerOf2Image from '../../src/core/power_of_2_image'
import ElementIndexArray from '../../src/core/element_index_array'

import initSprites from './init_sprites'
import initQuads from './init_quads'

// ----- init ---------

window.PowerOf2Image = PowerOf2Image

const el = document.getElementById('blitpunkCanvas')

const { resourceLibrary, textureLibrary } = el

const timeUniform = new ShaderUniformVariable('time')
const resolutionUniform = new ShaderUniformVariable('resolution')
const projection = new Projection({
  sizeFit: 'contain',
  desiredWidth: 256,
  desiredHeight: 512
})

const trianglePool = initSprites()
const trianglePoolAttribs = new ShaderVariableBufferGroup(trianglePool)

const quadsPool = initQuads(resourceLibrary)
const quadsPoolAttribs = new ShaderVariableBufferGroup(quadsPool)

const quadIndices = ElementIndexArray.Generate(10, [0, 1, 2, 0, 2, 3], 4)
const triangleIndices = ElementIndexArray.Generate(4, [0, 1, 2], 3)

const program = new ShaderProgram(
    new ShaderSource(ShaderSource.VERTEX_SHADER, document.getElementById('vs')),
    new ShaderSource(ShaderSource.FRAGMENT_SHADER, document.getElementById('fs')))

const prgSimple = new ShaderProgram(
  resourceLibrary.findVertexShader('simple'),
  resourceLibrary.findFragmentShader('simple'))

// ------- animate frame ----------------------------- /// // ----

el.on('animateFrame', function (canvas) {
  projection.update(canvas.width, canvas.height)
  timeUniform.value = el.time
  resolutionUniform.value = [ el.width, el.height ]
})

// ------- sync textures ---------------------------- /// // ----

textureLibrary
  .loadTexture('nobinger', 'nobinger.png')
  .then(texture => {
    window.q0.setTexCoordsByTexture(texture)
    window.q1.setTexCoordsByTexture(texture)
  })

const nobingerTextures = new ShaderTextureGroup(textureLibrary, { tex: 'nobinger' })

// ------- render frame ----------------------------- /// // ----

el.on('renderFrame', function (renderer) {
  const { shaderContext } = renderer

  //
  // Shader variables
  //
  shaderContext.pushVar(timeUniform)
  shaderContext.pushVar(resolutionUniform)
  shaderContext.pushVar(trianglePoolAttribs)

  //
  // Load gpu program
  //
  renderer.useShaderProgram(program)

  //
  // Render geometry
  //
  renderer.drawIndexed('TRIANGLES', triangleIndices)  // renderer.drawArrays('TRIANGLES', 12)

  // ======================
  // draw textured quads
  // ======================

  // textureLibrary.whenLoaded('nobinger', 'tex', texUniform => {
  nobingerTextures.whenLoaded(texUniforms => {
    shaderContext.pushVar(texUniforms)
    shaderContext.pushVar(projection.uniform)
    shaderContext.pushVar(quadsPoolAttribs)

    renderer.useShaderProgram(prgSimple)

    renderer.drawIndexed('TRIANGLES', quadIndices)
  })
})
