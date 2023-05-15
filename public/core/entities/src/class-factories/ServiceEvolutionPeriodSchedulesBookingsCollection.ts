import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ServiceEvolutionPeriodSchedulesBookingsCollection as BimoServiceEvolutionPeriodSchedulesBookingsCollection } from "../base-types/rawIndex";
export { ServiceEvolutionPeriodSchedulesBookingsCollection as BimoServiceEvolutionPeriodSchedulesBookingsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import {
  BimoServiceEvolutionPeriodSchedulesBooking,
  ServiceEvolutionPeriodSchedulesBookingProps,
} from "./ServiceEvolutionPeriodSchedulesBooking";

export interface ServiceEvolutionPeriodSchedulesBookingsCollectionProps
  extends ExtendedCollectionProps<
    BimoServiceEvolutionPeriodSchedulesBooking,
    ServiceEvolutionPeriodSchedulesBookingProps
  > {}

export function ServiceEvolutionPeriodSchedulesBookingsCollectionClassFactory({
  ServiceEvolutionPeriodSchedulesBooking,
}: EntityConstructorByEntityClassKey): typeof BimoServiceEvolutionPeriodSchedulesBookingsCollection {
  const childClasses: (typeof Entity)[] = [ServiceEvolutionPeriodSchedulesBooking];
  class ServiceEvolutionPeriodSchedulesBookingsCollection extends Collection<
    BimoServiceEvolutionPeriodSchedulesBooking,
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

  return ServiceEvolutionPeriodSchedulesBookingsCollection;
}

export default ServiceEvolutionPeriodSchedulesBookingsCollectionClassFactory;
