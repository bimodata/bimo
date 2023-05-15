import { TripTp, TripTpProps } from "./TripTp";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
export interface TripTpsCollectionProps extends ExtendedCollectionProps<TripTp, TripTpProps> {
}
export declare class TripTpsCollection extends Collection<TripTp, TripTpProps> {
    constructor(props?: TripTpsCollectionProps);
}
export default TripTpsCollection;
