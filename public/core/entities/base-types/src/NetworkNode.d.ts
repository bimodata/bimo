import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { NetworkNodesCollection } from "./NetworkNodesCollection";
import { Network } from "./Network";
import { NetworkSection } from "./NetworkSection";
/** Une représentation logique d'un point discret du réseau. */
export interface NetworkNodeProps extends ExtendedItemProps {
    bimoId: string;
    businessId: string;
    coordinatesBySystemName?: string;
    sectionIds?: Set<string>;
}
export declare class NetworkNode extends Item<NetworkNode> {
    bimoId: string;
    businessId: string;
    coordinatesBySystemName: {
        [systemName: string]: any;
    };
    private _sectionIds;
    parent?: NetworkNodesCollection;
    constructor(props: NetworkNodeProps);
    get network(): Network;
    get sections(): NetworkSection[];
    addSection(section: NetworkSection): void;
    removeSection(section: NetworkSection): void;
    get adjacentLinks(): import("./AdjacentLink").AdjacentLink[];
    set adjacentLinks(newLinks: import("./AdjacentLink").AdjacentLink[]);
    get adjacentEdges(): import("./NetworkEdge").NetworkEdge[];
    get adjacentNodes(): NetworkNode[];
    /** @returns the edge that leads from this node to otherNode */
    getEdgeToNode(otherNode: NetworkNode): import("./NetworkEdge").NetworkEdge;
    get degree(): number;
    get shortLoggingOutput(): string;
    get mediumLoggingOutput(): string;
    get longLoggingOutput(): string;
    moveToNetwork(targetNetwork: Network, options: {
        bringEdges?: boolean;
        copyEdges?: boolean;
        skipCacheUpdate?: boolean;
    }): void;
}
export default NetworkNode;
