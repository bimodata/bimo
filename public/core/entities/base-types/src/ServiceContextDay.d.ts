import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface ServiceContextDayProps extends ExtendedItemProps {
    scdayWeekRank?: string;
    scdayProdPhaseDay?: string;
    scdayApplicMethod?: string;
    scdaySpecSchedName?: string;
    scdaySpecSchedType?: string;
    scdaySpecSchedScenario?: string;
    scdaySpecSchedBooking?: string;
    scdayGetFromCalendarId?: string;
    scdayGetFromBookingId?: string;
    scdayGetFromContext?: string;
    scdayGetFromDayRank?: string;
}
export declare class ServiceContextDay extends Item<ServiceContextDay> {
    scdayWeekRank?: string;
    scdayProdPhaseDay?: string;
    scdayApplicMethod?: string;
    scdaySpecSchedName?: string;
    scdaySpecSchedType?: string;
    scdaySpecSchedScenario?: string;
    scdaySpecSchedBooking?: string;
    scdayGetFromCalendarId?: string;
    scdayGetFromBookingId?: string;
    scdayGetFromContext?: string;
    scdayGetFromDayRank?: string;
    constructor(props: ServiceContextDayProps);
}
export default ServiceContextDay;
