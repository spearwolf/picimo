import { parseCssStyledProperties } from 'picimo/utils'

export default class ComponentFactory {
  static createCssStyledPropsComponent (ComponentConstructor) {
    return {
      create (entity, data) {
        return new ComponentConstructor(entity, parseCssStyledProperties(data))
      },
      update (component, data) {
        component.update(parseCssStyledProperties(data))
      },
      destroy (/* component */) { /* nothing to do here */ }
    }
  }

  static createComponent (ComponentConstructor) {
    return {
      create (entity, data) {
        return new ComponentConstructor(entity, data)
      },
      update (component, data) {
        component.update(data)
      },
      destroy (/* component */) { /* nothing to do here */ }
    }
  }
}
