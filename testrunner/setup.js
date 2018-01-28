/* global mocha */
require('mocha/mocha.js')

mocha.setup({
  ui: 'bdd',
  noHighlighting: true
})

require('./tests')

mocha.checkLeaks()
mocha.run()
