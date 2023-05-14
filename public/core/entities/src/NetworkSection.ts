import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { NetworkSection as BimoNetworkSection } from "../base-types/rawIndex";
export { NetworkSection as BimoNetworkSection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { BimoNetworkNodesCollection } from "./NetworkNodesCollection";
import { BimoNetworkEdgesCollection } from "./NetworkEdgesCollection";
import { BimoNetworkEdge } from "./NetworkEdge";
import { BimoNetworkNode } from "./NetworkNode";

export interface NetworkSectionProps extends ExtendedItemProps {
  bimoId: string;
  businessId?: string;
  nodes: BimoNetworkNodesCollection;
  edges: BimoNetworkEdgesCollection;
}
export function NetworkSectionClassFactory({
  NetworkNodesCollection,
  NetworkEdgesCollection,
}: EntityConstructorByEntityClassKey): typeof BimoNetworkSection {
  const childClasses: (typeof Entity)[] = [
    NetworkNodesCollection,
    NetworkEdgesCollection,
  ];

  /** Un sous-ensemble de nodes et d'edges d'un network qui partagent des caractéristiques communes.
   * Par exemple un ensemble de nodes et d'edges qui forment la voie 1 entre Amiens et Beauvais.
   */
  class NetworkSection extends Item<NetworkSection> {
    bimoId: string;
    businessId?: string;
    nodes: BimoNetworkNodesCollection;
    edges: BimoNetworkEdgesCollection;
    constructor(props: NetworkSectionProps) {
      super(props);
      this.bimoId = gavpfp("bimoId", props, "string");
      this.businessId = gavpfp("businessId", props, "string");
      this.label = gavpfp("label", props, "string");
      this.nodes = gavpfp("nodes", props, NetworkNodesCollection, [], {
        associationType: "aggregation",
      });
      this.edges = gavpfp("edges", props, NetworkEdgesCollection, [], {
        associationType: "aggregation",
      });
    }

    get shortLoggingOutput() {
      return this.label ?? super.slo;
    }

    get mediumLoggingOutput() {
      return `${this.shortLoggingOutput}: ${this.nodes.shortLoggingOutput} ${this.edges.shortLoggingOutput}`;
    }

    hasEdge(edge: BimoNetworkEdge) {
      return this.edges.has(edge);
    }

    addEdge(edge: BimoNetworkEdge, { addNodes = false }: { addNodes?: boolean } = {}) {
      if (addNodes) edge.nodes.forEach((node) => this.addNode(node));
      if (!this.edges.has(edge)) {
        this.edges.add(edge);
        edge.addSection(this);
      }
    }

    addNode(node: BimoNetworkNode) {
      if (!this.nodes.has(node)) {
        this.nodes.add(node);
        node.addSection(this);
      }
    }

    hasNode(node: BimoNetworkNode) {
      return this.nodes.has(node);
    }
  }

  NetworkSection.allChildClasses = getAllChildClasses(childClasses);

  return NetworkSection;
}

export default NetworkSectionClassFactory;
