export default {
  vertexCount: 4,

  // +-+-+-+-+ +-+-+-+-+
  // |0|1|2|3| |4|5|6|7|
  // +-+-+-+-+ +-+-+-+-+
  //
  // |x|y|                   (3) pos: x, y  (position)
  //     |s|t|               (2) uv: s, t   (texture coordinates)
  //

  attributes: [
    { name: 'pos', type: 'float32', size: 2, attrNames: [ 'x', 'y' ] },
    { name: 'uv', type: 'float32', size: 2, attrNames: [ 's', 't' ] }
  ]
}
