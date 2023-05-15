import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ConsistChange, ConsistChangeProps } from "./ConsistChange";
import { VehicleSchedule } from "./VehicleSchedule";
export interface ConsistChangesCollectionProps extends ExtendedCollectionProps<ConsistChange, ConsistChangeProps> {
}
export declare class ConsistChangesCollection extends Collection<ConsistChange, ConsistChangeProps> {
    parent?: VehicleSchedule;
    constructor(props?: ConsistChangesCollectionProps);
}
export default ConsistChangesCollection;
