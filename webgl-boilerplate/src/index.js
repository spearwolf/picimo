import initSprites from './init_sprites'

import ShaderSource from '../../src/core/shader_source'
import ShaderProgram from '../../src/core/shader_program'
import ShaderUniformVariable from '../../src/core/shader_uniform_variable'
import ShaderVariableBufferGroup from '../../src/core/shader_variable_buffer_group'

import defineBlitpElements from '../../src/dom/define_blitp_elements'

// ----- init ---------

defineBlitpElements()

const timeUniform = new ShaderUniformVariable('time')
const resolutionUniform = new ShaderUniformVariable('resolution')

const el = document.getElementById('blitpunkCanvas')
const voPool = initSprites()
const bufferAttribs = new ShaderVariableBufferGroup(voPool)

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
  renderer.glx.resourceLibrary.loadBuffer(voPool.voArray).bufferData()
})

// ------- render frame ----------------------------- /// // ----

el.on('renderFrame', function (renderer) {
  //
  // Shader variables
  //
  const { shaderContext } = renderer

  shaderContext.pushVar(timeUniform)
  shaderContext.pushVar(resolutionUniform)
  bufferAttribs.pushVar(shaderContext)

  //
  // Load gpu program
  //
  const { glx } = renderer
  const currentProgram = glx.resourceLibrary.loadProgram(program)
  currentProgram.use()
  currentProgram.loadUniforms(shaderContext)
  currentProgram.loadAttributes(shaderContext)

  //
  // Render geometry
  //
  const { gl } = glx
  gl.enableVertexAttribArray(currentProgram.attributes.position.location)

  gl.drawArrays(gl.TRIANGLES, 0, 12)

  gl.disableVertexAttribArray(currentProgram.attributes.position.location)
})

// ----- animation startup -----

el.animate()
