import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { PassengerLoadTripsCollection } from "./PassengerLoadTripsCollection";
import { PassengerLoadTrip } from "./PassengerLoadTrip";
export interface PassengerLoadVersionProps extends ExtendedItemProps {
  bimoId?: string;
  pldvIdentifier?: string;
  pldvDescription?: string;
  pldvDataGroup?: string;
  pldvOwner?: string;
  pldvPublicAccess?: string;
  pldvUserStamp?: string;
  passengerLoadTrips: PassengerLoadTripsCollection;
}
export declare class PassengerLoadVersion extends Item<PassengerLoadVersion> {
  bimoId?: string;
  pldvIdentifier?: string;
  pldvDescription?: string;
  pldvDataGroup?: string;
  pldvOwner?: string;
  pldvPublicAccess?: string;
  pldvUserStamp?: string;
  passengerLoadTrips: PassengerLoadTripsCollection;
  constructor(props: PassengerLoadVersionProps);
  get shortLoggingOutput(): string;
  addPassengerLoadTrip(pldTrip: PassengerLoadTrip): void;
  removePassengerLoadTrip(pldTrip: PassengerLoadTrip): void;
}
