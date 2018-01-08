import expectToMatchScreenshot from './expectToMatchScreenshot'

const containerEl = document.querySelector('.picimo')
const visualRegressionsEl = document.querySelector('.visualRegressions__container')

export const createHtml = html => {
  containerEl.innerHTML = html
}

export const querySelector = (selector) => containerEl.querySelector(selector)
export const querySelectorAll = (selector) => containerEl.querySelectorAll(selector)
export const getCanvasEl = () => querySelector('pi-canvas')

export const screenshotUrl = imgPath => `/tests/screenshots/${imgPath}`
export const matchScreenshot = imgPath => expectToMatchScreenshot(screenshotUrl(imgPath), getCanvasEl(), visualRegressionsEl)
