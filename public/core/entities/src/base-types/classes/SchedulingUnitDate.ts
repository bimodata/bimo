import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface SchedulingUnitDateProps extends ExtendedItemProps {
    scudSchedUnitName?: string;
    scudSchedUnitType?: string;
    scudProdPhaseDate?: string;
    scudApplicMethod?: string;
    scudSpecSchedName?: string;
    scudSpecSchedType?: string;
    scudSpecSchedScenario?: string;
    scudSpecSchedBooking?: string;
    scudGetFromSource?: string;
    scudGetFromDayRank?: string;
    scudGetFromCalendarId?: string;
    scudGetFromBookingId?: string;
    scudGetFromDate?: string;
    scudProdBookingId?: string;
    scudProdSchedType?: string;
}
export declare class SchedulingUnitDate extends Item<SchedulingUnitDate> {
    scudSchedUnitName?: string;
    scudSchedUnitType?: string;
    scudProdPhaseDate?: string;
    scudApplicMethod?: string;
    scudSpecSchedName?: string;
    scudSpecSchedType?: string;
    scudSpecSchedScenario?: string;
    scudSpecSchedBooking?: string;
    scudGetFromSource?: string;
    scudGetFromDayRank?: string;
    scudGetFromCalendarId?: string;
    scudGetFromBookingId?: string;
    scudGetFromDate?: string;
    scudProdBookingId?: string;
    scudProdSchedType?: string;
    constructor(props: SchedulingUnitDateProps);
    get mediumLoggingOutput(): string;
    get shortLoggingOutput(): string;
}
export default SchedulingUnitDate;
