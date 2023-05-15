import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface TripvehgrpspecProps extends ExtendedItemProps {
    tripvehgrpspecVehGroup: string;
    tripvehgrpspecReqType?: string;
    tripvehgrpspecPriority?: string;
}
export declare class Tripvehgrpspec extends Item<Tripvehgrpspec> {
    tripvehgrpspecVehGroup: string;
    tripvehgrpspecReqType?: string;
    tripvehgrpspecPriority?: string;
    constructor(props: TripvehgrpspecProps);
}
export default Tripvehgrpspec;
