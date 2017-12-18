/** @private */
export default `
  precision mediump float;

  varying vec4 vUvOpacity;
  uniform sampler2D tex;

  void main(void) {
    gl_FragColor = vUvOpacity.z * texture2D(tex, vUvOpacity.st);
  }
`
