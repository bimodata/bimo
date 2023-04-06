const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

const { Item } = require('@bimo/core-utils-collection');

const NetworkClassFactory = ({
  NetworkNodesCollection,
  NetworkEdge,
  NetworkNode,
  NetworkEdgesCollection,
  NetworkSectionsCollection,
  AdjacentLink,
}) => {
  const childClasses = [NetworkNodesCollection, NetworkEdgesCollection, NetworkSectionsCollection];

  /** Un ensemble de nodes et d'edges qui forment une représentation logique d'un réseau de transport. */
  class Network extends Item {
    /**
     *
     * @param {Network} props
     */
    constructor(props) {
      super(props, 'Network');
      this.bimoId = getAndValidatePropFromProps('bimoId', props, 'string');
      this.businessId = getAndValidatePropFromProps('businessId', props, 'string');
      this.label = getAndValidatePropFromProps('label', props, 'string');

      /** @type {NetworkNodesCollection} */
      this.nodes = getAndValidatePropFromProps('nodes', props, NetworkNodesCollection, [], { parent: this });
      /** @type {NetworkEdgesCollection} */
      this.edges = getAndValidatePropFromProps('edges', props, NetworkEdgesCollection, [], { parent: this });
      /** @type {NetworkSectionsCollection} */
      this.sections = getAndValidatePropFromProps('sections', props, NetworkSectionsCollection, [], { parent: this });
      this.deletedNodes = new Set();
      this.deletedEdges = new Set();
    }

    get shortLoggingOutput() {
      return this.label;
    }

    get mediumLoggingOutput() {
      return `${this.shortLoggingOutput}: ${this.nodes.shortLoggingOutput} ${this.edges.shortLoggingOutput}`;
    }

    /** @type {Map<NetworkNode, AdjacentLink[]} */
    get adjacentLinksByNode() {
      return this._getAndSetCachedValue('adjacentLinksByNode', () => {
        const wipAdjacentLinksByNode = new Map();
        this.edges.forEach((anyEdge) => {
          if (anyEdge.fromNode && anyEdge.toNode) {
            if (!wipAdjacentLinksByNode.has(anyEdge.fromNode)) {
              wipAdjacentLinksByNode.set(anyEdge.fromNode, []);
            }
            wipAdjacentLinksByNode.get(anyEdge.fromNode).push(new AdjacentLink(anyEdge.fromNode, anyEdge.toNode, anyEdge));

            if (!wipAdjacentLinksByNode.has(anyEdge.toNode)) {
              wipAdjacentLinksByNode.set(anyEdge.toNode, []);
            }
            wipAdjacentLinksByNode.get(anyEdge.toNode).push(new AdjacentLink(anyEdge.toNode, anyEdge.fromNode, anyEdge));
          }
        });
        return wipAdjacentLinksByNode;
      });
    }

    /**
     *
     * @param {NetworkEdge} edge
     * @param {object} [options={}]
     * @param {Boolean} [options.removeNodes=false]
     * @param {Boolean} [options.skipCacheUpdate=false]
     */
    removeEdge(edge, options = {}) {
      const { removeNodes = false, skipCacheUpdate = false } = options;
      if (!skipCacheUpdate) {
        edge.nodes.forEach((node) => {
          // eslint-disable-next-line no-param-reassign
          node.adjacentLinks = node.adjacentLinks.filter(({ edge: adjEdge }) => adjEdge !== edge);
        });
      }
      if (removeNodes) {
        edge.nodes.forEach((node) => this.removeNode(node, { removeEdges: false, skipCacheUpdate }));
      }
      this.edges.remove(edge);
    }

    /**
     *
     * @param {NetworkEdge[]|Set<NetworkEdge} arrayOrSetOfEdges
     * @param {object} [options={}]
     * @param {Boolean} [options.removeNodes=false]
     */
    removeEdges(arrayOrSetOfEdges, options = {}) {
      const { removeNodes = false } = options;
      const edgesToRemove = arrayOrSetOfEdges instanceof Set ? arrayOrSetOfEdges : new Set(arrayOrSetOfEdges);
      const nodesToRemove = removeNodes && new Set([...edgesToRemove.values()].flatMap((edge) => edge.nodes));
      this.filterEdges((edge) => !edgesToRemove.has(edge));
      if (nodesToRemove) {
        this.filterNodes((node) => !nodesToRemove.has(node));
      }
    }

    /**
     *
     * @param {NetworkNode[]|Set<NetworkNode} arrayOrSetOfNodes
     * @param {object} [options={}]
     * @param {Boolean} [options.removeEdges=false]
     */
    removeNodes(arrayOrSetOfNodes, options = {}) {
      const { removeEdges = false } = options;
      const nodesToRemove = arrayOrSetOfNodes instanceof Set ? arrayOrSetOfNodes : new Set(arrayOrSetOfNodes);
      const edgesToRemove = removeEdges && new Set([...nodesToRemove.values()].flatMap((node) => node.adjacentEdges));
      this.filterNodes((node) => !nodesToRemove.has(node));
      if (edgesToRemove) {
        this.filterEdges((edge) => !edgesToRemove.has(edge));
      }
    }

    /**
     * @callback ArrayMethodsCallback
     * @param {ItemType} value
     * @param {number} index
     * @param {ItemType[]} array
     */

    /**
     * Keeps only the edges for which the callback returns true, and resets the adjacent links
     * MUTATES the network
     * @param {ArrayMethodsCallback} callback Callback function to apply to each item - returns true if item should be kept
     * @returns {ItemType[]} Array of items that were kept in the collection
     */
    filterEdges(callback) {
      this.edges.filter(callback);
      this._nullifyCachedValue('adjacentLinksByNode');
    }

    /**
     * Keeps only the nodes for which the callback returns true, and resets the adjacent links
     * MUTATES the network
     * @param {ArrayMethodsCallback} callback Callback function to apply to each item - returns true if item should be kept
     * @returns {ItemType[]} Array of items that were kept in the collection
     */
    filterNodes(callback) {
      this.nodes.filter(callback);
      this._nullifyCachedValue('adjacentLinksByNode');
    }

    /**
     *
     * @param {NetworkEdge} edge
     * @param {object} [options={}]
     * @param {Boolean} [options.skipCacheUpdate=false]
     */
    addEdge(edge, options = {}) {
      const { skipCacheUpdate = false } = options;
      if (!edge.nodes.every((node) => this.hasNode(node))) {
        throw new Error(`${edge.shortLoggingOutput} a des nodes qui n'appartiennent pas à ${this.shortLoggingOutput}`);
      }
      this.edges.add(edge, { ensureId: true });
      if (!skipCacheUpdate) {
        edge.nodes.forEach((node) => {
          // eslint-disable-next-line no-param-reassign
          node.adjacentLinks = [...node.adjacentLinks, new AdjacentLink(node, edge.otherNode(node), edge)];
        });
      }
      return edge;
    }

    /**
     * @param {NetworkEdge} edge
     * @returns {Boolean}
     */
    hasEdge(edge) {
      return this.edges.has(edge);
    }

    /**
     *
     * @param {import ('./NetworkNode')} node
     * @param {object} [options={}]
     * @param {Boolean} [options.removeEdges=false]
     * @param {Boolean} [options.skipCacheUpdate=false]
     */
    removeNode(node, options = {}) {
      const { removeEdges = false, skipCacheUpdate = false } = options;
      if (removeEdges) {
        node.adjacentEdges.forEach((edge) => this.removeEdge(edge, { removeNodes: false, skipCacheUpdate }));
      }
      this.nodes.remove(node);
    }

    /**
     *
     * @param {import ('./NetworkNode')} node
     * @param {object} [options={}]
     * @param {Boolean} [options.skipCacheUpdate=false]
     */
    addNode(node, options = {}) {
      const { skipCacheUpdate = false } = options;
      if (!node.adjacentEdges.every((edge) => this.hasEdge(edge))) {
        throw new Error(`${node.shortLoggingOutput} a des adjacent edges qui n'appartiennent pas à ${this.shortLoggingOutput}`);
      }
      this.nodes.add(node, { ensureId: true });
      if (!skipCacheUpdate) {
        const adjacentEdgesByNode = this._getCachedValue('adjacentEdgesByNode');
        if (adjacentEdgesByNode) adjacentEdgesByNode.set(node, node.adjacentEdges);
      }
      return node;
    }

    /**
     * @param {import ('./NetworkNode')} node
     * @returns {Boolean}
     */
    hasNode(node) {
      return this.nodes.has(node);
    }

    get mermaidString() {
      return `\`\`\`mermaid\nflowchart LR\n`
        + `${this.edges.map((edge) => `${edge.fromNode.businessId} --- ${edge.toNode.businessId}`).join('\n')}\n`
        + `${this.nodes.pick((node) => node.degree === 0).map((node) => `${node.businessId}`).join('\n')}\n\`\`\``;
    }
  }

  NetworkEdge.allChildClasses = getAllChildClasses(childClasses);
  Network.prototype.serializeModel = serializeThis;
  Network.parseModel = parseThis;

  return Network;
};

module.exports = NetworkClassFactory;
