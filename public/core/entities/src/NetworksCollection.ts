import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { NetworksCollection as BimoNetworksCollection } from "../base-types/rawIndex";
export { NetworksCollection as BimoNetworksCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoNetwork, NetworkProps } from "./Network";

export interface NetworksCollectionProps
  extends ExtendedCollectionProps<BimoNetwork, NetworkProps> {}

export function NetworksCollectionClassFactory({
  Network,
}: EntityConstructorByEntityClassKey): typeof BimoNetworksCollection {
  const childClasses: (typeof Entity)[] = [Network];

  class NetworksCollection extends Collection<BimoNetwork, NetworkProps> {
    constructor(props: NetworksCollectionProps = {}) {
      super({
        itemName: "Network",
        ItemConstructor: Network,
        idPropName: "bimoId",
        businessIdPropName: "businessId",
        labelPropName: "label",
        associationType: "aggregation",
        ...props,
      });
    }
  }

  NetworksCollection.allChildClasses = getAllChildClasses(childClasses);

  return NetworksCollection;
}

export default NetworksCollectionClassFactory;
