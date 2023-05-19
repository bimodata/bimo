import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { Block as BimoBlock } from "../base-types/rawIndex";
export { Block as BimoBlock } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import _ from "lodash";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { BimoBlkvehuoirsCollection } from "./BlkvehuoirsCollection";
import { BimoBlockActivitiesCollection } from "./BlockActivitiesCollection";
import { BimoVehicleTask } from "./VehicleTask";
import { BimoVehicleUnit } from "./VehicleUnit";
import { BimoVehicleSchedule } from "./VehicleSchedule";
import { BimoTrip } from "./Trip";

export interface BlockProps extends ExtendedItemProps {
  blkIntNumber?: string;
  blkNumber?: string;
  blkRouteUser?: string;
  blkPrepOutUser?: string;
  blkPrepInUser?: string;
  blkStartUpAtStationUser?: string;
  blkShutDownAtStationUser?: string;
  blkVehicleGroup?: string;
  blkVehicleType?: string;
  blkGarageUser?: string;
  blkVehicleNumber?: string;
  blkGroup?: string;
  blkIsFixed?: string;
  blkVehUnitCount?: number | string;
  blkRelTypeStrt?: string;
  blkRelTypeEnd?: string;
  blkConsistPatternUser?: string;
  blkNumOperation?: string;
  blkvehuoirs?: BimoBlkvehuoirsCollection;
  blockActivities?: BimoBlockActivitiesCollection;
}

export function BlockClassFactory({
  BlkvehuoirsCollection,
  BlockActivitiesCollection,
  VehicleTask,
  VehicleUnit,
  VehicleSchedule,
  Trip,
}: EntityConstructorByEntityClassKey): typeof BimoBlock {
  const childClasses: (typeof Entity)[] = [
    BlkvehuoirsCollection,
    BlockActivitiesCollection,
  ];

  class Block extends Item<Block> {
    blkIntNumber?: string;
    blkNumber?: string;
    blkRouteUser?: string;
    blkPrepOutUser?: string;
    blkPrepInUser?: string;
    blkStartUpAtStationUser?: string;
    blkShutDownAtStationUser?: string;
    blkVehicleGroup?: string;
    blkVehicleType?: string;
    blkGarageUser?: string;
    blkVehicleNumber?: string;
    blkGroup?: string;
    blkIsFixed?: string;
    blkVehUnitCount: number = 0;
    blkRelTypeStrt?: string;
    blkRelTypeEnd?: string;
    blkConsistPatternUser?: string;
    blkNumOperation?: string;
    blkvehuoirs: BimoBlkvehuoirsCollection;
    blockActivities: BimoBlockActivitiesCollection;
    constructor(props: BlockProps) {
      super(props);
      this.blkIntNumber = gavpfp("blkIntNumber", props);
      this.blkNumber = gavpfp("blkNumber", props, "string", this.blkIntNumber);
      this.blkRouteUser = gavpfp("blkRouteUser", props);
      this.blkPrepOutUser = gavpfp("blkPrepOutUser", props);
      this.blkPrepInUser = gavpfp("blkPrepInUser", props);
      this.blkStartUpAtStationUser = gavpfp(
        "blkStartUpAtStationUser",
        props,
        `string`,
        `0`
      );
      this.blkShutDownAtStationUser = gavpfp(
        "blkShutDownAtStationUser",
        props,
        `string`,
        `0`
      );
      this.blkVehicleGroup = gavpfp("blkVehicleGroup", props);
      this.blkVehicleType = gavpfp("blkVehicleType", props);
      this.blkGarageUser = gavpfp("blkGarageUser", props);
      this.blkVehicleNumber = gavpfp("blkVehicleNumber", props);
      this.blkGroup = gavpfp("blkGroup", props);
      this.blkIsFixed = gavpfp("blkIsFixed", props, `string`, `0`);
      this.blkVehUnitCount = gavpfp("blkVehUnitCount", props, "number", 0);
      this.blkRelTypeStrt = gavpfp("blkRelTypeStrt", props);
      this.blkRelTypeEnd = gavpfp("blkRelTypeEnd", props);
      this.blkConsistPatternUser = gavpfp("blkConsistPatternUser", props);
      this.blkNumOperation = gavpfp("blkNumOperation", props);

      this.blkvehuoirs = gavpfp(
        "blkvehuoirs",
        props,
        BlkvehuoirsCollection,
        new BlkvehuoirsCollection(),
        { altPropName: "blkvehuoir", parent: this }
      );
      this.blockActivities = gavpfp(
        "blockActivities",
        props,
        BlockActivitiesCollection,
        new BlockActivitiesCollection(),
        { altPropName: "block_activity", parent: this }
      );
    }

    get vehicleTasks(): BimoVehicleTask[] | undefined {
      return (
        this.vehicleSchedule &&
        Array.from(
          this.vehicleSchedule.setOfVtasByBlock.get(this) as Set<BimoVehicleTask>
        )
      );
    }

    get vehicleUnitsAtStart(): BimoVehicleUnit[] | undefined {
      return (
        this.vehicleSchedule &&
        this.blkvehuoirs.map((blkVehuOir) => {
          const vehu = this.vehicleSchedule?.vehicleUnits.getById(
            blkVehuOir.vehuUniqueId
          );
          if (!vehu)
            throw new Error(
              `Could not find vehicule unit with id ${blkVehuOir.vehuUniqueId}`
            );
          return vehu;
        })
      );
    }

    get vehicleSchedule() {
      return this.parent && (this.parent.parent as BimoVehicleSchedule);
    }

    get startTimeAsDuration() {
      return _.minBy(this.blockActivities.items, "startTimeAsDuration")
        ?.startTimeAsDuration;
    }

    get endTimeAsDuration() {
      return _.maxBy(this.blockActivities.items, "endTimeAsDuration")?.endTimeAsDuration;
    }

    sortBlockActivitiesByTime() {
      this.blockActivities.sortByTime();
    }

    addTrip(trip: BimoTrip) {
      this.blockActivities.addTrip(trip);
    }

    addVehuAtStart(vehu: BimoVehicleUnit) {
      this.blkVehUnitCount += 1;
      this.blkvehuoirs.createNewItem({
        blkvehuoirRank: this.blkVehUnitCount,
        vehuUniqueId: vehu.vehuInternalNumber,
      });
    }

    removeTrip(trip: BimoTrip) {
      this.blockActivities.removeTrip(trip);
    }

    addTrips(...trips: BimoTrip[]) {
      trips.forEach((trip) => {
        this.addTrip(trip);
      });
    }

    get shortLoggingOutput() {
      return `${this.blkNumber}-(${this.vehicleUnitsAtStart
        ?.map((vehu) => vehu.vehuIdentifierUser)
        .join(", ")})-[${this.blockActivities.length}]`;
    }

    get mediumLoggingOutput() {
      return `${this.shortLoggingOutput}${
        this.vehicleSchedule
          ? ` (vsc: ${this.vehicleSchedule.shortLoggingOutput})`
          : ` (no vsc)`
      }`;
    }

    get longLoggingOutput() {
      return `${this.mediumLoggingOutput}\n${this.blockActivities.longLoggingOutput}`;
    }
  }

  Block.hastusKeywords = ["block"];
  Block.hastusObject = "block";

  Block.allChildClasses = getAllChildClasses(childClasses);

  return Block;
}

export default BlockClassFactory;
