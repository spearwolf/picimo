/* eslint-env mocha */
import '@babel/polyfill';
import 'mocha/mocha';

mocha.setup({
  ui: 'bdd',
  noHighlighting: true,
});

describe('utils', () => {

  require('../src/utils/findNextPowerOf2.spec.js');
  require('../src/utils/get.spec.js');
  require('../src/utils/isPowerOf2.spec.js');
  require('../src/utils/maxOf.spec.js');
  require('../src/utils/pick.spec.js');

});

describe('core', () => {

  require('../src/core/AABB2.spec.js');
  require('../src/core/DataRef.spec.js');

});

describe('sprites', () => {

  require('../src/sprites/VOArray/VOArray.spec.js');
  require('../src/sprites/VODescriptor/VODescriptor.spec.js');
  require('../src/sprites/VOPool/VOPool.spec.js');

});

mocha.checkLeaks();
mocha.run();
