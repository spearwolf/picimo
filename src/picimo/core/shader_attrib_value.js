import VOArray from './v_o_array'

export default class ShaderAttribValue {
  constructor (name, descriptor, bufferSource) {
    this.name = name
    this.descriptor = descriptor
    this.bufferSource = bufferSource
  }

  get attrDescriptor () {
    return this.descriptor.attr[this.name]
  }

  get resourceRef () {
    const { bufferSource } = this
    return (bufferSource instanceof VOArray
      ? bufferSource.resourceRef
      : bufferSource.voArray.resourceRef)
  }
}
