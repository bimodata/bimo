import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { NetworkEdgesCollection as BimoNetworkEdgesCollection } from "../base-types/rawIndex";
export { NetworkEdgesCollection as BimoNetworkEdgesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoNetworkEdge, NetworkEdgeProps } from "./NetworkEdge";
import { BimoNetwork, NetworkProps } from "./Network";
export function NetworkEdgesCollectionClassFactory({
  NetworkEdge,
  Network,
}: EntityConstructorByEntityClassKey): typeof BimoNetworkEdgesCollection{
  
  const childClasses: (typeof Entity)[] = [NetworkEdge];
  
  export interface NetworkEdgesCollectionProps
  extends ExtendedCollectionProps<BimoNetworkEdge, NetworkEdgeProps> {}
  
 class NetworkEdgesCollection extends Collection<BimoNetworkEdge, NetworkEdgeProps> {
    declare parent?: Network;
    constructor(props: NetworkEdgesCollectionProps = {}) {
      super({
        itemName: "NetworkEdge",
        ItemConstructor: NetworkEdge,
        idPropName: "bimoId",
        businessIdPropName: "businessId",
        labelPropName: "businessId",
        associationType: "composition",
        ...props,
      });
    }
  }
  
  NetworkEdgesCollection.allChildClasses = getAllChildClasses(childClasses);
  
  return NetworkEdgesCollection
}

export default NetworkEdgesCollectionClassFactory