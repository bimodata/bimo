const { Network } = require('@bimo/core-entities');

const defaultNodestrings = [
  ['A', 'B', 'C', 'D'],
  ['E', 'F', 'G', 'H'],
  ['A', 'F'], ['G', 'D'],
  ['I', 'J'],
  ['K', 'L'],
  ['M'],
];

/**
 *
 * @param {string[][]} nodesStrings
 * @param {GenerateTestNetworkConfig} config
 * @param {*} context
 */
function generateTestNetwork(nodesStrings = defaultNodestrings, config = {}, context = {}) {
  const {
    networkProps = { label: 'test' }, nodeProps = {}, edgeProps = {},
    coordinatesBySystemNameByNodeBusinessId = {},
    nodePropsByNodeBusinessId = {}, edgePropsByEdgeBusinessId = {},
  } = config;
  const network = new Network(networkProps);
  nodesStrings.forEach((nodesString) => {
    let previousNode;
    nodesString.forEach((nodeId, index) => {
      const node = network.nodes.getOrCreateItemByPropName('businessId', nodeId, {
        businessId: nodeId,
        coordinatesBySystemName: coordinatesBySystemNameByNodeBusinessId[nodeId],
        ...nodeProps,
        ...(nodePropsByNodeBusinessId[nodeId] || {}),
      });
      if (index >= 1) {
        const businessId = `${previousNode.businessId}-${nodeId}`;
        network.edges.createNewItem({
          businessId,
          ...edgeProps,
          ...(edgePropsByEdgeBusinessId[businessId] || {}),
          fromNode: previousNode,
          toNode: node,
        });
      }
      previousNode = node;
    });
  });
  return network;
}

module.exports = generateTestNetwork;

/**
 * @typedef {Object} GenerateTestNetworkConfig
 * @property {Object=} networkProps
 * @property {Object=} nodeProps
 * @property {Object=} edgeProps
 * @property {Object=} coordinatesBySystemNameByNodeBusinessId
 * @property {Object=} nodePropsByNodeBusinessId
 * @property {Object=} edgePropsByEdgeBusinessId
 */
