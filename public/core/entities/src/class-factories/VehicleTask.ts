import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import {
  VehicleTask as BimoVehicleTask,
  BlocksCollection as BimoBlocksCollection,
  VehicleUnit as BimoVehicleUnit,
  VehicleSchedule as BimoVehicleSchedule,
  BlockSectionsCollection as BimoBlockSectionsCollection,
  BlockActivitiesCollection as BimoBlockActivitiesCollection,
} from "../base-types/rawIndex";

import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

export interface VehicleTaskProps extends ExtendedItemProps {
  vehicleUnit: BimoVehicleUnit;
  blocksThatStartWithThisVehu: BimoBlocksCollection;
  id?: string;
  label?: string;
}

export function VehicleTaskClassFactory({}: EntityConstructorByEntityClassKey): typeof BimoVehicleTask {
  /**
   * This class is not serializable. It is meant to be computed from an existing vehicle schedule.
   */
  class VehicleTask extends Item<VehicleTask> {
    vehicleUnit: BimoVehicleUnit;
    blocksThatStartWithThisVehu: BimoBlocksCollection;
    id?: string;
    constructor(props: VehicleTaskProps) {
      super(props);
      this.vehicleUnit = props.vehicleUnit;
      this.vehicleUnit.vehicleTask = this;
      this.blocksThatStartWithThisVehu = props.blocksThatStartWithThisVehu;
      this.id = this.vehicleUnit.vehuInternalNumber;
      this.label = this.vehicleUnit.vehuIdentifierUser;
    }

    get vehicleSchedule() {
      return this.parent && (this.parent.parent as BimoVehicleSchedule);
    }

    get shortLoggingOutput() {
      return `(${this.id})-"${this.label}"-[${this.blocks?.count()}]`;
    }

    get longLoggingOutput() {
      return `${this.shortLoggingOutput}\n${this.blockActivities
        ?.map((ba) => ba.shortLoggingOutput)
        .join("\n")}`;
    }

    get businessLoggingOutput() {
      return `${this.label} (${this.vehicleUnit.vehuVehicleType})\n${this.blockActivities
        ?.map((ba) => ba.shortLoggingOutput)
        .join("\n")}`;
    }

    get blocks(): BimoBlocksCollection | undefined {
      return this.vehicleSchedule?.blocksAndActsAndSectionsByVta.get(this)?.blocks;
    }

    get blockActivities(): BimoBlockActivitiesCollection | undefined {
      return this.vehicleSchedule?.blocksAndActsAndSectionsByVta.get(this)
        ?.blockActivities;
    }

    get blockSections(): BimoBlockSectionsCollection | undefined {
      return this.vehicleSchedule?.blocksAndActsAndSectionsByVta.get(this)?.blockSections;
    }
  }

  return VehicleTask;
}

export default VehicleTaskClassFactory;
