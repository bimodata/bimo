import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { BookingCalendarDatesCollection as BimoBookingCalendarDatesCollection } from "../base-types/rawIndex";
export { BookingCalendarDatesCollection as BimoBookingCalendarDatesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BimoBookingCalendarDate, BookingCalendarDateProps } from "./BookingCalendarDate";

export interface BookingCalendarDatesCollectionProps
  extends ExtendedCollectionProps<BimoBookingCalendarDate, BookingCalendarDateProps> {}

export function BookingCalendarDatesCollectionClassFactory({
  BookingCalendarDate,
}: EntityConstructorByEntityClassKey): typeof BimoBookingCalendarDatesCollection {
  const childClasses: (typeof Entity)[] = [BookingCalendarDate];

  class BookingCalendarDatesCollection extends Collection<
    BimoBookingCalendarDate,
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

    getByDate(date: string) {
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

  return BookingCalendarDatesCollection;
}

export default BookingCalendarDatesCollectionClassFactory;
