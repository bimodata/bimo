import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { NetworkNode as BimoNetworkNode } from "../base-types/rawIndex";
export { NetworkNode as BimoNetworkNode } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { BimoAdjacentLink } from "./AdjacentLink";
import { BimoNetworkNodesCollection } from "./NetworkNodesCollection";
import { BimoNetwork } from "./Network";
import { BimoNetworkSection } from "./NetworkSection";

/** Une représentation logique d'un point discret du réseau. */
export interface NetworkNodeProps extends ExtendedItemProps {
  bimoId: string;
  businessId: string;
  coordinatesBySystemName?: string;
  sectionIds?: Set<string>;
}

export function NetworkNodeClassFactory({}: EntityConstructorByEntityClassKey): typeof BimoNetworkNode {
  const childClasses: (typeof Entity)[] = [];

  class NetworkNode extends Item<NetworkNode> {
    bimoId: string;
    businessId: string;
    coordinatesBySystemName: { [systemName: string]: any } = {};
    _sectionIds: Set<string> = new Set();
    declare parent?: BimoNetworkNodesCollection;
    constructor(props: NetworkNodeProps) {
      super(props);
      this.bimoId = gavpfp("bimoId", props, "string");
      this.businessId = gavpfp("businessId", props, "string");
      this.coordinatesBySystemName = gavpfp("coordinatesBySystemName", props, Object, {});
      this.customProps = gavpfp("customProps", props, Object, {});
      this._sectionIds = gavpfp("sectionIds", props, Set, new Set());
    }

    get network() {
      return this.parent && this.parent.parent;
    }

    get sections() {
      return [...this._sectionIds.values()].map((sectionId) =>
        this.network?.sections.getById(sectionId)
      );
    }

    addSection(section: BimoNetworkSection) {
      this._sectionIds.add(section.bimoId);
    }

    removeSection(section: BimoNetworkSection) {
      this._sectionIds.delete(section.bimoId);
    }

    get adjacentLinks(): BimoAdjacentLink[] {
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

    get adjacentEdges() {
      return this.adjacentLinks.map((link) => link.edge);
    }

    get adjacentNodes() {
      return this.adjacentLinks.map((link) => link.endNode);
    }

    /** @returns the edge that leads from this node to otherNode */
    getEdgeToNode(otherNode: NetworkNode) {
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

    moveToNetwork(
      targetNetwork: BimoNetwork,
      options: {
        bringEdges?: boolean;
        copyEdges?: boolean;
        skipCacheUpdate?: boolean;
      }
    ) {
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

  return NetworkNode;
}

export default NetworkNodeClassFactory;
