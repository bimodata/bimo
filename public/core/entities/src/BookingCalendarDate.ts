import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';
import { cleanStringUsingRegexAndReplacePairs } from '@bimo/core-utils-string';
import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { SchedulingUnitDatesCollection, SchedulingUnitDatesCollectionProps } from "./SchedulingUnitDatesCollection";

const childClasses = [SchedulingUnitDatesCollection];

export interface BookingCalendarDateProps extends ExtendedItemProps {
  bcaldDate?: string;
}

export class BookingCalendarDate extends Item<BookingCalendarDate> {
  bcaldDate?: string;
  constructor(props: BookingCalendarDateProps) {
    super(props);
    /**
     * FORMAT DE DATE pour BookingCalendarDates : jj/mm/aaaa.
     */
    const date = gavpfp('bcaldDate', props);
    if (date.match(/^(\d{4})-(\d{2})-(\d{2})$/)) {
      this.bcaldDate = cleanStringUsingRegexAndReplacePairs(date, [['/^(\\d{4})-(\\d{2})-(\\d{2})$/', '$3/$2/$1']]);
    }
    else {
      this.bcaldDate = date;
    }
    this.bcaldServiceDefId = gavpfp('bcaldServiceDefId', props, `string`);

    /* Children */
    /** @type {SchedulingUnitDatesCollection} */
    this.schedulingUnitDates = gavpfp(
      'schedulingUnitDates', props,
      SchedulingUnitDatesCollection,
      new SchedulingUnitDatesCollection(),
      { altPropName: 'scheduling_unit_date', parent: this },
    );
  }

  get dateAsIsoDateString() {
    return this._getAndSetCachedValue(
      'dateAsIsoDateString',
      () => cleanStringUsingRegexAndReplacePairs(this.bcaldDate, [['/^(\\d{2})/(\\d{2})/(\\d{4})$/', '$3-$2-$1']]),
    );
  }

  addSchedUnitDate(schedulingUnitDate) {
    this.schedulingUnitDates.add(schedulingUnitDate);
  }

  get mediumLoggingOutput() {
    return `${this.bcaldDate} (${this.bcaldServiceDefId}) - (${this.schedulingUnitDates.length} scheduling units)`;
  }

  get shortLoggingOutput() {
    return `${this.bcaldDate}`;
  }
}

BookingCalendarDate.allChildClasses = getAllChildClasses(childClasses);



export default BookingCalendarDate;