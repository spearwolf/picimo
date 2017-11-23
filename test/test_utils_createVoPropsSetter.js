/* eslint-env mocha */
import { expect } from 'chai'
import VODescriptor from 'blitpunk/core/v_o_descriptor'
import createVoPropsSetter from 'blitpunk/utils/createVoPropsSetter.js'

describe('createVoPropsSetter()', () => {
  let descriptor

  before(() => {
    descriptor = new VODescriptor({
      // vertex buffer layout
      // --------------------
      //
      // v0: (x0)(y0)(z0)(rotate)(s0)(t0)(tx)(ty)(scale)(opacity)
      // v1: (x1)(y1)(z1)(rotate)(s1)(t1)(tx)(ty)(scale)(opacity)
      // v2: (x2)(y2)(z2)(rotate)(s2)(t2)(tx)(ty)(scale)(opacity)
      // v3: (x3)(y3)(z3)(rotate)(s3)(t3)(tx)(ty)(scale)(opacity)
      //
      vertexCount: 4,
      attributes: [
        { name: 'position', type: 'float32', size: 3, attrNames: [ 'x', 'y', 'z' ] },
        { name: 'rotate', type: 'float32', size: 1, uniform: true },
        { name: 'texCoords', type: 'float32', size: 2, attrNames: [ 's', 't' ] },
        { name: 'translate', type: 'float32', size: 2, attrNames: [ 'tx', 'ty' ], uniform: true },
        { name: 'scale', type: 'float32', size: 1, uniform: true },
        { name: 'opacity', type: 'float32', size: 1, uniform: true }
      ],
      aliases: {
        pos2d: { size: 2, type: 'float32', offset: 0 },
        posZ: { size: 1, type: 'float32', offset: 2, uniform: true },
        r: { size: 1, type: 'float32', offset: 3 },
        uv: 'texCoords'
      }
    })
  })

  describe('should create a valid vertex object properties setter function', () => {
    let setter

    before(() => {
      setter = createVoPropsSetter('scale: 2; opacity: 3; translate: vec2(4, -5); s1: 6; t2: 7')
    })

    it('is a function', () => {
      expect(typeof setter).to.be.equal('function')
    })

    it('set single value properties', () => {
      const vo = descriptor.createVO()
      setter(vo)
      expect(vo.scale).to.be.equal(2)
      expect(vo.opacity).to.be.equal(3)
    })

    it('set uniform array value properties and setters', () => {
      const vo = descriptor.createVO()
      setter(vo)
      expect(vo.toArray(['texCoords', 'translate', 'scale'])).to.eql([
        0, 0, 4, -5, 2,
        6, 0, 4, -5, 2,
        0, 7, 4, -5, 2,
        0, 0, 4, -5, 2
      ])
    })
  })
})
