import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BookingCalendarDate, BookingCalendarDateProps } from "./BookingCalendarDate";

const childClasses = [BookingCalendarDate];

export interface BookingCalendarDatesCollectionProps
  extends ExtendedCollectionProps<BookingCalendarDate, BookingCalendarDateProps> {}

export class BookingCalendarDatesCollection extends Collection<
  BookingCalendarDate,
  BookingCalendarDateProps
> {
  constructor(props: BookingCalendarDatesCollectionProps) {
    super({
      itemName: "BookingCalendarDate",
      ItemConstructor: BookingCalendarDate,
      associationType: "aggregation",
      businessIdPropName: "bcaldDate",
      ...props,
    });
  }

  getByIsoDate(isoDate: string, { refreshCache = false } = {}) {
    const bcaldsByIsoDate = this.groupByProp("dateAsIsoDateString", { refreshCache });
    const bcalds = bcaldsByIsoDate.get(isoDate);
    if (!bcalds) {
      return null;
    }
    if (bcalds.length > 1) {
      throw new Error("Date répétée");
    }
    return bcalds[0];
  }

  getByDate(date) {
    return this.getByBusinessId(date);
  }

  sortByDate() {
    this.sort((a, b) => (a.dateAsIsoDateString > b.dateAsIsoDateString ? 1 : -1));
  }

  get first() {
    this.sortByDate();
    return this.items[0];
  }

  get last() {
    this.sortByDate();
    return this.items[this.items.length - 1];
  }
}
BookingCalendarDatesCollection.allChildClasses = getAllChildClasses(childClasses);

export default BookingCalendarDatesCollection;
