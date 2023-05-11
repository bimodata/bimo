import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { SchedulingUnitDatesCollection } from "./SchedulingUnitDatesCollection";
import { SchedulingUnitDate } from "./SchedulingUnitDate";
export interface BookingCalendarDateProps extends ExtendedItemProps {
    bcaldDate?: string;
    bcaldServiceDefId?: string;
    schedulingUnitDates?: string;
}
export declare class BookingCalendarDate extends Item<BookingCalendarDate> {
    bcaldDate?: string;
    bcaldServiceDefId?: string;
    schedulingUnitDates: SchedulingUnitDatesCollection;
    constructor(props: BookingCalendarDateProps);
    get dateAsIsoDateString(): any;
    addSchedUnitDate(schedulingUnitDate: SchedulingUnitDate): void;
    get mediumLoggingOutput(): string;
    get shortLoggingOutput(): string;
}
export default BookingCalendarDate;
