/* eslint-env mocha */
import assert from 'assert';

import {VERSION} from '..';

describe('picimo_r3f', () => {
  it('should have VERSION constant defined', () => {
    assert.ok(typeof VERSION === 'string');
  });
});
