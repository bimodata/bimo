import { NetworkEvent, NetworkEventProps } from "./NetworkEvent";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
export interface NetworkEventsCollectionProps
  extends ExtendedCollectionProps<NetworkEvent, NetworkEventProps> {}
export declare class NetworkEventsCollection extends Collection<
  NetworkEvent,
  NetworkEventProps
> {
  constructor(props?: NetworkEventsCollectionProps);
}
