const registerComponent = ([picimo, name, component]) => picimo.registerComponent(name, component)

export default initialize => (name, component) => {
  initialize().then(picimo => Promise.all([picimo, name, component])).then(registerComponent)
}
