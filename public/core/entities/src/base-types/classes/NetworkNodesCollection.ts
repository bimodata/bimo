import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { NetworkNode, NetworkNodeProps } from "./NetworkNode";
import { Network } from "./Network";
export interface NetworkNodesCollectionProps
  extends ExtendedCollectionProps<NetworkNode, NetworkNodeProps> {}
export declare class NetworkNodesCollection extends Collection<
  NetworkNode,
  NetworkNodeProps
> {
  parent?: Network;
  constructor(props?: NetworkNodesCollectionProps);
}
