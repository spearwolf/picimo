/* eslint-env mocha */
import assert from 'assert';

import { Projection } from '../Projection';

describe('Projection', () => {
  it('new without args', () => {
    const cam = new Projection();
    assert.ok(cam);
  });

  describe('findMatchingRule()', () => {
    let cam;

    before(() => {
      cam = new Projection({
        rules: [ 
          {
            id: 1, // id is not needed - used for testing only
            constraints: {
              minWidth: 1000,
              minHeight: 1000,
            },
          },
          {
            id: 2,
            constraints: {
              orientation: 'portrait',
              maxWidth: 500,
            },
          },
          {
            id: 3,
            constraints: {
              orientation: 'landscape',
              maxHeight: 500,
            },
          },
          {
            id: 4,
          }
        ]
      });
    })

    it('config without rules', () => {
      assert.strictEqual(new Projection().findMatchingRule(320, 240), undefined);
    });

    it('orientation: portrait', () => {
      const rule = cam.findMatchingRule(240, 320);
      assert.ok(rule && rule.id === 2);
    });

    it('orientation: landscape', () => {
      const rule = cam.findMatchingRule(320, 240);
      assert.ok(rule && rule.id === 3);
    });

    it('minWidth and minHeight', () => {
      const rule = cam.findMatchingRule(2000, 2000);
      assert.ok(rule && rule.id === 1);
    });

    it('last fallback rule', () => {
      const rule = cam.findMatchingRule(800, 800);
      assert.ok(rule);
      assert.strictEqual(rule.id, 4);
    });
  });

});
