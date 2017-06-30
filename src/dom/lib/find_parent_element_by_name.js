const EXIT_NODES = ['BODY', 'HTML']

export default function findParentElementByName (node, ...names) {
  const parent = node.parentElement
  if (!parent || parent.nodeType !== 1) return
  const { nodeName } = parent
  if (names.includes(nodeName)) return parent
  if (EXIT_NODES.includes(nodeName)) return
  return parent
}
