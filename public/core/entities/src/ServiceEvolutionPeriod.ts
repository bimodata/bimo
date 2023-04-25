import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';
import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { ServiceEvolutionPeriodSchedulesBookingsCollection, ServiceEvolutionPeriodSchedulesBookingsCollectionProps } from "./ServiceEvolutionPeriodSchedulesBookingsCollection";
import { ServiceContextWeeksCollection, ServiceContextWeeksCollectionProps } from "./ServiceContextWeeksCollection";

const childClasses = [ServiceEvolutionPeriodSchedulesBookingsCollection, ServiceContextWeeksCollection];

export interface ServiceEvolutionPeriodProps extends ExtendedItemProps {
  sevopStartDate?: string;
  sevopServiceDefId?: string;
  serviceEvolutionPeriodSchedulesBookings?: string;
  serviceContextWeeks?: string;
}

export class ServiceEvolutionPeriod extends Item<ServiceEvolutionPeriod> {
  sevopStartDate?: string;
  sevopServiceDefId?: string;
  serviceEvolutionPeriodSchedulesBookings?: string;
  serviceContextWeeks?: string;
  constructor(props: ServiceEvolutionPeriodProps) {
    super(props);
    this.sevopStartDate = gavpfp('sevopStartDate', props, `string`);
    this.sevopServiceDefId = gavpfp('sevopServiceDefId', props, `string`);

    /* Children */
    /** @type {ServiceEvolutionPeriodSchedulesBookingsCollection} */
    this.serviceEvolutionPeriodSchedulesBookings = gavpfp(
      'serviceEvolutionPeriodSchedulesBookings', props,
      ServiceEvolutionPeriodSchedulesBookingsCollection,
      new ServiceEvolutionPeriodSchedulesBookingsCollection(),
      { altPropName: 'service_evolution_period_schedules_booking', parent: this },
    );

    /** @type {ServiceContextWeeksCollection} */
    this.serviceContextWeeks = gavpfp(
      'serviceContextWeeks', props,
      ServiceContextWeeksCollection,
      new ServiceContextWeeksCollection(),
      { altPropName: 'service_context_week', parent: this },
    );
  }
}

ServiceEvolutionPeriod.allChildClasses = getAllChildClasses(childClasses);



export default ServiceEvolutionPeriod;
