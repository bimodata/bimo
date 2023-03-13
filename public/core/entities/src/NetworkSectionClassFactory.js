const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

const Item = require('@bimo/core-utils-item');

const NetworkSectionClassFactory = ({
  NetworkNodesCollection,
  NetworkEdgesCollection,
}) => {
  const childClasses = [NetworkNodesCollection, NetworkEdgesCollection];

  /** Un sous-ensembe de nodes et d'edges d'un network qui partagent des caractéristiques communes.
   * Par exemple un ensemble de nodes et d'edges qui forment la voie 1 entre Amiens et Beauvais.
   */
  class NetworkSection extends Item {
    /**
     *
     * @param {NetworkSection} props
     */
    constructor(props) {
      super(props, 'NetworkSection');
      this.bimoId = getAndValidatePropFromProps('bimoId', props, 'string');
      this.businessId = getAndValidatePropFromProps('businessId', props, 'string');
      this.label = getAndValidatePropFromProps('label', props, 'string');
      this.customProps = getAndValidatePropFromProps('customProps', props, Object, {});

      /** @type {NetworkNodesCollection} */
      this.nodes = getAndValidatePropFromProps('nodes', props, NetworkNodesCollection, [], { associationType: 'aggregation' });
      /** @type {NetworkEdgesCollection} */
      this.edges = getAndValidatePropFromProps('edges', props, NetworkEdgesCollection, [], { associationType: 'aggregation' });
    }

    get shortLoggingOutput() {
      return this.label;
    }

    get mediumLoggingOutput() {
      return `${this.shortLoggingOutput}: ${this.nodes.shortLoggingOutput} ${this.edges.shortLoggingOutput}`;
    }

    /**
     * @param {import ('./NetworkEdge')} edge
     * @returns {Boolean}
     */
    hasEdge(edge) {
      return this.edges.has(edge);
    }

    /**
     *
     * @param {import ('./NetworkEdge')} edge
     * @param {*} [options={}]
     * @param {boolean} [options.addNodes=false]
     */
    addEdge(edge, { addNodes = false }) {
      if (addNodes) edge.nodes.forEach((node) => this.addNode(node));
      if (!this.edges.has(edge)) {
        this.edges.add(edge);
        edge.addSection(this);
      }
    }

    /**
     *
     * @param {import ('./NetworkNode')} node
     */
    addNode(node) {
      if (!this.nodes.has(node)) {
        this.nodes.add(node);
        node.addSection(this);
      }
    }

    /**
     * @param {import ('./NetworkNode')} node
     * @returns {Boolean}
     */
    hasNode(node) {
      return this.nodes.has(node);
    }
  }

  NetworkSection.allChildClasses = getAllChildClasses(childClasses);
  NetworkSection.prototype.serializeModel = serializeThis;
  NetworkSection.parseModel = parseThis;

  return NetworkSection;
};

module.exports = NetworkSectionClassFactory;
