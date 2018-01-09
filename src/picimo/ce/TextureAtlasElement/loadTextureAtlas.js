import readTextureHints from '../shared/readTextureHints'

/** @private */
export default (el, src) => {
  if (el.previousSrc === src) return el.textureAtlasPromise
  el.previousSrc = src

  const textureHints = readTextureHints(el)
  el.textureAtlasPromise = el.textureLibrary
    .loadTextureAtlas(el.textureId, src, textureHints)
    .then((atlas) => {
      el.textureAtlas = atlas
      el.textureHints = textureHints

      // debug('[texture-atlas] textureAtlas loaded', atlas)

      if (el.resolveTextureAtlasPromise) {
        el.resolveTextureAtlasPromise(atlas)
        el.resolveTextureAtlasPromise = null
      }
      return atlas
    })

  return el.textureAtlasPromise
}
