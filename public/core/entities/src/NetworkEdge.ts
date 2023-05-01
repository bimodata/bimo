import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { NetworkNode } from "./NetworkNode";
import { Network } from "./Network";
import { NetworkSection } from "./NetworkSection";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [NetworkNode];

/** Une représentation logique d'un lien entre deux points discrets du réseau */
export interface NetworkEdgeProps extends ExtendedItemProps {
  bimoId?: string;
  businessId?: string;
  fromNode: NetworkNode;
  toNode: NetworkNode;
  geometryBySystemName?: { [systemName: string]: any };
  sectionIds?: Set<string>;
}

export class NetworkEdge extends Item<NetworkEdge> {
  bimoId?: string;
  businessId?: string;
  fromNode: NetworkNode;
  toNode: NetworkNode;
  geometryBySystemName: { [systemName: string]: any } = {};
  private _sectionIds: Set<string> = new Set();
  constructor(props: NetworkEdgeProps) {
    super(props);
    this.bimoId = gavpfp("bimoId", props, "string");
    this.businessId = gavpfp("businessId", props, "string");
    this.fromNode = gavpfp("fromNode", props, NetworkNode, null);
    this.toNode = gavpfp("toNode", props, NetworkNode, null);

    /**
     * Permet (optionnellement) de stocker une ou plusieurs représentations géométriques de
     * cet arc. Par convention, si aucune géométrie n'est spécifiée pour un système donné,
     * on considère que la géométrie est une droite entre les deux noeuds.
     */
    this.geometryBySystemName = gavpfp("geometryBySystemName", props, Object, {});
    this._sectionIds = gavpfp("sectionIds", props, Set, new Set());
  }

  getCoordinatesBySystemName(systemName: string) {
    return (
      this.geometryBySystemName[systemName]?.coordinates ?? [
        this.fromNode.coordinatesBySystemName[systemName],
        this.toNode.coordinatesBySystemName[systemName],
      ]
    );
  }

  get sections() {
    return (
      this.network &&
      [...this._sectionIds.values()].map((sectionId) =>
        (this.network as Network).sections.getById(sectionId)
      )
    );
  }

  addSection(section: NetworkSection) {
    this._sectionIds.add(section.bimoId);
  }

  removeSection(section: NetworkSection) {
    this._sectionIds.delete(section.bimoId);
  }

  get shortLoggingOutput() {
    return `edge: ${this.businessId} (${
      this.fromNode && this.fromNode.shortLoggingOutput
    } -> ${this.toNode && this.toNode.shortLoggingOutput})`;
  }

  get mediumLoggingOutput() {
    return `edge: ${this.businessId} (${
      this.fromNode && this.fromNode.mediumLoggingOutput
    } -> ${this.toNode && this.toNode.mediumLoggingOutput})`;
  }

  /** This currently uses the same key function as was used initially in "transcoRfn", to be able
   * to compare edges created back then with new ones. This is probably not very performant and
   * could be changed in projects where we don't need this retrocompatibility.
   */
  get sortedNodeIdsKey() {
    return this._getAndSetCachedValue("sortedNodeIdsKey", () => {
      let smallNodeId: string;
      let bigNodeId: string;
      if (parseInt(this.fromNode.businessId, 10) > parseInt(this.toNode.businessId, 10)) {
        smallNodeId = this.toNode.businessId;
        bigNodeId = this.fromNode.businessId;
      } else {
        smallNodeId = this.fromNode.businessId;
        bigNodeId = this.toNode.businessId;
      }

      return `${smallNodeId}_${bigNodeId}`;
    });
  }

  get nodes() {
    return [this.fromNode, this.toNode];
  }

  /**
   * @param node
   * @returns - the node of edge that is not the passed node
   */
  otherNode(node: NetworkNode) {
    if (this.fromNode === node) return this.toNode;
    if (this.toNode === node) return this.fromNode;
    throw new Error(
      `La node ${node.shortLoggingOutput} n'est pas liée à cette edge ${this.shortLoggingOutput}`
    );
  }

  hasNode(node: NetworkNode) {
    return this.fromNode === node || this.toNode === node;
  }

  get isDisconnected() {
    return this.fromNode.degree === 1 && this.toNode.degree === 1;
  }

  get network() {
    return this.parent && (this.parent.parent as Network);
  }

  moveToNetwork(
    targetNetwork: Network,
    options: { bringNodes?: boolean; copyNodes?: boolean; skipCacheUpdate?: boolean }
  ) {
    const { bringNodes = true, copyNodes = false, skipCacheUpdate = false } = options;
    if (this.network) {
      this.network.removeEdge(this, { removeNodes: bringNodes, skipCacheUpdate });
    }
    if (bringNodes) {
      this.nodes.forEach((node) => {
        node.moveToNetwork(targetNetwork, { bringEdges: false, skipCacheUpdate });
      });
    } else if (copyNodes) {
      throw new Error(`CopyNodes option is not implemented yet`);
    } else {
      throw new Error(`Only bringNodes mode is implemented so far`);
      // check if appropriate nodes exist in dest network ??
    }
    targetNetwork.addEdge(this);
  }
}

NetworkEdge.allChildClasses = getAllChildClasses(childClasses);

export default NetworkEdge;
