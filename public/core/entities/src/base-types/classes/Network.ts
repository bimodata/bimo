import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { NetworkNodesCollection } from "./NetworkNodesCollection";
import { NetworkEdge } from "./NetworkEdge";
import { NetworkNode } from "./NetworkNode";
import { NetworkEdgesCollection } from "./NetworkEdgesCollection";
import { NetworkSectionsCollection } from "./NetworkSectionsCollection";
import { AdjacentLink } from "./AdjacentLink";
/** Un ensemble de nodes et d'edges qui forment une représentation logique d'un réseau de transport. */
export interface NetworkProps extends ExtendedItemProps {
  bimoId?: string;
  businessId?: string;
  nodes?: NetworkNodesCollection;
  edges?: NetworkEdgesCollection;
  sections?: string;
}
export declare class Network extends Item<Network> {
  bimoId?: string;
  businessId?: string;
  nodes: NetworkNodesCollection;
  edges: NetworkEdgesCollection;
  sections: NetworkSectionsCollection;
  deletedNodes: Set<NetworkNode>;
  deletedEdges: Set<NetworkEdge>;
  constructor(props: NetworkProps);
  get shortLoggingOutput(): string;
  get mediumLoggingOutput(): string;
  get adjacentLinksByNode(): Map<NetworkNode, AdjacentLink[]>;
  removeEdge(
    edge: NetworkEdge,
    options?: {
      removeNodes?: boolean;
      skipCacheUpdate?: boolean;
    }
  ): void;
  removeEdges(
    arrayOrSetOfEdges: NetworkEdge[] | Set<NetworkEdge>,
    options?: {
      removeNodes?: boolean;
    }
  ): void;
  removeNodes(
    arrayOrSetOfNodes: NetworkNode[] | Set<NetworkNode>,
    options?: {
      removeEdges?: boolean;
    }
  ): void;
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
  ): NetworkEdge[];
  /**
   * Keeps only the nodes for which the callback returns true, and resets the adjacent links
   * MUTATES the network
   * @param callback Callback function to apply to each item - returns true if item should be kept
   * @returns Array of items that were kept in the collection
   */
  filterNodes(
    callback: (value: NetworkNode, index: number, array: NetworkNode[]) => boolean
  ): NetworkNode[];
  addEdge(
    edge: NetworkEdge,
    options?: {
      skipCacheUpdate?: boolean;
    }
  ): NetworkEdge;
  hasEdge(edge: NetworkEdge): boolean;
  removeNode(
    node: NetworkNode,
    options?: {
      removeEdges?: boolean;
      skipCacheUpdate?: boolean;
    }
  ): void;
  addNode(
    node: NetworkNode,
    options?: {
      skipCacheUpdate?: boolean;
    }
  ): NetworkNode;
  hasNode(node: NetworkNode): boolean;
  get mermaidString(): string;
}
