import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { VehicleUnit as BimoVehicleUnit } from "../base-types/rawIndex";
export { VehicleUnit as BimoVehicleUnit } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { BimoVehicleSchedule } from "./VehicleSchedule";
import { BimoVehicleTask } from "./VehicleTask";

export interface VehicleUnitProps extends ExtendedItemProps {
  vehuInternalNumber: string;
  vehuIdentifierUser?: string;
  vehuVehicleGroup?: string;
  vehuVehicleType?: string;
  vehuCodeRoulement?: string;
  vehicleTask?: BimoVehicleTask;
}

export function VehicleUnitClassFactory({}: EntityConstructorByEntityClassKey): typeof BimoVehicleUnit {
  const childClasses: (typeof Entity)[] = [];
  class VehicleUnit extends Item<VehicleUnit> {
    vehuInternalNumber: string;
    vehuIdentifierUser?: string;
    vehuVehicleGroup?: string;
    vehuVehicleType?: string;
    vehuCodeRoulement?: string;
    vehicleTask?: BimoVehicleTask;
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

    get vehicleSchedule() {
      return this.parent && (this.parent.parent as BimoVehicleSchedule);
    }
  }

  VehicleUnit.hastusKeywords = ["vehicle_unit"];
  VehicleUnit.hastusObject = "vehicle_unit";

  VehicleUnit.allChildClasses = getAllChildClasses(childClasses);

  return VehicleUnit;
}

export default VehicleUnitClassFactory;
