import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { NetworkEdge, NetworkEdgeProps } from "./NetworkEdge";
import { Network } from "./Network";

const childClasses = [NetworkEdge];

export interface NetworkEdgesCollectionProps
  extends ExtendedCollectionProps<NetworkEdge, NetworkEdgeProps> {}

export class NetworkEdgesCollection extends Collection<NetworkEdge, NetworkEdgeProps> {
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

export default NetworkEdgesCollection;
