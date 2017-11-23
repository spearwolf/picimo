const EXIT_NODES = ['BODY', 'HTML']

export default function findParentElementByProperty (node, prop, value) {
  const parent = node.parentElement
  if (!parent || parent.nodeType !== 1) return
  const { nodeName } = parent
  if (EXIT_NODES.includes(nodeName)) return
  if ((value == null && parent[prop]) || (value != null && parent[prop] === value)) return parent
  return parent
}
