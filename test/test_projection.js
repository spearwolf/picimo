/* eslint-env mocha */
import { expect } from 'chai'
import Projection from 'blitpunk/core/projection'

describe('Projection', () => {
  describe('fill', () => {
    it('works for landscape views', () => {
      const proj = new Projection({ sizeFit: 'fill', desiredWidth: 666, desiredHeight: 999 })
      proj.update(5000, 2000)
      expect(proj.width).to.equal(666)
      expect(proj.height).to.equal(999)
    })
    it('works for portrait views', () => {
      const proj = new Projection({ sizeFit: 'fill', desiredWidth: 888, desiredHeight: 777 })
      proj.update(3000, 1000)
      expect(proj.width).to.equal(888)
      expect(proj.height).to.equal(777)
    })
    it('works for quadric views', () => {
      const proj = new Projection({ sizeFit: 'fill', desiredWidth: 444, desiredHeight: 333 })
      proj.update(1000, 1000)
      expect(proj.width).to.equal(444)
      expect(proj.height).to.equal(333)
    })
  })

  describe('contain', () => {
    describe('works for landscape views', () => {
      describe('landscape layout', () => {
        it('view ratio < desired ratio', () => {
          const proj = new Projection({ sizeFit: 'contain', desiredWidth: 1000, desiredHeight: 600 })  // 0.6
          proj.update(4000, 2000)  // 0.5
          expect(proj.width).to.be.above(1000)
          expect(proj.height).to.equal(600)
        })
      })
      describe('landscape layout', () => {
        it('view ratio > desired ratio', () => {
          const proj = new Projection({ sizeFit: 'contain', desiredWidth: 400, desiredHeight: 120 })  // 0.3
          proj.update(4000, 2000)
          expect(proj.width).to.equal(400)
          expect(proj.height).to.be.above(120)
        })
      })
      it('portrait layout', () => {
        const proj = new Projection({ sizeFit: 'contain', desiredWidth: 600, desiredHeight: 1000 })
        proj.update(4000, 2000)
        expect(proj.width).to.be.above(600)
        expect(proj.height).to.equal(1000)
      })
      it('quadric layout', () => {
        const proj = new Projection({ sizeFit: 'contain', desiredWidth: 800, desiredHeight: 800 })
        proj.update(4000, 2000)
        expect(proj.width).to.be.above(800)
        expect(proj.height).to.equal(800)
      })
    })
    describe('works for portrait views', () => {
      describe('portrait layout', () => {
        it('view ratio > desired ratio', () => {
          const proj = new Projection({ sizeFit: 'contain', desiredWidth: 600, desiredHeight: 1000 })  // 1.66
          proj.update(2000, 4000)  // 2
          expect(proj.width).to.equal(600)
          expect(proj.height).to.be.above(1000)
        })
      })
      describe('portrait layout', () => {
        it('view ratio < desired ratio', () => {
          const proj = new Projection({ sizeFit: 'contain', desiredWidth: 120, desiredHeight: 400 })  // 3.33
          proj.update(2000, 4000)
          expect(proj.width).to.be.above(120)
          expect(proj.height).to.equal(400)
        })
      })
      it('landscape layout', () => {
        const proj = new Projection({ sizeFit: 'contain', desiredWidth: 1000, desiredHeight: 600 })
        proj.update(2000, 4000)
        expect(proj.width).to.equal(1000)
        expect(proj.height).to.be.above(600)
      })
      it('quadric layout', () => {
        const proj = new Projection({ sizeFit: 'contain', desiredWidth: 800, desiredHeight: 800 })
        proj.update(2000, 4000)
        expect(proj.width).to.equal(800)
        expect(proj.height).to.be.above(800)
      })
    })
  })

  describe('cover', () => {
    describe('works for landscape views', () => {
      describe('landscape layout', () => {
        it('view ratio < desired ratio', () => {
          const proj = new Projection({ sizeFit: 'cover', desiredWidth: 1000, desiredHeight: 600 })  // 0.6
          proj.update(4000, 2000)  // 0.5
          expect(proj.width).to.equal(1000)
          expect(proj.height).to.be.below(600)
        })
      })
      describe('landscape layout', () => {
        it('view ratio > desired ratio', () => {
          const proj = new Projection({ sizeFit: 'cover', desiredWidth: 400, desiredHeight: 120 })  // 0.3
          proj.update(4000, 2000)
          expect(proj.width).to.be.below(400)
          expect(proj.height).to.equal(120)
        })
      })
      it('portrait layout', () => {
        const proj = new Projection({ sizeFit: 'cover', desiredWidth: 600, desiredHeight: 1000 })
        proj.update(4000, 2000)
        expect(proj.width).to.equal(600)
        expect(proj.height).to.be.below(1000)
      })
      it('quadric layout', () => {
        const proj = new Projection({ sizeFit: 'cover', desiredWidth: 800, desiredHeight: 800 })
        proj.update(4000, 2000)
        expect(proj.width).to.equal(800)
        expect(proj.height).to.be.below(800)
      })
    })
    describe('works for portrait views', () => {
      describe('portrait layout', () => {
        it('view ratio > desired ratio', () => {
          const proj = new Projection({ sizeFit: 'cover', desiredWidth: 600, desiredHeight: 1000 })  // 1.66
          proj.update(2000, 4000)  // 2
          expect(proj.width).to.be.below(600)
          expect(proj.height).to.equal(1000)
        })
      })
      describe('portrait layout', () => {
        it('view ratio < desired ratio', () => {
          const proj = new Projection({ sizeFit: 'cover', desiredWidth: 120, desiredHeight: 400 })  // 3.33
          proj.update(2000, 4000)
          expect(proj.width).to.equal(120)
          expect(proj.height).to.be.below(400)
        })
      })
      it('landscape layout', () => {
        const proj = new Projection({ sizeFit: 'cover', desiredWidth: 1000, desiredHeight: 600 })
        proj.update(2000, 4000)
        expect(proj.width).to.be.below(1000)
        expect(proj.height).to.equal(600)
      })
      it('quadric layout', () => {
        const proj = new Projection({ sizeFit: 'cover', desiredWidth: 800, desiredHeight: 800 })
        proj.update(2000, 4000)
        expect(proj.width).to.be.below(800)
        expect(proj.height).to.equal(800)
      })
    })
  })
})
