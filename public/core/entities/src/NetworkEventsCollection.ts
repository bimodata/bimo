import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { NetworkEventsCollection as BimoNetworkEventsCollection } from "../base-types/rawIndex";
export { NetworkEventsCollection as BimoNetworkEventsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { BimoNetworkEvent, NetworkEventProps } from "./NetworkEvent";

import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

export interface NetworkEventsCollectionProps
  extends ExtendedCollectionProps<BimoNetworkEvent, NetworkEventProps> {}

export function NetworkEventsCollectionClassFactory({
  NetworkEvent,
}: EntityConstructorByEntityClassKey): typeof BimoNetworkEventsCollection {
  const childClasses: (typeof Entity)[] = [NetworkEvent];

  class NetworkEventsCollection extends Collection<BimoNetworkEvent, NetworkEventProps> {
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

  return NetworkEventsCollection;
}

export default NetworkEventsCollectionClassFactory;
