import { TripShift, TripShiftProps } from "./TripShift";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
export interface TripShiftsCollectionProps extends ExtendedCollectionProps<TripShift, TripShiftProps> {
}
export declare class TripShiftsCollection extends Collection<TripShift, TripShiftProps> {
    constructor(props?: TripShiftsCollectionProps);
}
export default TripShiftsCollection;
