/* eslint-env mocha */
import assert from 'assert';

import { calcViewSize } from '../Projection';

describe('calcViewSize()', () => {

  describe('pixelZoom', () => {
    it('pixelZoom=1', () => {
      const [width, height] = calcViewSize(5000, 2000, { pixelZoom: 1 });
      assert.strictEqual(width, 5000);
      assert.strictEqual(height, 2000);
    });

    it('pixelZoom=2', () => {
      const [width, height] = calcViewSize(5000, 2000, { pixelZoom: 2 });
      assert.strictEqual(width, 2500);
      assert.strictEqual(height, 1000);
    });
  });

  describe('fill', () => {
    it('landscape view', () => {
      const [width, height] = calcViewSize(5000, 2000, {
        fit: 'fill',
        width: 666,
        height: 999,
      });
      assert.strictEqual(width, 666);
      assert.strictEqual(height, 999);
    });

    it('portrait view', () => {
      const [width, height] = calcViewSize(3000, 1000, {
        fit: 'fill',
        width: 888,
        height: 777,
      });
      assert.strictEqual(width, 888);
      assert.strictEqual(height, 777);
    });

    it('quadric view', () => {
      const [width, height] = calcViewSize(1000, 1000, {
        fit: 'fill',
        width: 444,
        height: 333,
      });
      assert.strictEqual(width, 444);
      assert.strictEqual(height, 333);
    });
  });

  describe('contain', () => {
    describe('landscape view', () => {
      describe('landscape layout', () => {
        it('view ratio < desired ratio', () => {
          const [width, height] = calcViewSize(4000, 2000, { fit: 'contain', width: 1000, height: 600 }); // 0.6
          assert.ok(width > 1000);
          assert.strictEqual(height, 600);
        });
      });

      describe('landscape layout', () => {
        it('view ratio > desired ratio', () => {
          const [width, height] = calcViewSize(4000, 2000, { fit: 'contain', width: 400, height: 120 }); // 0.3
          assert.strictEqual(width, 400);
          assert.ok(height > 120);
        });
      });

      it('portrait layout', () => {
        const [width, height] = calcViewSize(4000, 2000, { fit: 'contain', width: 600, height: 1000 });
        assert.ok(width > 600);
        assert.strictEqual(height, 1000);
      });

      it('quadric layout', () => {
        const [width, height] = calcViewSize(4000, 2000, { fit: 'contain', width: 800, height: 800 });
        assert.ok(width > 800);
        assert.strictEqual(height, 800);
      });
    });

    describe('portrait view', () => {
      describe('portrait layout', () => {
        it('view ratio > desired ratio', () => {
          const [width, height] = calcViewSize(2000, 4000, { fit: 'contain', width: 600, height: 1000 }); // 1.66
          assert.strictEqual(width, 600);
          assert.ok(height > 1000);
        });
      });

      describe('portrait layout', () => {
        it('view ratio < desired ratio', () => {
          const [width, height] = calcViewSize(2000, 4000, { fit: 'contain', width: 120, height: 400 }); // 3.33
          assert.ok(width > 120);
          assert.strictEqual(height, 400);
        });
      });

      it('landscape layout', () => {
        const [width, height] = calcViewSize(2000, 4000, { fit: 'contain', width: 1000, height: 600 });
        assert.strictEqual(width, 1000);
        assert.ok(height > 600);
      });

      it('quadric layout', () => {
        const [width, height] = calcViewSize(2000, 4000, { fit: 'contain', width: 800, height: 800 });
        assert.strictEqual(width, 800);
        assert.ok(height, 800);
      });
    });

    describe('quadric view', () => {
      it('landscape layout', () => {
        const [width, height] = calcViewSize(4000, 4000, { fit: 'contain', width: 1000, height: 600 }); // 0.6 landscape
        assert.strictEqual(width, 1000);
        assert.ok(height > 600);
      });

      it('portrait layout', () => {
        const [width, height] = calcViewSize(4000, 4000, { fit: 'contain', width: 600, height: 1000 }); // 1.667 portrait
        assert.ok(width > 600);
        assert.strictEqual(height, 1000);
      });

      it('quadric layout', () => {
        const [width, height] = calcViewSize(4000, 4000, { fit: 'contain', width: 800, height: 800 }); // 1 quadric
        assert.strictEqual(width, 800);
        assert.strictEqual(height, 800);
      });
    });
  });

  describe('cover', () => {
    describe('landscape view', () => {
      describe('landscape layout', () => {
        it('view ratio < desired ratio', () => {
          const [width, height] = calcViewSize(4000, 2000, { fit: 'cover', width: 1000, height: 600 }); // 0.6
          assert.strictEqual(width, 1000);
          assert.ok(height < 600);
        });
      });

      describe('landscape layout', () => {
        it('view ratio > desired ratio', () => {
          const [width, height] = calcViewSize(4000, 2000, { fit: 'cover', width: 400, height: 120 }); // 0.3
          assert.ok(width < 400);
          assert.strictEqual(height, 120);
        });
      });

      it('portrait layout', () => {
        const [width, height] = calcViewSize(4000, 2000, { fit: 'cover', width: 600, height: 1000 });
        assert.strictEqual(width, 600);
        assert.ok(height < 1000);
      });

      it('quadric layout', () => {
        const [width, height] = calcViewSize(4000, 2000, { fit: 'cover', width: 800, height: 800 });
        assert.strictEqual(width, 800);
        assert.ok(height < 800);
      });
    });

    describe('portrait view', () => {
      describe('portrait layout', () => {
        it('view ratio > desired ratio', () => {
          const [width, height] = calcViewSize(2000, 4000, { fit: 'cover', width: 600, height: 1000 }); // 1.66
          assert.ok(width < 600);
          assert.strictEqual(height, 1000);
        });
      });

      describe('portrait layout', () => {
        it('view ratio < desired ratio', () => {
          const [width, height] = calcViewSize(2000, 4000, { fit: 'cover', width: 120, height: 400 }); // 3.33
          assert.strictEqual(width, 120);
          assert.ok(height < 400);
        });
      });

      it('landscape layout', () => {
        const [width, height] = calcViewSize(2000, 4000, { fit: 'cover', width: 1000, height: 600 });
        assert.ok(width < 1000);
        assert.strictEqual(height, 600);
      });

      it('quadric layout', () => {
        const [width, height] = calcViewSize(2000, 4000, { fit: 'cover', width: 800, height: 800 });
        assert.ok(width < 800);
        assert.strictEqual(height, 800);
      });
    });

    describe('quadric view', () => {
      it('landscape layout', () => {
        const [width, height] = calcViewSize(4000, 4000, { fit: 'cover', width: 1000, height: 600 }); // 0.6 landscape
        assert.ok(width < 1000);
        assert.strictEqual(height, 600);
      });

      it('portrait layout', () => {
        const [width, height] = calcViewSize(4000, 4000, { fit: 'cover', width: 600, height: 1000 }); // 1.667 portrait
        assert.strictEqual(width, 600);
        assert.ok(height < 1000);
      });

      it('quadric layout', () => {
        const [width, height] = calcViewSize(4000, 4000, { fit: 'cover', width: 800, height: 800 }); // 1 quadric
        assert.strictEqual(width, 800);
        assert.strictEqual(height, 800);
      });
    });
  });

});
