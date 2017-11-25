import ComponentRegistry from './ecs/component_registry'
import registerCoreComponents from './dom/registerCoreComponents'

const componentRegistry = new ComponentRegistry()
registerCoreComponents(componentRegistry)

export default componentRegistry
