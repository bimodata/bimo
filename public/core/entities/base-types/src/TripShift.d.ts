import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface TripShiftProps extends ExtendedItemProps {
    tripshiftTripNo: string;
    tripshiftActualShift?: string;
}
export declare class TripShift extends Item<TripShift> {
    tripshiftTripNo: string;
    tripshiftActualShift?: string;
    constructor(props: TripShiftProps);
}
export default TripShift;
