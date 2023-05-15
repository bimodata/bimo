import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface NetworkEventProps extends ExtendedItemProps {
  nevtIdentifier: string;
}
export declare class NetworkEvent extends Item<NetworkEvent> {
  nevtIdentifier: string;
  constructor(props: NetworkEventProps);
}
