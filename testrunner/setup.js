/* global mocha */
require('mocha/mocha.js')

mocha.setup('bdd')

require('./tests')

mocha.checkLeaks()
mocha.run()
