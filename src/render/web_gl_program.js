import WebGlUniform from './web_gl_uniform'
import WebGlAttribute from './web_gl_attribute'

export default class WebGlProgram {
  constructor (glx, shaderProgram) {
    this.glx = glx

    this.vertexShader = glx.resourceLibrary.loadVertexShader(shaderProgram.vertexShader)
    this.fragmentShader = glx.resourceLibrary.loadFragementShader(shaderProgram.fragmentShader)

    const { gl } = glx
    this.glProgram = gl.createProgram()

    linkProgram(this, this.vertexShader.glShader, this.fragmentShader.glShader)
    // TODO gl.deleteShader?

    createUniforms(this)
    createAttributes(this)

    Object.freeze(this)
  }

  /**
   * @return {boolean}
   */
  use () {
    const { glx } = this
    if (glx.useProgram(this.glProgram)) {
      glx.enableVertexAttribArrays(this.attributeLocations)
      return true
    }
    return false
  }

  /**
   * @param {ShaderContext} shaderContext
   */
  loadUniforms (shaderContext) {
    this.uniformNames.forEach(name => {
      let shaderVar = shaderContext.curUniform(name)
      if (shaderVar == null) {
        shaderVar = shaderContext.curTex2d(name)
        shaderVar.bindTexture(this.glx)
      }
      this.uniforms[name].setValue(shaderVar.value)
    })
  }

  /**
   * sync buffer before load
   *
   * @param {ShaderContext} shaderContext
   */
  loadAttributes (shaderContext) {
    const { resourceLibrary } = this.glx
    this.attributeNames.forEach(name => {
      const attribValue = shaderContext.curAttrib(name).value
      // const buffer = resourceLibrary.findBuffer(attribValue.resourceRef).resource
      // --- WebGlRenderer.syncBuffer ---
      const { resourceRef } = attribValue
      const bufferRef = resourceLibrary.loadBuffer(resourceRef)
      bufferRef.sync(resourceRef, buffer => buffer.bufferData(resourceRef.hints.typedArray))
      // --------------------------------
      // buffer.bindBuffer()
      bufferRef.resource.bindBuffer()
      this.attributes[name].vertexAttribPointer(attribValue.descriptor)
    })
  }
}

/** @private */
function createAttributes (program) {
  const { gl } = program.glx
  const len = gl.getProgramParameter(program.glProgram, gl.ACTIVE_ATTRIBUTES)

  program.attributes = {}
  program.attributeNames = []
  program.attributeLocations = []

  for (let i = 0; i < len; ++i) {
    const attrib = new WebGlAttribute(program, i)
    program.attributes[attrib.name] = attrib
    program.attributeNames.push(attrib.name)
    program.attributeLocations.push(attrib.location)
  }

  Object.freeze(program.attributes)
}

/** @private */
function createUniforms (program) {
  const { gl } = program.glx
  const len = gl.getProgramParameter(program.glProgram, gl.ACTIVE_UNIFORMS)

  program.uniforms = {}
  program.uniformNames = []

  for (let i = 0; i < len; ++i) {
    const uniform = new WebGlUniform(program, i)
    program.uniforms[uniform.name] = uniform
    program.uniformNames.push(uniform.name)
  }

  Object.freeze(program.uniforms)
}

/** @private */
function linkProgram (program, vertexShader, fragmentShader) {
  const { gl } = program.glx
  const { glProgram } = program

  gl.attachShader(glProgram, vertexShader)
  gl.attachShader(glProgram, fragmentShader)

  gl.linkProgram(glProgram)

  if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
    const err = new Error('WebGlProgram link panic!')
    err.webGlProgram = program
    throw err
  }
}
