import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

const childClasses = [];
import { getAllChildClasses } from '@bimo/core-utils-serialization';
import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';
import { VehicleSchedule, VehicleScheduleProps } from "./VehicleSchedule";


export interface VehicleUnitProps extends ExtendedItemProps {
  vehuInternalNumber?: string;
  vehuIdentifierUser?: string;
  vehuVehicleGroup?: string;
  vehuVehicleType?: string;
  vehuCodeRoulement?: string;
  vehicleTask?: string;
}

export class VehicleUnit extends Item<VehicleUnit> {
  vehuInternalNumber?: string;
  vehuIdentifierUser?: string;
  vehuVehicleGroup?: string;
  vehuVehicleType?: string;
  vehuCodeRoulement?: string;
  vehicleTask?: string;
  constructor(props: VehicleUnitProps) {
    super(props);
    /** */ this.vehuInternalNumber = gavpfp('vehuInternalNumber', props);
    /** */ this.vehuIdentifierUser = gavpfp('vehuIdentifierUser', props);
    /** */ this.vehuVehicleGroup = gavpfp('vehuVehicleGroup', props);
    /** */ this.vehuVehicleType = gavpfp('vehuVehicleType', props);

    /** */ this.vehuCodeRoulement = gavpfp('vehuCodeRoulement', props);

    /* Children */

    /* Links */

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

VehicleUnit.hastusKeywords = ['vehicle_unit'];
VehicleUnit.hastusObject = 'vehicle_unit';


VehicleUnit.allChildClasses = getAllChildClasses(childClasses);



export default VehicleUnit;
