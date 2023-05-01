import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { NetworkNodesCollection } from "./NetworkNodesCollection";
import {
  NetworkEdgesCollection,
  NetworkEdgesCollectionProps,
} from "./NetworkEdgesCollection";
import { NetworkEdge } from "./NetworkEdge";
import { NetworkNode } from "./NetworkNode";

const childClasses = [NetworkNodesCollection, NetworkEdgesCollection];

/** Un sous-ensemble de nodes et d'edges d'un network qui partagent des caractéristiques communes.
 * Par exemple un ensemble de nodes et d'edges qui forment la voie 1 entre Amiens et Beauvais.
 */
export interface NetworkSectionProps extends ExtendedItemProps {
  bimoId: string;
  businessId?: string;
  nodes: NetworkNodesCollection;
  edges: NetworkEdgesCollection;
}

export class NetworkSection extends Item<NetworkSection> {
  bimoId: string;
  businessId?: string;
  nodes: NetworkNodesCollection;
  edges: NetworkEdgesCollection;
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

  hasEdge(edge: NetworkEdge) {
    return this.edges.has(edge);
  }

  addEdge(edge: NetworkEdge, { addNodes = false }: { addNodes?: boolean } = {}) {
    if (addNodes) edge.nodes.forEach((node) => this.addNode(node));
    if (!this.edges.has(edge)) {
      this.edges.add(edge);
      edge.addSection(this);
    }
  }

  addNode(node: NetworkNode) {
    if (!this.nodes.has(node)) {
      this.nodes.add(node);
      node.addSection(this);
    }
  }

  hasNode(node: NetworkNode) {
    return this.nodes.has(node);
  }
}

NetworkSection.allChildClasses = getAllChildClasses(childClasses);

export default NetworkSection;
