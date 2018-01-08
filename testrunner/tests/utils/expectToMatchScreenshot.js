import { expect } from 'chai'
import pixelmatch from 'pixelmatch'

import loadImageIntoCanvas from './loadImageIntoCanvas'
import readImageData from './readImageData'

const createElement = (tagName, classNames, childNode) => {
  const el = document.createElement(tagName)
  el.setAttribute('class', classNames)
  if (childNode) {
    el.appendChild(childNode)
  }
  return el
}

const createCanvas = (classNames) => {
  const canvas = createElement('canvas', 'visualRegressions__canvas')
  return [canvas, createElement('div', `${classNames} visualRegressions__canvasContainer`, canvas)]
}

export default (screenshotUrl, piCanvas, outputContainer) => {
  const [picimoCanvas, picimoCanvasContainer] = createCanvas('picimoPixels')
  const [screenshotCanvas, screenshotCanvasContainer] = createCanvas('comparePixels')
  const [diffCanvas, diffCanvasContainer] = createCanvas('diffPixels')

  const rowEl = createElement('div', 'visualRegressions__row')
  rowEl.appendChild(picimoCanvasContainer)
  rowEl.appendChild(screenshotCanvasContainer)
  rowEl.appendChild(diffCanvasContainer)
  outputContainer.appendChild(rowEl)

  return loadImageIntoCanvas(screenshotUrl, screenshotCanvas, 2).then(() => {
    const pixels = piCanvas.readPixels(true)
    const { width, height } = pixels
    const { data: screenshotData } = readImageData(screenshotCanvas)

    diffCanvas.width = width
    diffCanvas.height = height
    const diffCtx = diffCanvas.getContext('2d')
    const diffImageData = diffCtx.createImageData(width, height)

    picimoCanvas.width = width
    picimoCanvas.height = height
    const picimoCtx = picimoCanvas.getContext('2d')
    picimoCtx.putImageData(pixels, 0, 0)
    const picimoImageData = readImageData(picimoCanvas)

    const diffPixels = pixelmatch(picimoImageData.data, screenshotData, diffImageData.data, width, height, {
      // threshold: 0.33333,
      includeAA: false
    })

    diffCtx.putImageData(diffImageData, 0, 0)

    // expect(diffPixels, 'Ooops.. screenshots do not match!').to.equal(0)
    expect(diffPixels, 'Ooops.. screenshots do not match!').to.below(100)
  })
}
