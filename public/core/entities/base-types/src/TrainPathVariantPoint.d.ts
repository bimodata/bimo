import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface TrainPathVariantPointProps extends ExtendedItemProps {
    trnpvptPlace: string;
    trnpvptArrivalTime?: string;
    trnpvptLoadTime?: string;
    trnpvptNoStopping?: string;
    trnpvptPassMidnight?: string;
}
export declare class TrainPathVariantPoint extends Item<TrainPathVariantPoint> {
    trnpvptPlace: string;
    trnpvptArrivalTime?: string;
    trnpvptLoadTime?: string;
    trnpvptNoStopping?: string;
    trnpvptPassMidnight?: string;
    constructor(props: TrainPathVariantPointProps);
    get shortLoggingOutput(): string;
}
export default TrainPathVariantPoint;
