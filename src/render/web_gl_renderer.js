import eventize from '@spearwolf/eventize'

import ShaderContext from '../core/shader_context'

export default class WebGlRenderer {
  constructor (glx) {
    Object.defineProperty(this, 'glx', { value: glx })

    this.shaderContext = new ShaderContext()

    eventize(this)
  }

  renderFrame (scene) {
    this.shaderContext.clear()
    scene.emit('animateFrame', scene)
    this.renderBegin()
    scene.emit('syncBuffers', this)
    scene.emit('syncTextures', this)
    scene.emit('renderFrame', this)
    this.renderEnd()
  }

  renderBegin () {
    this.clearFrameBuffer()
  }

  renderEnd () {
  }

  clearFrameBuffer () {
    const { gl } = this.glx

    let clear = gl.COLOR_BUFFER_BIT
    if (this.glx.DEPTH_BITS > 0) clear = clear | gl.DEPTH_BUFFER_BIT

    gl.clear(clear)
  }
}
