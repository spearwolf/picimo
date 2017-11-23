
export default function syncComponent (el, name) {
  if (el.blitpunk == null) return
  if (Array.isArray(name)) {
    name.forEach(syncComponent.bind(null, el))
    return
  }
  const data = el.getAttribute(name)
  if (data == null) return
  el.blitpunk.componentRegistry.createOrUpdateComponent(el.entity, name, data)
}
