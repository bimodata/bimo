import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { NetworkEdge, NetworkEdgeProps } from "./NetworkEdge";
import { Network } from "./Network";
export interface NetworkEdgesCollectionProps extends ExtendedCollectionProps<NetworkEdge, NetworkEdgeProps> {
}
export declare class NetworkEdgesCollection extends Collection<NetworkEdge, NetworkEdgeProps> {
    parent?: Network;
    constructor(props?: NetworkEdgesCollectionProps);
}
export default NetworkEdgesCollection;
