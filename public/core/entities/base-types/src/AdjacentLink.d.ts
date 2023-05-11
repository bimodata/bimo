import { NetworkNode } from "./NetworkNode";
import { NetworkEdge } from "./NetworkEdge";
/**
 * A link is a helper object that makes it easier to traverse the network in a certain order
 * A node has as many adjacent links as it has edges, but on the adjacent link, we can easily
 * know which one of the fromNode and toNode of the edge is the current node
 * On each adjacent link, the start node is the node from which the adjacent link was obtained.
 *
 *   [n1]====e1====[n2]======e2====[n3]
 *
 * In the example above, suppose that
 *  - e1 is defined as { fromNode: n1, toNode: n2 }
 *  - e2 is defined as { fromNode: n3, toNode: n2 }
 *
 * If we have n2, but we don't know how the edges were defined, and we want to get to n1 or n3.
 * Using n2.edges, we would have to check, on each edge, if n2 is the fromNode or the toNode, then
 * use the other node.
 *
 * Using n2.adjacentLinks, by definition, the startNode of each adjacentLink is n2, and the endNode is
 * the other node.
 *
 * nextLink and previousLink are helper props specific to degree 2 nodes
 * From n1, we have only one link (to n2 through e1) that we will call l(1->2)
 * l(1->2).nextLink returns the link from n2 to n3 through e2
 * There is no previousLink on l(1->2) since n1 is degree 1
 *
 * From n2, using the link to n3 l(2->3)
 * l(2->3).previousLink returns l(1->2)
 * There is no nextLink on l(2->3) since n3 is degree 1
 */
export declare class AdjacentLink {
    startNode: NetworkNode;
    endNode: NetworkNode;
    edge: NetworkEdge;
    constructor(startNode: NetworkNode, endNode: NetworkNode, edge: NetworkEdge);
    get network(): import("./Network").Network;
    /** Should probably be renamed oppositeLink */
    get reverseLink(): AdjacentLink;
    /** Works only if the end node is degree 2 - returns the end node's adjacent link that is not on the same edge
     * as the current link   */
    get nextLink(): AdjacentLink;
    /** Works only if the start node is degree 2 - returns the start node's adjacent link that is not on the same edge
     * as the current link   */
    get previousLink(): AdjacentLink;
}
export default AdjacentLink;
