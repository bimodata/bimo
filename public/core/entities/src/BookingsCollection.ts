import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { BookingsCollection as BimoBookingsCollection } from "../base-types/rawIndex";
export { BookingsCollection as BimoBookingsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
/* eslint-disable no-self-assign */
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoBooking, BookingProps } from "./Booking";
export function BookingsCollectionClassFactory({
  Booking,
}: EntityConstructorByEntityClassKey): typeof BimoBookingsCollection{
  
  const childClasses: (typeof Entity)[] = [Booking];
  
  export interface BookingsCollectionProps
  extends ExtendedCollectionProps<BimoBooking, BookingProps> {}
  
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
  }
  
  BookingsCollection.allChildClasses = getAllChildClasses(childClasses);
  
  /* I/O info */
  BookingsCollection.defaultExportedDataDataName = `output_booking`;
  BookingsCollection.defaultImportDataDataName = `input_booking`;
  
  return BookingsCollection
}

export default BookingsCollectionClassFactory