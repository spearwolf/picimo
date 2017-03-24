import initSprites from './init_sprites'

import ShaderSource from '../../src/core/shader_source'
import ShaderProgram from '../../src/core/shader_program'
import ShaderUniformVariable from '../../src/core/shader_uniform_variable'
import ShaderVariableBufferGroup from '../../src/core/shader_variable_buffer_group'

import defineBlitpElements from '../../src/dom/define_blitp_elements'

import PowerOf2Image from '../../src/core/power_of_2_image'
import Texture from '../../src/core/texture'
import ElementIndexArray from '../../src/core/element_index_array'

// ----- init ---------

window.PowerOf2Image = PowerOf2Image

defineBlitpElements()

const timeUniform = new ShaderUniformVariable('time')
const resolutionUniform = new ShaderUniformVariable('resolution')

const el = document.getElementById('blitpunkCanvas')
const voPool = initSprites()
const voPoolAttribs = new ShaderVariableBufferGroup(voPool)

const quadIndices = ElementIndexArray.Generate(10, [0, 1, 2, 0, 2, 3], 4)

const program = new ShaderProgram(
    new ShaderSource(ShaderSource.VERTEX_SHADER, document.getElementById('vs')),
    new ShaderSource(ShaderSource.FRAGMENT_SHADER, document.getElementById('fs')))

// ------- animate frame ----------------------------- /// // ----

el.on('animateFrame', function () {
  timeUniform.value = el.time
  resolutionUniform.value = [ el.width, el.height ]
})

// ------- sync buffers ----------------------------- /// // ----

el.on('syncBuffers', function (renderer) {
  renderer.syncBuffer(voPool.voArray)
  renderer.syncBuffer(quadIndices)
})

// ------- sync textures ---------------------------- /// // ----

Texture.load('nobinger.png').then(texture => {
  el.on('syncTextures', function (renderer) {
    renderer.syncTexture(texture)
  })
})

// ------- render frame ----------------------------- /// // ----

el.on('renderFrame', function (renderer) {
  const { shaderContext } = renderer

  //
  // Shader variables
  //
  shaderContext.pushVar(timeUniform)
  shaderContext.pushVar(resolutionUniform)
  shaderContext.pushVar(voPoolAttribs)

  //
  // Load gpu program
  //
  renderer.useShaderProgram(program)

  //
  // Render geometry
  //
  renderer.drawArrays('TRIANGLES', 12)
})

// ----- animation startup -----

el.animate()
