
export default class TextureState {
  constructor (texture, atlas) {
    this.texture = null
    this.atlas = null
    this.promise = Promise.resolve(texture)
      .then(tex => {
        this.texture = tex
        return tex
      })
      .catch(err => {
        console.error('TextureState error:', err)
      })
    Promise.resolve(atlas).then((atlas) => {
      this.atlas = atlas
    })
  }

  get isReady () {
    return this.texture != null
  }
}
