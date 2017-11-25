const tinycolor = require('tinycolor2')

const parseColor = colStr => colStr ? tinycolor(colStr) : null

export default class ClearColorComponent {
  constructor (entity, colStr) {
    this.color = parseColor(colStr)
  }

  update (colStr) {
    this.color = parseColor(colStr)
  }
}
