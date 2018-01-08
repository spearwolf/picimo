import readTextureHints from '../shared/readTextureHints'

/** @private */
export default (el, src) => {
  if (el.previousSrc === src) return el.texturePromise
  el.previousSrc = src

  const textureHints = readTextureHints(el)

  el.texturePromise = el.textureLibrary
    .loadTexture(el.textureId, src, textureHints)
    .then((texture) => {
      el.texture = texture
      el.textureHints = textureHints

      // debug('[texture] texture loaded', texture)

      if (el.resolveTexturePromise) {
        el.resolveTexturePromise(texture)
        el.resolveTexturePromise = null
      }
      return texture
    })

  return el.texturePromise
}
