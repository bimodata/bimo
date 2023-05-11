import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { Network, NetworkProps } from "./Network";
export interface NetworksCollectionProps extends ExtendedCollectionProps<Network, NetworkProps> {
}
export declare class NetworksCollection extends Collection<Network, NetworkProps> {
    constructor(props?: NetworksCollectionProps);
}
export default NetworksCollection;
