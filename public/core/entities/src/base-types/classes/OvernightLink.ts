import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface OvernightLinkProps extends ExtendedItemProps {
  olOriginTripNo?: string;
  olOriginOrigTripNo?: string;
  olOriginPlace?: string;
  olOriginRoute?: string;
  olOriginTime?: string;
  olDestinationTripNo?: string;
  olDestinationOrigTripNo?: string;
  olDestinationPlace?: string;
  olDestinationRoute?: string;
  olDestinationTime?: string;
  olDhLayAt?: string;
  olSchedType?: string;
}
export declare class OvernightLink extends Item<OvernightLink> {
  olInternalNumber?: string;
  olOriginTripNo?: string;
  olOriginOrigTripNo?: string;
  olOriginPlace?: string;
  olOriginRoute?: string;
  olOriginTime?: string;
  olDestinationTripNo?: string;
  olDestinationOrigTripNo?: string;
  olDestinationPlace?: string;
  olDestinationRoute?: string;
  olDestinationTime?: string;
  olDhLayAt?: string;
  olSchedType?: string;
  constructor(props: OvernightLinkProps);
}
