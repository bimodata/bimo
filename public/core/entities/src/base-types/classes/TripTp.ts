import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface TripTpProps extends ExtendedItemProps {
    ttpPlace?: string;
    ttpPassingTime?: string;
    ttpRunTimeDiff?: string;
    ttpSkipped?: string;
    ttpNote?: string;
    ttpDistance?: string;
    ttpIsPublic?: string;
    ttpHoldTime?: string;
    ttpHoldType?: string;
    ttpIsLoading?: string;
}
export declare class TripTp extends Item<TripTp> {
    ttpPlace?: string;
    ttpPassingTime?: string;
    ttpRunTimeDiff?: string;
    ttpSkipped?: string;
    ttpNote?: string;
    ttpDistance?: string;
    ttpIsPublic?: string;
    ttpHoldTime?: string;
    ttpHoldType?: string;
    ttpIsLoading?: string;
    constructor(props: TripTpProps);
}
export default TripTp;
