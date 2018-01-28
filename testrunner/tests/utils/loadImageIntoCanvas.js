/* eslint-env browser */

export default (url, canvas, imageDpr = 2) => {
  return new Promise(resolve => {
    fetch(url).then(response => response.blob()).then(blob => {
      const img = new Image()

      img.addEventListener('load', () => {
        const ctx = canvas.getContext('2d')
        const { width, height } = img

        canvas.width = width
        canvas.height = height

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(img)
      })

      img.src = URL.createObjectURL(blob)
    })
  })
}
