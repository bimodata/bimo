import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import {
  ServiceEvolutionPeriodSchedulesBooking,
  ServiceEvolutionPeriodSchedulesBookingProps,
} from "./ServiceEvolutionPeriodSchedulesBooking";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [ServiceEvolutionPeriodSchedulesBooking];

export interface ServiceEvolutionPeriodSchedulesBookingsCollectionProps
  extends ExtendedCollectionProps<
    ServiceEvolutionPeriodSchedulesBooking,
    ServiceEvolutionPeriodSchedulesBookingProps
  > {}

export class ServiceEvolutionPeriodSchedulesBookingsCollection extends Collection<
  ServiceEvolutionPeriodSchedulesBooking,
  ServiceEvolutionPeriodSchedulesBookingProps
> {
  constructor(props: ServiceEvolutionPeriodSchedulesBookingsCollectionProps = {}) {
    super({
      itemName: "ServiceEvolutionPeriodSchedulesBooking",
      ItemConstructor: ServiceEvolutionPeriodSchedulesBooking,
      associationType: "aggregation",
      ...props,
    });
  }
}

ServiceEvolutionPeriodSchedulesBookingsCollection.allChildClasses =
  getAllChildClasses(childClasses);

export default ServiceEvolutionPeriodSchedulesBookingsCollection;
