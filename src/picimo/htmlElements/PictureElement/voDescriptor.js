export default {
  vertexCount: 4,

  // +-+-+-+-+ +-+-+-+-+
  // |0|1|2|3| |4|5|6|7|
  // +-+-+-+-+ +-+-+-+-+
  //
  // |o-o|                   (3) position: x, y
  //     |o-o|               (2) tex-coords: s, t
  //

  attributes: [
    { name: 'pos', type: 'float32', size: 2, attrNames: [ 'x', 'y' ] },
    { name: 'uv', type: 'float32', size: 2, attrNames: [ 's', 't' ] }
  ]
}
