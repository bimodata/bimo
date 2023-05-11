import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { TrainPathVariant, TrainPathVariantProps } from "./TrainPathVariant";
export interface TrainPathVariantsCollectionProps extends ExtendedCollectionProps<TrainPathVariant, TrainPathVariantProps> {
}
export declare class TrainPathVariantsCollection extends Collection<TrainPathVariant, TrainPathVariantProps> {
    constructor(props?: TrainPathVariantsCollectionProps);
    get self(): this;
}
export default TrainPathVariantsCollection;
