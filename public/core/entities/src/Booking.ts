import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { Booking as BimoBooking } from "../base-types/rawIndex";
export { Booking as BimoBooking } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

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

export function BookingClassFactory(
  entityConstructorByEntityClassKey: EntityConstructorByEntityClassKey
): typeof BimoBooking {
  class Booking extends Item<Booking> {
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

  return Booking;
}

export default BookingClassFactory;
