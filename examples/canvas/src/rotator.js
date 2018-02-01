import { registerComponent } from 'picimo'

class Rotator {
  constructor () {
    this.rotate = 0
    this._axis = 'Z'
  }

  set axis (axis) {
    this._axis = (axis || 'z').toUpperCase()
  }

  renderFrame () {
    this.rotate += this.speed || 0.4
    if (this.rotate > 360.0) {
      this.rotate -= 360.0
    }
    this.el.setAttribute('transform', `rotate${this._axis}: ${this.rotate}`)
  }
}

registerComponent('rotator', Rotator)
