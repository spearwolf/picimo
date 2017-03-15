/* eslint-env mocha */
import assert from 'assert'
import { assetUrl } from './utils'
import TextureAtlas from '../src/core/texture_atlas'
import TextureAtlasSpec from '../src/core/texture_atlas_spec'

describe('TextureAtlasSpec', function () {
  describe('new TextureAtlasSpec(jsonDef)', function () {
    let atlasSpec

    before(function (done) {
      window.fetch(assetUrl('nobinger.json'))
        .then(response => response.json())
        .then(json => {
          atlasSpec = new TextureAtlasSpec(json)
          done()
        })
    })

    it('jsonDef', function () {
      assert.ok(atlasSpec.jsonDef)
    })
    it('frameNames', () => assert.deepEqual(atlasSpec.frameNames, [
      'nobinger-blau.png',
      'nobinger-gold.png',
      'nobinger-grau.png',
      'nobinger-gruen.png',
      'nobinger-lila.png',
      'nobinger-rot.png'
    ]))

    describe('createTextureAtlas', function () {
      let atlas
      before(function (done) {
        atlasSpec.createTextureAtlas(assetUrl(atlasSpec.imageUrl)).then(function (textureAtlas) {
          atlas = textureAtlas
          done()
        })
      })
      it('root texture', function () {
        const tex = atlas.rootTexture
        assert.ok(tex)
        assert.equal(tex.root, tex)
        assert.equal(tex.width, 128)
        assert.equal(tex.height, 256)
      })
      it('frame: nobinger-blau.png', function () {
        const tex = atlas.getFrame('nobinger-blau.png')
        assert.ok(tex)
        assert(tex.root !== tex)
        assert.equal(tex.width, 55)
        assert.equal(tex.height, 61)
      })
    })
  })

  describe('TextureAtlas.load', () => {
    let atlas
    before(function (done) {
      TextureAtlas.load(assetUrl('nobinger.json'), null, (atlasSpec) => assetUrl(atlasSpec.meta.image)).then(textureAtlas => {
        atlas = textureAtlas
        done()
      })
    })
    it('spec.meta.format', () => assert.equal(atlas.spec.meta.format, 'RGBA8888'))
    it('rootTexture', () => assert.equal(atlas.rootTexture.width, 128))
  })
})
