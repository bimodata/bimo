import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { NetworkSection, NetworkSectionProps } from "./NetworkSection";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [NetworkSection];

export interface NetworkSectionsCollectionProps
  extends ExtendedCollectionProps<NetworkSection, NetworkSectionProps> {}

export class NetworkSectionsCollection extends Collection<
  NetworkSection,
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

export default NetworkSectionsCollection;
