import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { BookingsCollection as BimoBookingsCollection } from "../base-types/rawIndex";
export { BookingsCollection as BimoBookingsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
/* eslint-disable no-self-assign */
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoBooking, BookingProps } from "./Booking";
export interface BookingsCollectionProps
  extends ExtendedCollectionProps<BimoBooking, BookingProps> {}

export function BookingsCollectionClassFactory({
  Booking,
}: EntityConstructorByEntityClassKey): typeof BimoBookingsCollection {
  const childClasses: (typeof Entity)[] = [Booking];

  class BookingsCollection extends Collection<BimoBooking, BookingProps> {
    constructor(props: BookingsCollectionProps = {}) {
      super({
        itemName: "Booking",
        ItemConstructor: Booking,
        idPropName: `bimoId`,
        labelPropName: "bkDescription",
        associationType: `aggregation`,
        ...props,
      });
    }

    generateOirStyleData() {
      return { booking: this.items };
    }

    /**
     *
     * @param {Object} oirStyleData - données en "style" oir, telles qu'obtenues de OIG-OIR-to-JSON
     */
    static createFromOirStyleData(oirStyleData: any, label: string) {
      const rawBookings = oirStyleData.booking;

      if (!rawBookings) {
        throw new Error(`Bad oirStyleData: could not find "booking" key`);
      }
      const newBookingsCollection = new this({ items: rawBookings, label });
      return newBookingsCollection;
    }
  }

  BookingsCollection.allChildClasses = getAllChildClasses(childClasses);

  /* I/O info */
  BookingsCollection.defaultExportedDataDataName = `output_booking`;
  BookingsCollection.defaultImportDataDataName = `input_booking`;

  return BookingsCollection;
}

export default BookingsCollectionClassFactory;
