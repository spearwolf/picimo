
export default function resizeCanvas (canvas, gl, parameters) {
  if (canvas.width !== canvas.clientWidth ||
        canvas.height !== canvas.clientHeight) {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    parameters.screenWidth = canvas.width
    parameters.screenHeight = canvas.height

    gl.viewport(0, 0, canvas.width, canvas.height)
  }
}
