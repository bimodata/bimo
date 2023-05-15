import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { TrainPathVariantPoint, TrainPathVariantPointProps } from "./TrainPathVariantPoint";
export interface TrainPathVariantPointsCollectionProps extends ExtendedCollectionProps<TrainPathVariantPoint, TrainPathVariantPointProps> {
}
export declare class TrainPathVariantPointsCollection extends Collection<TrainPathVariantPoint, TrainPathVariantPointProps> {
    constructor(props?: TrainPathVariantPointsCollectionProps);
    get self(): this;
}
export default TrainPathVariantPointsCollection;
