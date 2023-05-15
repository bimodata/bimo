import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BookingCalendarDate, BookingCalendarDateProps } from "./BookingCalendarDate";
export interface BookingCalendarDatesCollectionProps
  extends ExtendedCollectionProps<BookingCalendarDate, BookingCalendarDateProps> {}
export declare class BookingCalendarDatesCollection extends Collection<
  BookingCalendarDate,
  BookingCalendarDateProps
> {
  constructor(props: BookingCalendarDatesCollectionProps);
  getByIsoDate(
    isoDate: string,
    {
      refreshCache,
    }?: {
      refreshCache?: boolean;
    }
  ): BookingCalendarDate | null;
  getByDate(date: string): BookingCalendarDate | undefined;
  sortByDate(): void;
  get first(): BookingCalendarDate;
  get last(): BookingCalendarDate;
}
export default BookingCalendarDatesCollection;
