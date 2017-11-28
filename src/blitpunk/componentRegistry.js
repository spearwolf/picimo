import ComponentRegistry from './ecs/component_registry'
import registerComponents from './components/registerComponents'

const componentRegistry = new ComponentRegistry()
registerComponents(componentRegistry)

export default componentRegistry
