/* eslint-env mocha */
import assert from 'assert'
import { assetUrl } from './utils'
import TextureAtlas from '../src/core/texture_atlas'

describe('TextureAtlas', function () {
  describe('new TextureAtlas(jsonDef)', function () {
    let atlas

    before(function (done) {
      window.fetch(assetUrl('nobinger.json'))
        .then(response => response.json())
        .then(json => {
          atlas = new TextureAtlas(json)
          done()
        })
    })

    it('jsonDef', function () {
      assert.ok(atlas.jsonDef)
    })
    it('frameNames', () => assert.deepEqual(atlas.frameNames, [
      'nobinger-blau.png',
      'nobinger-gold.png',
      'nobinger-grau.png',
      'nobinger-gruen.png',
      'nobinger-lila.png',
      'nobinger-rot.png'
    ]))

    describe('createTextures', function () {
      let frames
      before(function (done) {
        atlas.createTextures(assetUrl(atlas.imageUrl)).then(function (textureAtlasFrames) {
          frames = textureAtlasFrames
          done()
        })
      })
      it('root texture', function () {
        const tex = frames.get('nobinger-blau.png').root
        assert.ok(tex)
        assert.equal(tex.root, tex)
        assert.equal(tex.width, 128)
        assert.equal(tex.height, 256)
      })
      it('frame: nobinger-blau.png', function () {
        const tex = frames.get('nobinger-blau.png')
        assert.ok(tex)
        assert(tex.root !== tex)
        assert.equal(tex.width, 55)
        assert.equal(tex.height, 61)
      })
    })
  })
})
