import addCommonSprites from './sprites'

export default class SpriteLibrary {
  constructor () {
    this.descriptors = new Map()

    addCommonSprites(this)
  }

  addDescriptor (name, descriptor) {
    this.descriptors.set(name, descriptor)
    return this
  }

  findDescriptor (name) {
    return this.descriptors.get(name)
  }
}
