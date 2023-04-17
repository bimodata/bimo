const { expect } = require('chai');

const generateTestNetwork = require('@bimo/test-utils-generate-test-network');

const expected = require('./data/networkData');

describe('Network.removeEdge', () => {
  it(`works with removeNodes = true`, () => {
    const net = generateTestNetwork();
    expect(net.mermaidString).to.equal(expected.sourceNetMermaidString);
    net.removeEdge(net.edges.getByBusinessId('I-J'), { removeNodes: true });
    expect(net.mermaidString).to.equal(expected.removeEdges1);
  });
  it(`works with removeNodes = false`, () => {
    const net = generateTestNetwork();
    expect(net.mermaidString).to.equal(expected.sourceNetMermaidString);
    net.removeEdge(net.edges.getByBusinessId('I-J'), { removeNodes: false });
    expect(net.mermaidString).to.equal(expected.removeEdges2);
  });
});

describe('Network.removeNode', () => {
  it(`works with removeEdges = true`, () => {
    const net = generateTestNetwork();
    expect(net.mermaidString).to.equal(expected.sourceNetMermaidString);
    net.removeNode(net.nodes.getByBusinessId('B'), { removeEdges: true });
    expect(net.mermaidString).to.equal(expected.removeNodes1);
    expect(net.nodes.length).to.equal(12);
  });
  it(`works with removeEdges = false`, () => {
    const net = generateTestNetwork();
    expect(net.mermaidString).to.equal(expected.sourceNetMermaidString);
    net.removeNode(net.nodes.getByBusinessId('B'), { removeEdges: false });
    expect(net.mermaidString).to.equal(expected.removeNodes2);
    expect(net.nodes.length).to.equal(12);
  });
});

function prepareMoveToNetwork() {
  const sourceNet = generateTestNetwork();
  const destNet = generateTestNetwork([['A', 'B']]);
  expect(sourceNet.mermaidString).to.equal(expected.sourceNetMermaidString);
  const edge = sourceNet.edges.getByBusinessId('I-J');
  const srcNetEdgesBefore = sourceNet.edges.length;
  const srcNetNodesBefore = sourceNet.nodes.length;
  const destNetEdgesBefore = destNet.edges.length;
  const destNetNodesBefore = destNet.nodes.length;
  edge.moveToNetwork(destNet, { bringNodes: true });
  return { sourceNet, destNet, srcNetEdgesBefore, srcNetNodesBefore, destNetEdgesBefore, destNetNodesBefore };
}

describe('Edge.moveToNetwork', () => {
  context(`with bringNodes = true`, () => {
    it(`removes only the one edge from the source network`, () => {
      const { sourceNet, srcNetEdgesBefore } = prepareMoveToNetwork();
      expect(sourceNet.edges.length).to.equal(srcNetEdgesBefore - 1);
    });
    it(`removes only the two nodes from the source network`, () => {
      const { sourceNet, srcNetNodesBefore } = prepareMoveToNetwork();
      expect(sourceNet.nodes.length).to.equal(srcNetNodesBefore - 2);
    });
    it(`leaves the source network in the expected state`, () => {
      const { sourceNet } = prepareMoveToNetwork();
      expect(sourceNet.mermaidString).to.equal(expected.removeEdges1);
    });
    it(`add the one edge to the dest network`, () => {
      const { destNet, destNetEdgesBefore } = prepareMoveToNetwork();
      expect(destNet.edges.length).to.equal(destNetEdgesBefore + 1);
    });
    it(`adds the two nodes to the dest network`, () => {
      const { destNet, destNetNodesBefore } = prepareMoveToNetwork();
      expect(destNet.nodes.length).to.equal(destNetNodesBefore + 2);
    });
    it(`puts the dest network in the expected state`, () => {
      const { destNet } = prepareMoveToNetwork();
      expect(destNet.mermaidString).to.equal(expected.moveEdge1);
    });
  });
});
