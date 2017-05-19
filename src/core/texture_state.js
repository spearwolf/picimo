
export default class TextureState {
  constructor (texture) {
    this.texture = null
    this.promise = Promise.resolve(texture)
      .then(tex => {
        this.texture = tex
        return tex
      })
      .catch(err => {
        console.error('TextureState error:', err)
      })
  }

  get isReady () {
    return this.texture != null
  }
}
