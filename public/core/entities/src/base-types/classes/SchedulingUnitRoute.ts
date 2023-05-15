import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface SchedulingUnitRouteProps extends ExtendedItemProps {
    rteIdentifier?: string;
}
export declare class SchedulingUnitRoute extends Item<SchedulingUnitRoute> {
    rteIdentifier?: string;
    constructor(props: SchedulingUnitRouteProps);
}
export default SchedulingUnitRoute;
