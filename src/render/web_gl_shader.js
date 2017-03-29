import ShaderSource from '../core/shader_source'
import sourceToStr from '../utils/shader_helpers/source_to_str'

export default class WebGlShader {
  constructor (glx, source) {
    this.glx = glx

    if (!(source instanceof ShaderSource)) {
      throw new Error('WebGlShader panic! source must be an instance of ShaderSource!')
    }
    this.source = source

    const { gl } = glx
    this.shaderType = gl[source.type]

    this.glShader = gl.createShader(this.shaderType)
    compileShader(this)

    Object.freeze(this)
  }
}

function compileShader (shader) {
  const { gl } = shader.glx
  const { glShader, source } = shader

  const src = sourceToStr({ glx: shader.glx }, source.source)

  gl.shaderSource(glShader, src)
  gl.compileShader(glShader)

  if (!gl.getShaderParameter(glShader, gl.COMPILE_STATUS)) {
    const shaderInfoLog = gl.getShaderInfoLog(glShader)

    console.error(shaderInfoLog)
    console.group('shader-info')
    console.debug('shaderSource', shader)
    console.log(source)
    console.groupEnd()

    const err = new Error('WebGlShader compile panic!')
    err.webGlShader = shader
    err.shaderInfoLog = shaderInfoLog
    throw err
  }
}
