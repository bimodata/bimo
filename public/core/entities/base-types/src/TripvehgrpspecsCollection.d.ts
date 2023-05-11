import { Tripvehgrpspec, TripvehgrpspecProps } from "./Tripvehgrpspec";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
export interface TripvehgrpspecsCollectionProps extends ExtendedCollectionProps<Tripvehgrpspec, TripvehgrpspecProps> {
}
export declare class TripvehgrpspecsCollection extends Collection<Tripvehgrpspec, TripvehgrpspecProps> {
    constructor(props?: TripvehgrpspecsCollectionProps);
}
export default TripvehgrpspecsCollection;
