module.exports = (exclude = []) => [
  /node_modules\/(?!@spearwolf)/
].concat(exclude)
