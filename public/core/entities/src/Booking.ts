import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [];

export interface BookingProps extends ExtendedItemProps {
  bimoId?: string;
  bkIdentifier?: string;
  bkDescription?: string;
  bkDateStart?: string;
  bkDateEnd?: string;
  bkDataGroup?: string;
  bkTrainPathAdministrativeYear?: string;
}

export class Booking extends Item<Booking> {
  bimoId?: string;
  bkIdentifier?: string;
  bkDescription?: string;
  bkDateStart?: string;
  bkDateEnd?: string;
  bkDataGroup?: string;
  bkTrainPathAdministrativeYear?: string;
  constructor(props: BookingProps) {
    super(props);
    this.bimoId = gavpfp("bimoId", props);
    this.bkIdentifier = gavpfp("bkIdentifier", props, `string`);
    this.bkDescription = gavpfp("bkDescription", props, `string`);
    this.bkDateStart = gavpfp("bkDateStart", props, `string`);
    this.bkDateEnd = gavpfp("bkDateEnd", props, `string`);
    this.bkDataGroup = gavpfp("bkDataGroup", props, `string`);
    this.bkTrainPathAdministrativeYear = gavpfp(
      "bkTrainPathAdministrativeYear",
      props,
      `string`
    );
  }
}

Booking.hastusKeywords = ["booking"];
Booking.hastusObject = "booking";

Booking.allChildClasses = getAllChildClasses(childClasses);

export default Booking;
