import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';
import { serializeThis, parseThis } from '@bimo/core-utils-serialization';
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

export interface ServiceEvolutionPeriodSchedulesBookingProps extends ExtendedItemProps {
  bkIdentifier?: string;
}

export class ServiceEvolutionPeriodSchedulesBooking extends Item<ServiceEvolutionPeriodSchedulesBooking> {
  bkIdentifier?: string;
  constructor(props: ServiceEvolutionPeriodSchedulesBookingProps) {
    super(props);
    this.bkIdentifier = gavpfp('bkIdentifier', props, `string`);
  }
}




export default ServiceEvolutionPeriodSchedulesBooking;
