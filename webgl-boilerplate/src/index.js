import ShaderSource from '../../src/core/shader_source'
import ShaderProgram from '../../src/core/shader_program'
import ShaderUniformVariable from '../../src/core/shader_uniform_variable'
import ShaderTexture2dVariable from '../../src/core/shader_texture_2d_variable'
import ShaderVariableBufferGroup from '../../src/core/shader_variable_buffer_group'

import defineBlitpElements from '../../src/dom/define_blitp_elements'

import PowerOf2Image from '../../src/core/power_of_2_image'
import Texture from '../../src/core/texture'
import ElementIndexArray from '../../src/core/element_index_array'

import ResourceLibrary from '../../src/core/resource_library'

import Mat4 from '../../src/utils/mat4'

import initSprites from './init_sprites'
import initQuads from './init_quads'

// ----- init ---------

window.PowerOf2Image = PowerOf2Image

const resourceLibrary = new ResourceLibrary()
window.resourceLibrary = resourceLibrary

defineBlitpElements()

const timeUniform = new ShaderUniformVariable('time')
const resolutionUniform = new ShaderUniformVariable('resolution')
const viewMatrixUniform = new ShaderUniformVariable('viewMatrix', new Mat4())  // TODO set viewMatrix by <scene .. viewport />

const texUniform = new ShaderTexture2dVariable('tex')

const el = document.getElementById('blitpunkCanvas')

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

el.on('animateFrame', function () {
  timeUniform.value = el.time
  resolutionUniform.value = [ el.width, el.height ]
})

// ------- sync buffers ----------------------------- /// // ----

el.on('syncBuffers', function (renderer) {
  quadsPool.voArray.touch()  // TODO autotouch for VOArray with DYNAMIC hint?
})

// ------- sync textures ---------------------------- /// // ----

Texture.load('nobinger.png').then(texture => {
  texUniform.texture = texture  // TODO auto-create shader-tex2d-var -> texture(resource)Library?

  window.q0.setTexCoordsByTexture(texture)
  window.q1.setTexCoordsByTexture(texture)
})

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

  shaderContext.pushVar(texUniform)
  shaderContext.pushVar(viewMatrixUniform)
  shaderContext.pushVar(quadsPoolAttribs)

  renderer.useShaderProgram(prgSimple)

  renderer.drawIndexed('TRIANGLES', quadIndices)
})

// ----- animation startup -----

el.animate()
