import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { Network, NetworkProps } from "./Network";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [Network];

export interface NetworksCollectionProps
  extends ExtendedCollectionProps<Network, NetworkProps> {}

export class NetworksCollection extends Collection<Network, NetworkProps> {
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

export default NetworksCollection;
