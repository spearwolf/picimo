/** @private */
export default `
  attribute vec2 pos;
  attribute vec2 uv;

  uniform mat4 viewMatrix;
  uniform vec4 scale;
  uniform vec3 transform;

  varying vec4 vUvOpacity;

  void main(void)
  {
    gl_Position = viewMatrix * vec4((pos.xy * scale.xy) + transform.xy, transform.y, 1.0);
    vUvOpacity = vec4(uv.xy, 1.0, 0.0);
  }
`
