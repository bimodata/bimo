import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BookingsCollection } from "./BookingsCollection";
import { BookingCalendar, BookingCalendarProps } from "./BookingCalendar";
import { ServiceDefinitionsCollection } from "./ServiceDefinitionsCollection";
import { SchedulingUnitsCollection } from "./SchedulingUnitsCollection";
export interface BookingCalendarsCollectionProps
  extends ExtendedCollectionProps<BookingCalendar, BookingCalendarProps> {}
export declare class BookingCalendarsCollection extends Collection<
  BookingCalendar,
  BookingCalendarProps
> {
  serviceDefinitions: ServiceDefinitionsCollection;
  schedulingUnits: SchedulingUnitsCollection;
  bookings: BookingsCollection;
  constructor(props?: BookingCalendarsCollectionProps);
  generateOirStyleData(): {
    booking_calendar: any[];
    service_definition: any[];
    scheduling_unit: any[];
    booking: import("./Booking").Booking[];
  };
}
