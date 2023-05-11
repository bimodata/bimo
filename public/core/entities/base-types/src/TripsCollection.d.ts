import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { Trip, TripProps } from "./Trip";
export interface TripsCollectionProps extends ExtendedCollectionProps<Trip, TripProps> {
}
export declare class TripsCollection extends Collection<Trip, TripProps> {
    constructor(props?: TripsCollectionProps);
    /**
     * Groups all the trips of the collection by trip number
     * @returns {Map<String, Trip[]>} a map of trips arrays, indexed by trip number
     */
    get tripsByTripNumber(): Map<any, Trip[]>;
    get mediumLoggingOutput(): string;
}
export default TripsCollection;
