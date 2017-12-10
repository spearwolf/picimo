import ResourceLibrary from './core/resource_library'
import addCoreResources from './core/resources'

const resourceLibrary = new ResourceLibrary()
addCoreResources(resourceLibrary)

export default resourceLibrary
