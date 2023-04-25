import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';
import { serializeThis, parseThis } from '@bimo/core-utils-serialization';
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

export interface ServiceContextIntervalProps extends ExtendedItemProps {
  scintStartDate?: string;
  scintEndDate?: string;
  scintSunday?: string;
  scintMonday?: string;
  scintTuesday?: string;
  scintWednesday?: string;
  scintThursday?: string;
  scintFriday?: string;
  scintSaturday?: string;
}

export class ServiceContextInterval extends Item<ServiceContextInterval> {
  scintStartDate?: string;
  scintEndDate?: string;
  scintSunday?: string;
  scintMonday?: string;
  scintTuesday?: string;
  scintWednesday?: string;
  scintThursday?: string;
  scintFriday?: string;
  scintSaturday?: string;
  constructor(props: ServiceContextIntervalProps) {
    super(props);
    this.scintStartDate = gavpfp('scintStartDate', props, `string`);
    this.scintEndDate = gavpfp('scintEndDate', props, `string`);
    this.scintSunday = gavpfp('scintSunday', props, `string`);
    this.scintMonday = gavpfp('scintMonday', props, `string`);
    this.scintTuesday = gavpfp('scintTuesday', props, `string`);
    this.scintWednesday = gavpfp('scintWednesday', props, `string`);
    this.scintThursday = gavpfp('scintThursday', props, `string`);
    this.scintFriday = gavpfp('scintFriday', props, `string`);
    this.scintSaturday = gavpfp('scintSaturday', props, `string`);
  }
}




export default ServiceContextInterval;
