import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
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

export class OvernightLink extends Item<OvernightLink> {
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
  constructor(props: OvernightLinkProps) {
    super(props);
    this.olInternalNumber = gavpfp("olInternalNumber", props);
    this.olOriginTripNo = gavpfp("olOriginTripNo", props);
    this.olOriginOrigTripNo = gavpfp("olOriginOrigTripNo", props);
    this.olOriginPlace = gavpfp("olOriginPlace", props);
    this.olOriginRoute = gavpfp("olOriginRoute", props);
    this.olOriginTime = gavpfp("olOriginTime", props);
    this.olDestinationTripNo = gavpfp("olDestinationTripNo", props);
    this.olDestinationOrigTripNo = gavpfp("olDestinationOrigTripNo", props);
    this.olDestinationPlace = gavpfp("olDestinationPlace", props);
    this.olDestinationRoute = gavpfp("olDestinationRoute", props);
    this.olDestinationTime = gavpfp("olDestinationTime", props);
    this.olDhLayAt = gavpfp("olDhLayAt", props);
    this.olSchedType = gavpfp("olSchedType", props);
  }
}

OvernightLink.hastusKeywords = ["overnight_link"];
OvernightLink.hastusObject = "overnight_link";

OvernightLink.allChildClasses = getAllChildClasses(childClasses);

export default OvernightLink;
