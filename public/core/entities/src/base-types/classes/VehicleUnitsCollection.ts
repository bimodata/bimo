import { VehicleUnit, VehicleUnitProps } from "./VehicleUnit";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
export interface VehicleUnitsCollectionProps extends ExtendedCollectionProps<VehicleUnit, VehicleUnitProps> {
}
export declare class VehicleUnitsCollection extends Collection<VehicleUnit, VehicleUnitProps> {
    constructor(props?: VehicleUnitsCollectionProps);
}
export default VehicleUnitsCollection;
