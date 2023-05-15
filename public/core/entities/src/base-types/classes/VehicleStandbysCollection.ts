import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { VehicleStandby, VehicleStandbyProps } from "./VehicleStandby";
import { VehicleSchedule } from "./VehicleSchedule";
export interface VehicleStandbysCollectionProps extends ExtendedCollectionProps<VehicleStandby, VehicleStandbyProps> {
}
export declare class VehicleStandbysCollection extends Collection<VehicleStandby, VehicleStandbyProps> {
    parent?: VehicleSchedule;
    constructor(props?: VehicleStandbysCollectionProps);
}
export default VehicleStandbysCollection;
