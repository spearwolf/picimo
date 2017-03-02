import resizeCanvas from './resize_canvas'
import render from './render'

export default function animate (parameters, state) {
  resizeCanvas(state.canvas, state.gl, parameters)
  render(state, parameters)
  window.requestAnimationFrame(animate.bind(null, parameters, state))
}
