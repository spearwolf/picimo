import { GL_ITEM_TYPES } from '../utils/typed_array_helpers'

const glType = (gl, type) => gl[GL_ITEM_TYPES[type]]

export default class WebGlAttribute {

  constructor (program, index) {
    this.program = program
    this.glx = program.glx

    const { gl } = program.glx
    const { glProgram } = program

    const { name, size, type } = gl.getActiveAttrib(glProgram, index)
    this.name = name
    this.size = size
    this.type = type

    this.location = gl.getAttribLocation(glProgram, name)

    Object.freeze(this)
  }

  /**
   * @param {VODescriptor} descriptor
   */
  vertexAttribPointer (descriptor) {
    const { gl } = this.glx
    const attr = descriptor.attr[this.name]
    const type = glType(gl, attr.type)
    gl.vertexAttribPointer(this.location, attr.size, type, false, descriptor.bytesPerVertex, attr.byteOffset)
  }

}

