import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { NetworkNodesCollection as BimoNetworkNodesCollection } from "../base-types/rawIndex";
export { NetworkNodesCollection as BimoNetworkNodesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoNetworkNode, NetworkNodeProps } from "./NetworkNode";
import { BimoNetwork, NetworkProps } from "./Network";
export function NetworkNodesCollectionClassFactory({
  NetworkNode,
  Network,
}: EntityConstructorByEntityClassKey): typeof BimoNetworkNodesCollection{
  
  const childClasses: (typeof Entity)[] = [NetworkNode];
  
  export interface NetworkNodesCollectionProps
  extends ExtendedCollectionProps<BimoNetworkNode, NetworkNodeProps> {}
  
 class NetworkNodesCollection extends Collection<BimoNetworkNode, NetworkNodeProps> {
    declare parent?: Network;
    constructor(props: NetworkNodesCollectionProps = {}) {
      super({
        itemName: "NetworkNode",
        ItemConstructor: NetworkNode,
        idPropName: "bimoId",
        businessIdPropName: "businessId",
        labelPropName: "businessId",
        associationType: "composition",
        ...props,
      });
    }
  }
  
  NetworkNodesCollection.allChildClasses = getAllChildClasses(childClasses);
  
  return NetworkNodesCollection
}

export default NetworkNodesCollectionClassFactory