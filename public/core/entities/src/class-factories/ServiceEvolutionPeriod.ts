import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ServiceEvolutionPeriod as BimoServiceEvolutionPeriod } from "../base-types/rawIndex";
export { ServiceEvolutionPeriod as BimoServiceEvolutionPeriod } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { BimoServiceEvolutionPeriodSchedulesBookingsCollection } from "./ServiceEvolutionPeriodSchedulesBookingsCollection";
import { BimoServiceContextWeeksCollection } from "./ServiceContextWeeksCollection";

export interface ServiceEvolutionPeriodProps extends ExtendedItemProps {
  sevopStartDate?: string;
  sevopServiceDefId?: string;
  serviceEvolutionPeriodSchedulesBookings?: string;
  serviceContextWeeks?: string;
}

export function ServiceEvolutionPeriodClassFactory({
  ServiceEvolutionPeriodSchedulesBookingsCollection,
  ServiceContextWeeksCollection,
}: EntityConstructorByEntityClassKey): typeof BimoServiceEvolutionPeriod {
  const childClasses: (typeof Entity)[] = [
    ServiceEvolutionPeriodSchedulesBookingsCollection,
    ServiceContextWeeksCollection,
  ];
  class ServiceEvolutionPeriod extends Item<ServiceEvolutionPeriod> {
    sevopStartDate?: string;
    sevopServiceDefId?: string;
    serviceEvolutionPeriodSchedulesBookings: BimoServiceEvolutionPeriodSchedulesBookingsCollection;
    serviceContextWeeks: BimoServiceContextWeeksCollection;
    constructor(props: ServiceEvolutionPeriodProps) {
      super(props);
      this.sevopStartDate = gavpfp("sevopStartDate", props, `string`);
      this.sevopServiceDefId = gavpfp("sevopServiceDefId", props, `string`);

      this.serviceEvolutionPeriodSchedulesBookings = gavpfp(
        "serviceEvolutionPeriodSchedulesBookings",
        props,
        ServiceEvolutionPeriodSchedulesBookingsCollection,
        new ServiceEvolutionPeriodSchedulesBookingsCollection(),
        { altPropName: "service_evolution_period_schedules_booking", parent: this }
      );

      this.serviceContextWeeks = gavpfp(
        "serviceContextWeeks",
        props,
        ServiceContextWeeksCollection,
        new ServiceContextWeeksCollection(),
        { altPropName: "service_context_week", parent: this }
      );
    }
  }

  ServiceEvolutionPeriod.allChildClasses = getAllChildClasses(childClasses);

  return ServiceEvolutionPeriod;
}

export default ServiceEvolutionPeriodClassFactory;
