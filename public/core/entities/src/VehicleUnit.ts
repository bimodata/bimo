import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { VehicleUnit as BimoVehicleUnit } from "../base-types/rawIndex";
export { VehicleUnit as BimoVehicleUnit } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

const childClasses: (typeof Entity)[] = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { BimoVehicleSchedule, VehicleScheduleProps } from "./VehicleSchedule";
import { BimoVehicleTask, VehicleTaskProps } from "./VehicleTask";
export function VehicleUnitClassFactory({
  VehicleSchedule,
  VehicleTask,
}: EntityConstructorByEntityClassKey): typeof BimoVehicleUnit{
  
  export interface VehicleUnitProps extends ExtendedItemProps {
    vehuInternalNumber: string;
    vehuIdentifierUser?: string;
    vehuVehicleGroup?: string;
    vehuVehicleType?: string;
    vehuCodeRoulement?: string;
    vehicleTask?: VehicleTask;
  }
  
 class VehicleUnit extends Item<VehicleUnit> {
    vehuInternalNumber: string;
    vehuIdentifierUser?: string;
    vehuVehicleGroup?: string;
    vehuVehicleType?: string;
    vehuCodeRoulement?: string;
    vehicleTask?: VehicleTask;
    constructor(props: VehicleUnitProps) {
      super(props);
      this.vehuInternalNumber = gavpfp("vehuInternalNumber", props);
      this.vehuIdentifierUser = gavpfp("vehuIdentifierUser", props);
      this.vehuVehicleGroup = gavpfp("vehuVehicleGroup", props);
      this.vehuVehicleType = gavpfp("vehuVehicleType", props);
  
      this.vehuCodeRoulement = gavpfp("vehuCodeRoulement", props);
  
      this.vehicleTask = undefined;
    }
  
    get shortLoggingOutput() {
      return `internalNumber: ${this.vehuInternalNumber} userIdentifier: ${this.vehuIdentifierUser}`;
    }
  
    /** @type {VehicleSchedule} */
    get vehicleSchedule() {
      return this.parent && this.parent.parent;
    }
  }
  
  VehicleUnit.hastusKeywords = ["vehicle_unit"];
  VehicleUnit.hastusObject = "vehicle_unit";
  
  VehicleUnit.allChildClasses = getAllChildClasses(childClasses);
  
  return VehicleUnit
}

export default VehicleUnitClassFactory