/* eslint-env mocha */
import eventize from '@spearwolf/eventize'
import assert from 'assert'
import SGNode from '../src/scene_graph/s_g_node'

describe('SGNode', () => {
  describe('new SGNode', () => {
    const node = new SGNode()
    it('creates a SGNode instance', () => assert(node))
    it('.parentNode is null', () => assert.equal(node.parentNode, null))
    it('is a rootNode', () => assert.equal(node.isRootNode, true))
    it('is the .rootNode instance', () => assert.equal(node.rootNode, node))
    it('has a .name', () => assert(typeof node.name === 'string' && node.name.length > 0))
    it('default .priority is 0', () => assert.equal(node.priority, 0))
    it('has no children', () => assert.equal(node.hasChildNodes, false))
    it('is eventized', () => assert(eventize.is(node)))
  })

  describe('SGNode{ parentNode }', () => {
    const rootNode = new SGNode()
    const node = new SGNode({ parentNode: rootNode })
    it('rootNode is a SGNode instance', () => assert(rootNode instanceof SGNode))
    it('node is a SGNode instance', () => assert(node instanceof SGNode))
    it('node.parentNode is rootNode', () => assert.equal(node.parentNode, rootNode))
    it('node is NOT a rootNode', () => assert.equal(node.isRootNode, false))
    it('rootNode is the .rootNode instance of node', () => assert.equal(node.rootNode, rootNode))
    it('has a .name', () => assert(typeof node.name === 'string' && node.name.length > 0))
    it('.name is different than rootNode.name', () => assert(node.name !== rootNode.name))
    it('rootNode has a child', () => assert.equal(rootNode.hasChildNodes, true))
    it('rootNode contains child: node ', () => assert(rootNode.containsChild(node), true))
    it('node can not be append twice to rootNode', () => {
      rootNode.appendChild(node)
      rootNode.appendChild(node)
      assert(rootNode.containsChild(node), true)
      assert(rootNode.childNodes.length, 1)
    })
  })

  describe('SGNode{ priority }', () => {
    const rootNode = new SGNode()
    const nodeC = new SGNode({ parentNode: rootNode, priority: -8 })
    const nodeB = new SGNode({ parentNode: rootNode })
    const nodeA = new SGNode({ parentNode: rootNode, priority: 666 })
    it('check nodeA priority', () => assert.equal(nodeA.priority, 666))
    it('check nodeB priority', () => assert.equal(nodeB.priority, 0))
    it('check nodeC priority', () => assert.equal(nodeC.priority, -8))
    it('rootNode has 3 children', () => assert.equal(rootNode.childNodes.length, 3))
    it('check forEachChild sequence', () => {
      let sequence = []
      rootNode.forEachChild(node => sequence.push(node.name))
      assert.deepEqual(sequence, [nodeA.name, nodeB.name, nodeC.name])
    })
    it('check forEachChild sequence after priority from a node changed', () => {
      let sequence = []
      nodeB.priority = 1024
      rootNode.forEachChild(node => sequence.push(node.name))
      assert.deepEqual(sequence, [nodeB.name, nodeA.name, nodeC.name])
    })
  })

  describe('SGNode traversal', () => {
    const rootNode = new SGNode({ name: 'rootNode' })
    const nodeC = new SGNode({ parentNode: rootNode, name: 'nodeC', priority: -8 })
    const nodeB = new SGNode({ parentNode: rootNode, name: 'nodeB' })
    const nodeA = new SGNode({ parentNode: rootNode, name: 'nodeA', priority: 666 })
    const nodeD = new SGNode({ parentNode: nodeB, name: 'nodeD', priority: -10 })
    const nodeE = new SGNode({ parentNode: nodeB, name: 'nodeE', priority: 1024 })
    it('check priorities', () => {
      assert.equal(nodeA.priority, 666, 'nodeA')
      assert.equal(nodeB.priority, 0, 'nodeB')
      assert.equal(nodeC.priority, -8, 'nodeC')
      assert.equal(nodeD.priority, -10, 'nodeD')
      assert.equal(nodeE.priority, 1024, 'nodeE')
    })
    it('rootNode has 3 children', () => assert.equal(rootNode.childNodes.length, 3))
    it('nodeB has 2 children', () => assert.equal(nodeB.childNodes.length, 2))
    it('check traversal sequence', () => {
      let sequence = []
      rootNode.traverse(
                node => sequence.push(`${node.name}:before`),
                node => sequence.push(`${node.name}:after`))
      assert.deepEqual(sequence, [
        `${rootNode.name}:before`,
        `${nodeA.name}:before`,
        `${nodeA.name}:after`,
        `${nodeB.name}:before`,
        `${nodeE.name}:before`,
        `${nodeE.name}:after`,
        `${nodeD.name}:before`,
        `${nodeD.name}:after`,
        `${nodeB.name}:after`,
        `${nodeC.name}:before`,
        `${nodeC.name}:after`,
        `${rootNode.name}:after`
      ])
    })
    it('check traversal sequence with filter', () => {
      let sequence = []
      nodeA.nodeType = 1
      rootNode.traverse(
                node => sequence.push(`${node.name}:before`),
                node => sequence.push(`${node.name}:after`),
                node => node.nodeType !== 1)
      assert.deepEqual(sequence, [
        `${rootNode.name}:before`,
        `${nodeB.name}:before`,
        `${nodeE.name}:before`,
        `${nodeE.name}:after`,
        `${nodeD.name}:before`,
        `${nodeD.name}:after`,
        `${nodeB.name}:after`,
        `${nodeC.name}:before`,
        `${nodeC.name}:after`,
        `${rootNode.name}:after`
      ])
    })
    it('check traversal sequence with multiple filters', () => {
      let sequence = []
      nodeB.nodeType = 2
      rootNode.traverse(
                node => sequence.push(`${node.name}:before`),
                node => sequence.push(`${node.name}:after`),
        [
          node => node.nodeType !== 1,
          node => node.nodeType !== 2
        ])
      assert.deepEqual(sequence, [
        `${rootNode.name}:before`,
        `${nodeC.name}:before`,
        `${nodeC.name}:after`,
        `${rootNode.name}:after`
      ])
    })
    it('getRootNodeByType()', () => {
      assert.equal(nodeA.getRootNodeByType(1), nodeA, 'nodeA:1')
      assert.equal(nodeE.getRootNodeByType(2), nodeB, 'nodeB:2')
      assert.equal(nodeB.getRootNodeByType(0), rootNode, 'rootNode:0')
      assert.equal(nodeE.getRootNodeByType(23), undefined, 'undef')
    })
    it('findByName()', () => {
      assert.equal(rootNode.findByName('nodeA'), nodeA, 'nodeA')
      assert.equal(rootNode.findByName('nodeB'), nodeB, 'nodeB')
      assert.equal(rootNode.findByName('nodeC'), nodeC, 'nodeC')
      assert.equal(rootNode.findByName('nodeD'), nodeD, 'nodeD')
      assert.equal(rootNode.findByName('nodeE'), nodeE, 'nodeE')
    })
  })
})

