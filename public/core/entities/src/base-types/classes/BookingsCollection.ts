import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { Booking, BookingProps } from "./Booking";
export interface BookingsCollectionProps
  extends ExtendedCollectionProps<Booking, BookingProps> {}
export declare class BookingsCollection extends Collection<Booking, BookingProps> {
  constructor(props?: BookingsCollectionProps);
  generateOirStyleData(): {
    booking: Booking[];
  };
}
