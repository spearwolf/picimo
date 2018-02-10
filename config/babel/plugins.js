module.exports = (plugins = []) => [
  'syntax-dynamic-import',
  'transform-class-properties',
  'transform-object-rest-spread'
].concat(plugins)
