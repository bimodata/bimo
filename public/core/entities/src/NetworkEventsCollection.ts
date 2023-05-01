import { NetworkEvent, NetworkEventProps } from "./NetworkEvent";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [NetworkEvent];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

export interface NetworkEventsCollectionProps
  extends ExtendedCollectionProps<NetworkEvent, NetworkEventProps> {}

export class NetworkEventsCollection extends Collection<NetworkEvent, NetworkEventProps> {
  constructor(props: NetworkEventsCollectionProps = {}) {
    super({
      itemName: "NetworkEvent",
      ItemConstructor: NetworkEvent,
      items: props.items,
      parent: props.parent,
    });
  }
}

NetworkEventsCollection.allChildClasses = getAllChildClasses(childClasses);

export default NetworkEventsCollection;
