import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { NetworkMap, NetworkMapProps } from "./NetworkMap";
export interface NetworkMapsCollectionProps extends ExtendedCollectionProps<NetworkMap, NetworkMapProps> {
}
export declare class NetworkMapsCollection extends Collection<NetworkMap, NetworkMapProps> {
    /**
     *
     * @param {Object} props
     * @param {string} props.label
     */
    constructor(props?: NetworkMapsCollectionProps);
}
export default NetworkMapsCollection;
