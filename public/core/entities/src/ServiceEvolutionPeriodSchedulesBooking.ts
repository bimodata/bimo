import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ServiceEvolutionPeriodSchedulesBooking as BimoServiceEvolutionPeriodSchedulesBooking } from "../base-types/rawIndex";
export { ServiceEvolutionPeriodSchedulesBooking as BimoServiceEvolutionPeriodSchedulesBooking } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

export interface ServiceEvolutionPeriodSchedulesBookingProps extends ExtendedItemProps {
  bkIdentifier?: string;
}

export function ServiceEvolutionPeriodSchedulesBookingClassFactory(entityConstructorByEntityClassKey: EntityConstructorByEntityClassKey): typeof BimoServiceEvolutionPeriodSchedulesBooking{
 class ServiceEvolutionPeriodSchedulesBooking extends Item<ServiceEvolutionPeriodSchedulesBooking> {
    bkIdentifier?: string;
    constructor(props: ServiceEvolutionPeriodSchedulesBookingProps) {
      super(props);
      this.bkIdentifier = gavpfp("bkIdentifier", props, `string`);
    }
  }
  
  return ServiceEvolutionPeriodSchedulesBooking
}

export default ServiceEvolutionPeriodSchedulesBookingClassFactory