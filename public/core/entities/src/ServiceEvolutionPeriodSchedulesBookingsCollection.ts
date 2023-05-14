import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ServiceEvolutionPeriodSchedulesBookingsCollection as BimoServiceEvolutionPeriodSchedulesBookingsCollection } from "../base-types/rawIndex";
export { ServiceEvolutionPeriodSchedulesBookingsCollection as BimoServiceEvolutionPeriodSchedulesBookingsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import {
  ServiceEvolutionPeriodSchedulesBooking,
  ServiceEvolutionPeriodSchedulesBookingProps,
} from "./ServiceEvolutionPeriodSchedulesBooking";

const childClasses: (typeof Entity)[] = [ServiceEvolutionPeriodSchedulesBooking];

export interface ServiceEvolutionPeriodSchedulesBookingsCollectionProps
  extends ExtendedCollectionProps<
    ServiceEvolutionPeriodSchedulesBooking,
    ServiceEvolutionPeriodSchedulesBookingProps
  > {}

export function ServiceEvolutionPeriodSchedulesBookingsCollectionClassFactory(entityConstructorByEntityClassKey: EntityConstructorByEntityClassKey): typeof BimoServiceEvolutionPeriodSchedulesBookingsCollection{
 class ServiceEvolutionPeriodSchedulesBookingsCollection extends Collection<
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
  
  return ServiceEvolutionPeriodSchedulesBookingsCollection
}

export default ServiceEvolutionPeriodSchedulesBookingsCollectionClassFactory