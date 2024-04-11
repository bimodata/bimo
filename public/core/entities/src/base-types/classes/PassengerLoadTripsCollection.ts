import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { PassengerLoadTrip, PassengerLoadTripProps } from "./PassengerLoadTrip";
export interface PassengerLoadTripsCollectionProps
  extends ExtendedCollectionProps<PassengerLoadTrip, PassengerLoadTripProps> {}
export declare class PassengerLoadTripsCollection extends Collection<
  PassengerLoadTrip,
  PassengerLoadTripProps
> {
  constructor(props?: PassengerLoadTripsCollectionProps);
}
