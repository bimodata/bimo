import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { NetworkNodesCollection } from "./NetworkNodesCollection";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [];

/** Une représentation logique d'un point discret du réseau. */
export interface NetworkNodeProps extends ExtendedItemProps {
  bimoId: string;
  businessId: string;
  coordinatesBySystemName?: string;
  sectionIds?: Set<string>;
}

export class NetworkNode extends Item<NetworkNode> {
  bimoId: string;
  businessId: string;
  coordinatesBySystemName: { [systemName: string]: any } = {};
  private _sectionIds: Set<string> = new Set();
  declare parent?: NetworkNodesCollection;
  constructor(props: NetworkNodeProps) {
    super(props);
    this.bimoId = gavpfp("bimoId", props, "string");
    this.businessId = gavpfp("businessId", props, "string");
    this.coordinatesBySystemName = gavpfp("coordinatesBySystemName", props, Object, {});
    this.customProps = gavpfp("customProps", props, Object, {});
    this._sectionIds = gavpfp("sectionIds", props, Set, new Set());
  }

  /** @type {import ('./Network')} */
  get network() {
    return this.parent && this.parent.parent;
  }

  /** @type {import ('./NetworkSection')[]} */
  get sections() {
    return [...this._sectionIds.values()].map((sectionId) =>
      this.network?.sections.getById(sectionId)
    );
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

  /** @type {import ('./AdjacentLink')[]} */
  get adjacentLinks() {
    if (!this.network) return [];
    return (this.network.adjacentLinksByNode.get(this) || []).filter(
      ({ edge }) => !this.network?.deletedEdges.has(edge)
    );
  }

  set adjacentLinks(newLinks) {
    if (!this.network)
      throw new Error(`Cannot set adjacentLinks on a node if it has no Network`);
    this.network.adjacentLinksByNode.set(this, newLinks);
  }

  /** @type {import ('./NetworkEdge')[]} */
  get adjacentEdges() {
    return this.adjacentLinks.map((link) => link.edge);
  }

  /** @type {import ('./NetworkNode')[]} */
  get adjacentNodes() {
    return this.adjacentLinks.map((link) => link.endNode);
  }

  /**
   *
   * @param {import ('./NetworkNode')} otherNode
   * @returns {import ('./NetworkEdge')} the edge that leads from this node to otherNode
   */
  getEdgeToNode(otherNode) {
    return this.adjacentLinks.find(({ endNode }) => endNode === otherNode)?.edge;
  }

  get degree() {
    return this.adjacentEdges.length;
  }

  get shortLoggingOutput() {
    return `node: ${this.businessId}`;
  }

  get mediumLoggingOutput() {
    return `${this.shortLoggingOutput}(deg: ${this.degree})`;
  }

  get longLoggingOutput() {
    return `${this.mediumLoggingOutput}(net: ${
      this.network && this.network.shortLoggingOutput
    })`;
  }

  /**
   *
   * @param {import ('./Network')} targetNetwork
   * @param {object} [options={}]
   * @param {Boolean} [options.bringEdges=false]
   * @param {Boolean} [options.copyEdges=false]
   * @param {Boolean} [options.skipCacheUpdate=false]
   */
  moveToNetwork(targetNetwork, options) {
    const { bringEdges = false, copyEdges = false, skipCacheUpdate = false } = options;
    if (this.network) {
      this.network.removeNode(this, { removeEdges: bringEdges, skipCacheUpdate });
    }
    if (bringEdges) {
      this.adjacentEdges.forEach((edge) =>
        edge.moveToNetwork(targetNetwork, { bringNodes: false, skipCacheUpdate })
      );
    } else if (copyEdges) {
      throw new Error(`copyEdges option is not implemented yet`);
    }
    targetNetwork.addNode(this);
  }
}

NetworkNode.allChildClasses = getAllChildClasses(childClasses);

export default NetworkNode;
