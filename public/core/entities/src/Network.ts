import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import NetworkNodesCollection from "./NetworkNodesCollection";
import { NetworkEdge, NetworkEdgeProps } from "./NetworkEdge";
import { NetworkNode, NetworkNodeProps } from "./NetworkNode";
import {
  NetworkEdgesCollection,
  NetworkEdgesCollectionProps,
} from "./NetworkEdgesCollection";
import {
  NetworkSectionsCollection,
  NetworkSectionsCollectionProps,
} from "./NetworkSectionsCollection";
import { AdjacentLink } from "./AdjacentLink";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [
  NetworkNodesCollection,
  NetworkEdgesCollection,
  NetworkSectionsCollection,
];

/** Un ensemble de nodes et d'edges qui forment une représentation logique d'un réseau de transport. */
export interface NetworkProps extends ExtendedItemProps {
  bimoId?: string;
  businessId?: string;
  nodes?: NetworkNodesCollection;
  edges?: NetworkEdgesCollection;
  sections?: string;
}

export class Network extends Item<Network> {
  bimoId?: string;
  businessId?: string;
  nodes: NetworkNodesCollection;
  edges: NetworkEdgesCollection;
  sections: NetworkSectionsCollection;
  deletedNodes: Set<NetworkNode>;
  deletedEdges: Set<NetworkEdge>;
  constructor(props: NetworkProps) {
    super(props);
    this.bimoId = gavpfp("bimoId", props, "string");
    this.businessId = gavpfp("businessId", props, "string");
    this.label = gavpfp("label", props, "string");
    this.nodes = gavpfp("nodes", props, NetworkNodesCollection, [], { parent: this });
    this.edges = gavpfp("edges", props, NetworkEdgesCollection, [], { parent: this });
    this.sections = gavpfp("sections", props, NetworkSectionsCollection, [], {
      parent: this,
    });
    this.deletedNodes = new Set();
    this.deletedEdges = new Set();
  }

  get shortLoggingOutput() {
    return this.label ?? super.slo;
  }

  get mediumLoggingOutput() {
    return `${this.shortLoggingOutput}: ${this.nodes.shortLoggingOutput} ${this.edges.shortLoggingOutput}`;
  }

  get adjacentLinksByNode() {
    return this._getAndSetCachedValue("adjacentLinksByNode", () => {
      const wipAdjacentLinksByNode: Map<NetworkNode, AdjacentLink[]> = new Map();
      this.edges.forEach((anyEdge) => {
        if (anyEdge.fromNode && anyEdge.toNode) {
          if (!wipAdjacentLinksByNode.has(anyEdge.fromNode)) {
            wipAdjacentLinksByNode.set(anyEdge.fromNode, []);
          }
          (wipAdjacentLinksByNode.get(anyEdge.fromNode) as AdjacentLink[]).push(
            new AdjacentLink(anyEdge.fromNode, anyEdge.toNode, anyEdge)
          );

          if (!wipAdjacentLinksByNode.has(anyEdge.toNode)) {
            wipAdjacentLinksByNode.set(anyEdge.toNode, []);
          }
          (wipAdjacentLinksByNode.get(anyEdge.toNode) as AdjacentLink[]).push(
            new AdjacentLink(anyEdge.toNode, anyEdge.fromNode, anyEdge)
          );
        }
      });
      return wipAdjacentLinksByNode;
    });
  }

  removeEdge(
    edge: NetworkEdge,
    options: { removeNodes?: boolean; skipCacheUpdate?: boolean } = {}
  ) {
    const { removeNodes = false, skipCacheUpdate = false } = options;
    if (!skipCacheUpdate) {
      edge.nodes.forEach((node) => {
        // eslint-disable-next-line no-param-reassign
        node.adjacentLinks = node.adjacentLinks.filter(
          ({ edge: adjEdge }) => adjEdge !== edge
        );
      });
    }
    if (removeNodes) {
      edge.nodes.forEach((node) =>
        this.removeNode(node, { removeEdges: false, skipCacheUpdate })
      );
    }
    this.edges.remove(edge);
  }

  removeEdges(
    arrayOrSetOfEdges: NetworkEdge[] | Set<NetworkEdge>,
    options: { removeNodes?: boolean } = {}
  ) {
    const { removeNodes = false } = options;
    const edgesToRemove =
      arrayOrSetOfEdges instanceof Set ? arrayOrSetOfEdges : new Set(arrayOrSetOfEdges);
    const nodesToRemove =
      removeNodes && new Set([...edgesToRemove.values()].flatMap((edge) => edge.nodes));
    this.filterEdges((edge) => !edgesToRemove.has(edge));
    if (nodesToRemove) {
      this.filterNodes((node) => !nodesToRemove.has(node));
    }
  }

  removeNodes(
    arrayOrSetOfNodes: NetworkNode[] | Set<NetworkNode>,
    options: { removeEdges?: boolean } = {}
  ) {
    const { removeEdges = false } = options;
    const nodesToRemove =
      arrayOrSetOfNodes instanceof Set ? arrayOrSetOfNodes : new Set(arrayOrSetOfNodes);
    const edgesToRemove =
      removeEdges &&
      new Set([...nodesToRemove.values()].flatMap((node) => node.adjacentEdges));
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
   * @param callback Callback function to apply to each item - returns true if item should be kept
   * @returns Array of items that were removed from the collection
   */
  filterEdges(
    callback: (value: NetworkEdge, index: number, array: NetworkEdge[]) => boolean
  ): NetworkEdge[] {
    const removedEdges = this.edges.filter(callback);
    this._nullifyCachedValue("adjacentLinksByNode");
    return removedEdges;
  }

  /**
   * Keeps only the nodes for which the callback returns true, and resets the adjacent links
   * MUTATES the network
   * @param callback Callback function to apply to each item - returns true if item should be kept
   * @returns Array of items that were kept in the collection
   */
  filterNodes(
    callback: (value: NetworkNode, index: number, array: NetworkNode[]) => boolean
  ): NetworkNode[] {
    const removedNodes = this.nodes.filter(callback);
    this._nullifyCachedValue("adjacentLinksByNode");
    return removedNodes;
  }

  addEdge(edge: NetworkEdge, options: { skipCacheUpdate?: boolean } = {}) {
    const { skipCacheUpdate = false } = options;
    if (!edge.nodes.every((node) => this.hasNode(node))) {
      throw new Error(
        `${edge.shortLoggingOutput} a des nodes qui n'appartiennent pas à ${this.shortLoggingOutput}`
      );
    }
    this.edges.add(edge, { ensureId: true });
    if (!skipCacheUpdate) {
      edge.nodes.forEach((node) => {
        // eslint-disable-next-line no-param-reassign
        node.adjacentLinks = [
          ...node.adjacentLinks,
          new AdjacentLink(node, edge.otherNode(node), edge),
        ];
      });
    }
    return edge;
  }

  hasEdge(edge: NetworkEdge): boolean {
    return this.edges.has(edge);
  }

  removeNode(
    node: NetworkNode,
    options: { removeEdges?: boolean; skipCacheUpdate?: boolean } = {}
  ) {
    const { removeEdges = false, skipCacheUpdate = false } = options;
    if (removeEdges) {
      node.adjacentEdges.forEach((edge) =>
        this.removeEdge(edge, { removeNodes: false, skipCacheUpdate })
      );
    }
    this.nodes.remove(node);
  }

  addNode(node: NetworkNode, options: { skipCacheUpdate?: boolean } = {}) {
    const { skipCacheUpdate = false } = options;
    if (!node.adjacentEdges.every((edge) => this.hasEdge(edge))) {
      throw new Error(
        `${node.shortLoggingOutput} a des adjacent edges qui n'appartiennent pas à ${this.shortLoggingOutput}`
      );
    }
    this.nodes.add(node, { ensureId: true });
    if (!skipCacheUpdate) {
      const adjacentEdgesByNode = this._getCachedValue("adjacentEdgesByNode");
      if (adjacentEdgesByNode) adjacentEdgesByNode.set(node, node.adjacentEdges);
    }
    return node;
  }

  hasNode(node: NetworkNode): boolean {
    return this.nodes.has(node);
  }

  get mermaidString() {
    return `\`\`\`mermaid
flowchart LR
${this.edges
  .map((edge) => `${edge.fromNode.businessId} --- ${edge.toNode.businessId}`)
  .join("\n")}
${this.nodes
  .pick((node) => node.degree === 0)
  .map((node) => `${node.businessId}`)
  .join("\n")}
\`\`\``;
  }
}

NetworkEdge.allChildClasses = getAllChildClasses(childClasses);

export default Network;
