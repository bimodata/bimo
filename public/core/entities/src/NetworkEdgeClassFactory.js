const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

const Item = require('@bimo/core-utils-item');

const NetworkEdgeClassFactory = ({ NetworkNode }) => {
  const childClasses = [NetworkNode];

  /** Une représentation logique d'un lien entre deux points discrets du réseau */
  class NetworkEdge extends Item {
    constructor(props) {
      super(props);
      this.bimoId = getAndValidatePropFromProps('bimoId', props, 'string');
      this.businessId = getAndValidatePropFromProps('businessId', props, 'string');
      /** @type {NetworkNode} */
      this.fromNode = getAndValidatePropFromProps('fromNode', props, NetworkNode, null);
      /** @type {NetworkNode} */
      this.toNode = getAndValidatePropFromProps('toNode', props, NetworkNode, null);
      this.customProps = getAndValidatePropFromProps('customProps', props, Object, {});

      /**
       * Permet (optionnellement) de stocker une ou plusieurs représentations géométriques de
       * cet arc. Par convention, si aucune géométrie n'est spécifiée pour un système donné,
       * on considère que la géométrie est une droite entre les deux noeuds.
       */
      this.geometryBySystemName = getAndValidatePropFromProps('geometryBySystemName', props, Object, {});
      this._sectionIds = getAndValidatePropFromProps('_sectionIds', props, Set, new Set());
    }

    getCoordinatesBySystemName(systemName) {
      return this.geometryBySystemName[systemName]?.coordinates ?? [
        this.fromNode.coordinatesBySystemName[systemName],
        this.toNode.coordinatesBySystemName[systemName],
      ];
    }

    /** @type {import ('./NetworkSection')[]} */
    get sections() {
      return [...this._sectionIds.values()].map((sectionId) => this.network.sections.getById(sectionId));
    }

    /**
     * @param {import ('./NetworkSection')} section
     */
    addSection(section) {
      this._sectionIds.add(section.bimoId);
    }

    /**
     * @param {import ('./NetworkSection')} section
     */
    removeSection(section) {
      this._sectionIds.delete(section.bimoId);
    }

    get shortLoggingOutput() {
      return `edge: ${this.businessId} (${this.fromNode && this.fromNode.shortLoggingOutput} -> ${this.toNode && this.toNode.shortLoggingOutput})`;
    }

    get mediumLoggingOutput() {
      return `edge: ${this.businessId} (${this.fromNode && this.fromNode.mediumLoggingOutput} -> ${this.toNode && this.toNode.mediumLoggingOutput})`;
    }

    /** This currently uses the same key function as was used initially in "transcoRfn", to be able
     * to compare edges created back then with new ones. This is probably not very performant and
     * could be changed in projects where we don't need this retrocompatibility.
     */
    get sortedNodeIdsKey() {
      return this._getAndSetCachedValue('sortedNodeIdsKey', () => {
        let smallNodeId;
        let bigNodeId;
        if (parseInt(this.fromNode.businessId, 10) > parseInt(this.toNode.businessId, 10)) {
          smallNodeId = this.toNode.businessId;
          bigNodeId = this.fromNode.businessId;
        }
        else {
          smallNodeId = this.fromNode.businessId;
          bigNodeId = this.toNode.businessId;
        }

        return `${smallNodeId}_${bigNodeId}`;
      });
    }

    get nodes() {
      return [this.fromNode, this.toNode];
    }

    /**
     * @param {NetworkNode} node
     * @returns {NetworkNode} - the node of edge that is not the passed node
     */
    otherNode(node) {
      if (this.fromNode === node) return this.toNode;
      if (this.toNode === node) return this.fromNode;
      throw new Error(`La node ${node.shortLoggingOutput} n'est pas liée à cette edge ${this.shortLoggingOutput}`);
    }

    hasNode(node) {
      return (this.fromNode === node || this.toNode === node);
    }

    get isDisconnected() {
      return this.fromNode.degree === 1 && this.toNode.degree === 1;
    }

    /** @type {import ('./Network')} */
    get network() {
      return this.parent && this.parent.parent;
    }

    /**
   *
   * @param {import ('./Network')} targetNetwork
   * @param {object} [options={}]
   * @param {Boolean} [options.bringNodes=true]
   * @param {Boolean} [options.copyNodes=false]
   * @param {Boolean} [options.skipCacheUpdate=false]
   */
    moveToNetwork(targetNetwork, options) {
      const { bringNodes = true, copyNodes = false, skipCacheUpdate = false } = options;
      if (this.network) {
        this.network.removeEdge(this, { removeNodes: bringNodes, skipCacheUpdate });
      }
      if (bringNodes) {
        this.nodes.forEach((node) => {
          node.moveToNetwork(targetNetwork, { bringEdges: false, skipCacheUpdate });
        });
      }
      else if (copyNodes) {
        throw new Error(`CopyNodes option is not implemented yet`);
      }
      else {
        throw new Error(`Only bringNodes mode is implemented so far`);
        // check if appropriate nodes exist in dest network ??
      }
      targetNetwork.addEdge(this);
    }
  }

  NetworkEdge.allChildClasses = getAllChildClasses(childClasses);
  NetworkEdge.prototype.serializeModel = serializeThis;
  NetworkEdge.parseModel = parseThis;

  return NetworkEdge;
};

module.exports = NetworkEdgeClassFactory;
