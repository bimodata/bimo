import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { NetworkNode } from "./NetworkNode";
import { Network } from "./Network";
import { NetworkSection } from "./NetworkSection";
/** Une représentation logique d'un lien entre deux points discrets du réseau */
export interface NetworkEdgeProps extends ExtendedItemProps {
  bimoId?: string;
  businessId?: string;
  fromNode: NetworkNode;
  toNode: NetworkNode;
  geometryBySystemName?: {
    [systemName: string]: any;
  };
  sectionIds?: Set<string>;
}
export declare class NetworkEdge extends Item<NetworkEdge> {
  bimoId?: string;
  businessId?: string;
  fromNode: NetworkNode;
  toNode: NetworkNode;
  geometryBySystemName: {
    [systemName: string]: any;
  };
  _sectionIds: Set<string>;
  constructor(props: NetworkEdgeProps);
  getCoordinatesBySystemName(systemName: string): any;
  get sections(): (NetworkSection | undefined)[] | undefined;
  addSection(section: NetworkSection): void;
  removeSection(section: NetworkSection): void;
  get shortLoggingOutput(): string;
  get mediumLoggingOutput(): string;
  /** This currently uses the same key function as was used initially in "transcoRfn", to be able
   * to compare edges created back then with new ones. This is probably not very performant and
   * could be changed in projects where we don't need this retrocompatibility.
   */
  get sortedNodeIdsKey(): string;
  get nodes(): NetworkNode[];
  /**
   * @param node
   * @returns - the node of edge that is not the passed node
   */
  otherNode(node: NetworkNode): NetworkNode;
  hasNode(node: NetworkNode): boolean;
  get isDisconnected(): boolean;
  get network(): Network | undefined;
  moveToNetwork(
    targetNetwork: Network,
    options: {
      bringNodes?: boolean;
      copyNodes?: boolean;
      skipCacheUpdate?: boolean;
    }
  ): void;
}
export default NetworkEdge;
