import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { BookingCalendarDatesCollection } from "./BookingCalendarDatesCollection";
import { ServiceEvolutionsCollection } from "./ServiceEvolutionsCollection";
import { ServiceContextsCollection } from "./ServiceContextsCollection";
import { BookingCalendarDate } from "./BookingCalendarDate";
export interface BookingCalendarProps extends ExtendedItemProps {
  bcalBookingId?: string;
  bcalCalendarId?: string;
  bcalType?: string;
  bcalDescription?: string;
  bcalOwner?: string;
  bcalPublicAccess?: string;
  bcalIsForCompatibility?: string;
  bcalEffectiveCalendarId?: string;
  bookingCalendarDates?: string;
  serviceEvolutions?: string;
  serviceContexts?: string;
}
export declare class BookingCalendar extends Item<BookingCalendar> {
  bcalBookingId?: string;
  bcalCalendarId?: string;
  bcalType?: string;
  bcalDescription?: string;
  bcalOwner?: string;
  bcalPublicAccess?: string;
  bcalIsForCompatibility?: string;
  bcalEffectiveCalendarId?: string;
  bookingCalendarDates: BookingCalendarDatesCollection;
  serviceEvolutions: ServiceEvolutionsCollection;
  serviceContexts: ServiceContextsCollection;
  constructor(props: BookingCalendarProps);
  addBCalDate(bcalDate: BookingCalendarDate): void;
  get mediumLoggingOutput(): string;
  get shortLoggingOutput(): string;
}
