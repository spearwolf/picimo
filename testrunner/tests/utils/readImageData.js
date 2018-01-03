
export default canvas => {
  const { width, height } = canvas
  return canvas.getContext('2d').getImageData(0, 0, width, height)
}
