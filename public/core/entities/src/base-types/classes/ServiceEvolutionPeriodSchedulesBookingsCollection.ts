import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import {
  ServiceEvolutionPeriodSchedulesBooking,
  ServiceEvolutionPeriodSchedulesBookingProps,
} from "./ServiceEvolutionPeriodSchedulesBooking";
export interface ServiceEvolutionPeriodSchedulesBookingsCollectionProps
  extends ExtendedCollectionProps<
    ServiceEvolutionPeriodSchedulesBooking,
    ServiceEvolutionPeriodSchedulesBookingProps
  > {}
export declare class ServiceEvolutionPeriodSchedulesBookingsCollection extends Collection<
  ServiceEvolutionPeriodSchedulesBooking,
  ServiceEvolutionPeriodSchedulesBookingProps
> {
  constructor(props?: ServiceEvolutionPeriodSchedulesBookingsCollectionProps);
}
