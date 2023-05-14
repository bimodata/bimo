import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { NetworkSectionsCollection as BimoNetworkSectionsCollection } from "../base-types/rawIndex";
export { NetworkSectionsCollection as BimoNetworkSectionsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoNetworkSection, NetworkSectionProps } from "./NetworkSection";

export interface NetworkSectionsCollectionProps
  extends ExtendedCollectionProps<BimoNetworkSection, NetworkSectionProps> {}

export function NetworkSectionsCollectionClassFactory({
  NetworkSection,
}: EntityConstructorByEntityClassKey): typeof BimoNetworkSectionsCollection {
  const childClasses: (typeof Entity)[] = [NetworkSection];

  class NetworkSectionsCollection extends Collection<
    BimoNetworkSection,
    NetworkSectionProps
  > {
    constructor(props: NetworkSectionsCollectionProps = {}) {
      super({
        itemName: "NetworkSection",
        ItemConstructor: NetworkSection,
        idPropName: "bimoId",
        businessIdPropName: "businessId",
        labelPropName: "label",
        associationType: "aggregation",
        ...props,
      });
    }
  }

  NetworkSectionsCollection.allChildClasses = getAllChildClasses(childClasses);

  return NetworkSectionsCollection;
}

export default NetworkSectionsCollectionClassFactory;
