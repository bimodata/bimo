import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { NetworkNodesCollection } from "./NetworkNodesCollection";
import { NetworkEdgesCollection } from "./NetworkEdgesCollection";
import { NetworkEdge } from "./NetworkEdge";
import { NetworkNode } from "./NetworkNode";
/** Un sous-ensemble de nodes et d'edges d'un network qui partagent des caractéristiques communes.
 * Par exemple un ensemble de nodes et d'edges qui forment la voie 1 entre Amiens et Beauvais.
 */
export interface NetworkSectionProps extends ExtendedItemProps {
  bimoId: string;
  businessId?: string;
  nodes: NetworkNodesCollection;
  edges: NetworkEdgesCollection;
}
export declare class NetworkSection extends Item<NetworkSection> {
  bimoId: string;
  businessId?: string;
  nodes: NetworkNodesCollection;
  edges: NetworkEdgesCollection;
  constructor(props: NetworkSectionProps);
  get shortLoggingOutput(): string;
  get mediumLoggingOutput(): string;
  hasEdge(edge: NetworkEdge): boolean;
  addEdge(
    edge: NetworkEdge,
    {
      addNodes,
    }?: {
      addNodes?: boolean;
    }
  ): void;
  addNode(node: NetworkNode): void;
  hasNode(node: NetworkNode): boolean;
}
