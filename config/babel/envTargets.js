const variants = {
  legacy: /* or bootstrap */ {
    edge: '15',
    firefox: '54',
    ie: '11',
    ios_saf: '10.2',
    safari: '10.1'
  },
  modern: /* or es6-module */ {
    chrome: '62',
    firefox: '57',
    safari: '11'
  }
}

module.exports = variant => variants[variant]
