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
export declare class ServiceContextInterval extends Item<ServiceContextInterval> {
  scintStartDate?: string;
  scintEndDate?: string;
  scintSunday?: string;
  scintMonday?: string;
  scintTuesday?: string;
  scintWednesday?: string;
  scintThursday?: string;
  scintFriday?: string;
  scintSaturday?: string;
  constructor(props: ServiceContextIntervalProps);
}
