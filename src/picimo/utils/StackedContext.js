
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

  get (name) {
    let stack = this.context.get(name)
    if (stack) {
      const len = stack.length
      if (len > 0) {
        return stack[len - 1]
      }
    }
  }

  clear () {
    this.context.forEach(value => {
      value.length = 0
    })
  }
}
