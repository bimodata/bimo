import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import {
  NetworkEdgesCollection as BimoNetworkEdgesCollection,
  Network as BimoNetwork,
  NetworkEdge as BimoNetworkEdge,
} from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { NetworkEdgeProps } from "./NetworkEdge";

export interface NetworkEdgesCollectionProps
  extends ExtendedCollectionProps<BimoNetworkEdge, NetworkEdgeProps> {}

export function NetworkEdgesCollectionClassFactory({
  NetworkEdge,
}: EntityConstructorByEntityClassKey): typeof BimoNetworkEdgesCollection {
  const childClasses: (typeof Entity)[] = [NetworkEdge];

  class NetworkEdgesCollection extends Collection<BimoNetworkEdge, NetworkEdgeProps> {
    declare parent?: BimoNetwork;
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

  return NetworkEdgesCollection;
}

export default NetworkEdgesCollectionClassFactory;
