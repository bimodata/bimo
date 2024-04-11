import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface PassengerLoadTripProps extends ExtendedItemProps {
  bimoId?: string;
  pldtTrip?: string;
  pldtTotalLoad?: string;
  pldtStartTime?: string;
  pldtRoute?: string;
  pldtPlace?: string;
  pldtVersion?: string;
  pldtFirstClassLoad?: string;
  pldtEndTime?: string;
  pldtDirection?: string;
}

export declare class PassengerLoadTrip extends Item<PassengerLoadTrip> {
  bimoId?: string;
  pldtTrip?: string;
  pldtTotalLoad?: string;
  pldtStartTime?: string;
  pldtRoute?: string;
  pldtPlace?: string;
  pldtVersion?: string;
  pldtFirstClassLoad?: string;
  pldtEndTime?: string;
  pldtDirection?: string;
  constructor(props: PassengerLoadTripProps);
  get shortLoggingOutput(): string;
}