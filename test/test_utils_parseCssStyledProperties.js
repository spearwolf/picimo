/* eslint-env mocha */
/* eslint-env browser */
import { expect } from 'chai'
import parse, {
  splitIntoPropTokens,
  splitIntoProps,
  indexOfNextNonWhitespace,
  indexOfNextSeperator
} from 'blitpunk/utils/parseCssStyledProperties.js'

describe('parseCssStyledProperties()', () => {
  describe('indexOfNextSeperator', () => {
    it('empty string', () => {
      expect(indexOfNextSeperator('', 0)).to.equal(0)
    })
    it('blank string', () => {
      expect(indexOfNextSeperator('   ', 0)).to.equal(3)
    })
    it('a semicolon', () => {
      expect(indexOfNextSeperator(';', 0)).to.equal(0)
    })
    it('mutiple chars followed by a semicolon', () => {
      expect(indexOfNextSeperator('x z;', 0)).to.equal(3)
    })
    it('double quotes', () => {
      expect(indexOfNextSeperator('x: "z;\\"";', 0)).to.equal(9)
    })
    it('single quotes', () => {
      expect(indexOfNextSeperator('x: \'z; " \' ;', 0)).to.equal(11)
    })
    it('brackets', () => {
      expect(indexOfNextSeperator('x: (z;\\");', 0)).to.equal(9)
    })
  })

  describe('indexOfNextNonWhitespace', () => {
    it('no whitespace', () => {
      expect(indexOfNextNonWhitespace('x', 0)).to.equal(0)
    })
    it('one whitespace', () => {
      expect(indexOfNextNonWhitespace(' x', 0)).to.equal(1)
    })
    it('multiple whitespaces', () => {
      expect(indexOfNextNonWhitespace('   x', 0)).to.equal(3)
    })
    it('empty string', () => {
      expect(indexOfNextNonWhitespace('', 0)).to.equal(0)
    })
    it('multiple whitespaces until end of string', () => {
      expect(indexOfNextNonWhitespace('     ', 0)).to.equal(5)
    })
  })

  describe('splitIntoProps', () => {
    it('should work', () => {
      expect(splitIntoProps(' a:b  ;  c: d')).to.eql([
        { key: 'a', value: 'b' },
        { key: 'c', value: 'd' }
      ])
    })
    it('should respect double quotes', () => {
      expect(splitIntoProps(' a: "basd ;"  ;  c: d')).to.eql([
        { key: 'a', value: '"basd ;"' },
        { key: 'c', value: 'd' }
      ])
    })
    it('a single value', () => {
      expect(splitIntoProps(' abc(";) ')).to.eql([
        { value: 'abc(";)' }
      ])
    })
    it('multiple values', () => {
      expect(splitIntoProps(' abc(";) ; 123.0;')).to.eql([
        { value: 'abc(";)' },
        { value: '123.0' }
      ])
    })
    it('empty string', () => {
      expect(splitIntoProps('')).to.equal(undefined)
    })
    it('blank string', () => {
      expect(splitIntoProps('   ')).to.eql([])
    })
    it('blank string with colons and semicolons', () => {
      expect(splitIntoProps(' ;; ; ;:;;  : ;; ;')).to.eql([])
    })
  })

  describe('splitIntoPropTokens', () => {
    it('should work', () => {
      expect(splitIntoPropTokens(' a:b  ;  c: d')).to.eql([
        'a:b  ', 'c: d'
      ])
    })
  })

  describe('parse', () => {
    it('should return an object with properties separated by ";"', () => {
      expect(parse('a: 123; b: foo')).to.eql({
        a: 123,
        b: 'foo'
      })
    })

    describe('should transform single values', () => {
      it('url(...)', () => {
        const url = parse('url( http://foo.bar.de/plah.index.html?q=1 )')
        expect(url).to.be.instanceOf(URL)
        expect(url.href).to.be.equal('http://foo.bar.de/plah.index.html?q=1')
      })
      it('vec4(<number>, <number>, <number>)', () => {
        const vec4 = parse('vec4(-2, 4, -8, 16)')
        expect(vec4).to.be.instanceOf(Float32Array)
        expect(vec4[0]).to.be.equal(-2)
        expect(vec4[1]).to.be.equal(4)
        expect(vec4[2]).to.be.equal(-8)
        expect(vec4[3]).to.be.equal(16)
      })
      it('vec3(<number>, <number>, <number>)', () => {
        const vec3 = parse('vec3(-2, 4, -8)')
        expect(vec3).to.be.instanceOf(Float32Array)
        expect(vec3[0]).to.be.equal(-2)
        expect(vec3[1]).to.be.equal(4)
        expect(vec3[2]).to.be.equal(-8)
      })
      it('vec2(<number>, <number>)', () => {
        const m = parse('foo: vec2(-2, 4)')
        expect(m.foo).to.be.instanceOf(Float32Array)
        expect(m.foo[0]).to.be.equal(-2)
        expect(m.foo[1]).to.be.equal(4)
      })
      it('[<number>, <number>, ...]', () => {
        const m = parse('bar:  [ 1, 2, 3, 4, 5, 6, 7, 8, 9.001]')
        expect(m.bar).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9.001])
      })
      it('single-quotes string', () => {
        expect(parse('\'foo\'')).to.be.equal('foo')
      })
      it('double-quotes string', () => {
        expect(parse(' "foo"')).to.be.equal('foo')
      })
      it('positive integer', () => {
        expect(parse('123')).to.be.equal(123)
      })
      it('negative integer', () => {
        expect(parse('-123')).to.be.equal(-123)
      })
      it('positive float', () => {
        expect(parse('4.567')).to.be.equal(4.567)
      })
      it('negative float', () => {
        expect(parse('-66.123')).to.be.equal(-66.123)
      })
      it('truthy boolean', () => {
        expect(parse('true')).to.be.equal(true)
      })
      it('falsy boolean', () => {
        expect(parse('false')).to.be.equal(false)
      })
      it('null', () => {
        expect(parse('null')).to.be.equal(null)
      })
      it('undefined', () => {
        expect(parse('undefined')).to.be.equal(undefined)
      })
    })

    describe('should return unprocessed input if input is ..', () => {
      it('undefined', () => {
        expect(parse()).to.be.equal(undefined)
      })
      it('null', () => {
        expect(parse(null)).to.be.equal(null)
      })
      it('a number', () => {
        expect(parse(123)).to.be.equal(123)
      })
      it('a boolean', () => {
        expect(parse(true)).to.be.equal(true)
      })
      it('an object', () => {
        const o = {}
        expect(parse(o)).to.be.equal(o)
      })
      it('a function', () => {
        const f = () => true
        expect(parse(f)).to.be.equal(f)
      })
    })

    describe('should parse json like input', () => {
      it('json as single value', () => {
        expect(parse('{ "fo;o": 123, "bar": "pla;h", "plah": true }')).to.eql({
          'fo;o': 123,
          bar: 'pla;h',
          plah: true
        })
      })
      it('as value inside css like properties', () => {
        expect(parse('abc: 456; def: { "fo;o": 123, "bar": "pla;h", "plah": true }; ghi: 789')).to.eql({
          abc: 456,
          def: {
            'fo;o': 123,
            bar: 'pla;h',
            plah: true
          },
          ghi: 789
        })
      })
    })
  })
})
