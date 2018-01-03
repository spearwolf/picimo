/* eslint-env browser */

const DPR = 1 // window.devicePixelRatio || 1

export default (url, canvas, imageDpr = 2) => {
  return new Promise(resolve => {
    fetch(url).then(response => response.blob()).then(blob => {
      const img = new Image()

      img.addEventListener('load', () => {
        const ctx = canvas.getContext('2d')
        const { width, height } = img

        canvas.width = (width / imageDpr) * DPR
        canvas.height = (height / imageDpr) * DPR

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(img)
      })

      img.src = URL.createObjectURL(blob)
    })
  })
}
