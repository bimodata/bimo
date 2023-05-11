import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { VehicleTask, VehicleTaskProps } from "./VehicleTask";
export interface VehicleTasksCollectionProps extends ExtendedCollectionProps<VehicleTask, VehicleTaskProps> {
}
export declare class VehicleTasksCollection extends Collection<VehicleTask, VehicleTaskProps> {
    constructor(props?: VehicleTasksCollectionProps);
    get mediumLoggingOutput(): string;
}
export default VehicleTasksCollection;
