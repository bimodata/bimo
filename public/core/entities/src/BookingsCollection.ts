/* eslint-disable no-self-assign */
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { Booking, BookingProps } from "./Booking";

const childClasses = [Booking];

export interface BookingsCollectionProps
  extends ExtendedCollectionProps<Booking, BookingProps> {}

export class BookingsCollection extends Collection<Booking, BookingProps> {
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

export default BookingsCollection;
