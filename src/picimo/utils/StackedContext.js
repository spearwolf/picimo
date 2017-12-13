
export default class StackedContext {
  constructor () {
    this.context = new Map()
  }

  push (name, value) {
    let stack = this.context.get(name)
    if (stack) {
      stack.push(value)
    } else {
      this.context.set(name, [value])
    }
    return value
  }

  pop (name) {
    let stack = this.context.get(name)
    if (stack) {
      return stack.pop()
    }
  }

  clear () {
    this.context.forEach(([, value]) => {
      value.length = 0
    })
  }
}
