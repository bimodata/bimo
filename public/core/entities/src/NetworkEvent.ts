const childClasses = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

export interface NetworkEventProps extends ExtendedItemProps {
  nevtIdentifier: string;
}

export class NetworkEvent extends Item<NetworkEvent> {
  nevtIdentifier: string;
  constructor(props: NetworkEventProps) {
    super(props);
    this.nevtIdentifier = gavpfp("nevtIdentifier", props);
  }
}

NetworkEvent.hastusKeywords = ["network_event"];
NetworkEvent.hastusObject = "network_event";

NetworkEvent.allChildClasses = getAllChildClasses(childClasses);

export default NetworkEvent;
