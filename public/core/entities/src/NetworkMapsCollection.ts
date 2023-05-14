import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { NetworkMapsCollection as BimoNetworkMapsCollection } from "../base-types/rawIndex";
export { NetworkMapsCollection as BimoNetworkMapsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoNetworkMap, NetworkMapProps } from "./NetworkMap";
export interface NetworkMapsCollectionProps
  extends ExtendedCollectionProps<BimoNetworkMap, NetworkMapProps> {}

export function NetworkMapsCollectionClassFactory({
  NetworkMap,
}: EntityConstructorByEntityClassKey): typeof BimoNetworkMapsCollection {
  const childClasses: (typeof Entity)[] = [NetworkMap];

  class NetworkMapsCollection extends Collection<BimoNetworkMap, NetworkMapProps> {
    /**
     *
     * @param {Object} props
     * @param {string} props.label
     */
    constructor(props: NetworkMapsCollectionProps = {}) {
      super({
        itemName: "NetworkMap",
        ItemConstructor: NetworkMap,
        idPropName: "bimoId",
        businessIdPropName: "businessId",
        labelPropName: "label",
        associationType: "aggregation",
        ...props,
      });
    }
  }

  NetworkMapsCollection.allChildClasses = getAllChildClasses(childClasses);

  return NetworkMapsCollection;
}

export default NetworkMapsCollectionClassFactory;
