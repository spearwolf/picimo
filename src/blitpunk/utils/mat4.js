const { mat4 } = require('gl-matrix')

const DEG2RAD = Math.PI / 180.0

export default class Mat4 {
  constructor () {
    this.mat4 = mat4.create()
    Object.freeze(this)
  }

  identity () {
    mat4.identity(this.mat4)
  }

  ortho (width, height, zRange = Math.pow(2, 16)) {
    const hw = width >> 1
    const hh = height >> 1
    const hz = zRange >> 1
    mat4.ortho(this.mat4, -hw, hw, -hh, hh, -hz, hz)
  }

  perspective (width, height, distance = 100) {
    // https://webglfundamentals.org/webgl/lessons/webgl-3d-perspective.html
    // https://stackoverflow.com/questions/6653080/in-opengl-how-can-i-determine-the-bounds-of-the-view-at-a-given-depth
    // http://glmatrix.net/docs/module-mat4.html
    const aspect = width / height
    const near = 0
    const far = 2000
    const halfHeight = height / 2.0
    const fovy = 2 * Math.atan(halfHeight / distance)
    mat4.perspective(this.mat4, fovy, aspect, near, far)
    // TODO camera feature
    mat4.translate(this.mat4, this.mat4, [0, 0, -distance])
  }

  translate (x, y, z = 0) {
    mat4.translate(this.mat4, this.mat4, [x, y, z])
  }

  scale (x, y, z = 1) {
    mat4.scale(this.mat4, this.mat4, [x, y, z])
  }

  rotateX (deg) {
    mat4.rotateX(this.mat4, this.mat4, deg * DEG2RAD)
  }

  rotateY (deg) {
    mat4.rotateY(this.mat4, this.mat4, deg * DEG2RAD)
  }

  rotateZ (deg) {
    mat4.rotateZ(this.mat4, this.mat4, deg * DEG2RAD)
  }

  multiply (a, b) {
    mat4.multiply(this.mat4, a.mat4, b.mat4)
  }

  copy (src) {
    mat4.copy(this.mat4, src.mat4)
  }

  clone () {
    const dolly = new Mat4()
    dolly.copy(this)
    return dolly
  }

  get x () {
    return this.mat4[12]
  }

  set x (val) {
    this.mat4[12] = val
  }

  get y () {
    return this.mat4[13]
  }

  set y (val) {
    this.mat4[13] = val
  }

  get z () {
    return this.mat4[14]
  }

  set z (val) {
    this.mat4[14] = val
  }

  get sx () {
    return this.mat4[0]
  }

  set sx (val) {
    this.mat4[0] = val
  }

  get sy () {
    return this.mat4[5]
  }

  set sy (val) {
    this.mat4[5] = val
  }

  get sz () {
    return this.mat4[10]
  }

  set sz (val) {
    this.mat4[10] = val
  }
}
