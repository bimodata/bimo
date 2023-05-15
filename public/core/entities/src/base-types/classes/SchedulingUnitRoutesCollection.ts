import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { SchedulingUnitRoute, SchedulingUnitRouteProps } from "./SchedulingUnitRoute";
export interface SchedulingUnitRoutesCollectionProps extends ExtendedCollectionProps<SchedulingUnitRoute, SchedulingUnitRouteProps> {
}
export declare class SchedulingUnitRoutesCollection extends Collection<SchedulingUnitRoute, SchedulingUnitRouteProps> {
    constructor(props: SchedulingUnitRoutesCollectionProps);
}
export default SchedulingUnitRoutesCollection;
