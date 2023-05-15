import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { ServiceEvolutionPeriodSchedulesBookingsCollection } from "./ServiceEvolutionPeriodSchedulesBookingsCollection";
import { ServiceContextWeeksCollection } from "./ServiceContextWeeksCollection";
export interface ServiceEvolutionPeriodProps extends ExtendedItemProps {
    sevopStartDate?: string;
    sevopServiceDefId?: string;
    serviceEvolutionPeriodSchedulesBookings?: string;
    serviceContextWeeks?: string;
}
export declare class ServiceEvolutionPeriod extends Item<ServiceEvolutionPeriod> {
    sevopStartDate?: string;
    sevopServiceDefId?: string;
    serviceEvolutionPeriodSchedulesBookings: ServiceEvolutionPeriodSchedulesBookingsCollection;
    serviceContextWeeks: ServiceContextWeeksCollection;
    constructor(props: ServiceEvolutionPeriodProps);
}
export default ServiceEvolutionPeriod;
