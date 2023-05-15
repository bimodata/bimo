import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface ServiceEvolutionPeriodSchedulesBookingProps extends ExtendedItemProps {
    bkIdentifier?: string;
}
export declare class ServiceEvolutionPeriodSchedulesBooking extends Item<ServiceEvolutionPeriodSchedulesBooking> {
    bkIdentifier?: string;
    constructor(props: ServiceEvolutionPeriodSchedulesBookingProps);
}
export default ServiceEvolutionPeriodSchedulesBooking;
