import initSprites from './init_sprites'

import ShaderSource from '../../src/core/shader_source'
import ShaderProgram from '../../src/core/shader_program'
import ShaderContext from '../../src/core/shader_context'
import ShaderUniformVariable from '../../src/core/shader_uniform_variable'

import defineBlitpElements from '../../src/dom/define_blitp_elements'

// ----- init ---------

defineBlitpElements()

const sCtx = new ShaderContext()
sCtx.pushVar(new ShaderUniformVariable('time'))
sCtx.pushVar(new ShaderUniformVariable('resolution'))

const el = document.getElementById('blitpunkCanvas')
const voPool = initSprites(el.glx)

const program = new ShaderProgram(
    new ShaderSource(ShaderSource.VERTEX_SHADER, document.getElementById('vs')),
    new ShaderSource(ShaderSource.FRAGMENT_SHADER, document.getElementById('fs')))

// ------- render frame ----------------------------- /// // ----

el.on('renderFrame', function () {
  const { gl } = el.glx

  // Update shader context

  sCtx.curUniform('time').value = el.time
  sCtx.curUniform('resolution').value = [ el.width, el.height ]

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  // Load program into GPU

  const currentProgram = el.glx.resourceLibrary.loadProgram(program)

  currentProgram.use()
  currentProgram.loadUniforms(sCtx)

  // Render geometry

  const buffer = el.glx.resourceLibrary.findBuffer(voPool)

  buffer.bindBuffer()
  currentProgram.attributes.position.vertexAttribPointer(voPool.descriptor)

  gl.enableVertexAttribArray(currentProgram.attributes.position.location)

  gl.drawArrays(gl.TRIANGLES, 0, 12)

  gl.disableVertexAttribArray(currentProgram.attributes.position.location)
})

// ----- animation startup -----

el.animate()
