import _ from "lodash";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import {
  BlkvehuoirsCollection,
  BlkvehuoirsCollectionProps,
} from "./BlkvehuoirsCollection";
import {
  BlockActivitiesCollection,
  BlockActivitiesCollectionProps,
} from "./BlockActivitiesCollection";

import { VehicleTask } from "./VehicleTask";
import { VehicleUnit } from "./VehicleUnit";
import { VehicleSchedule } from "./VehicleSchedule";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [
  BlkvehuoirsCollection,
  BlockActivitiesCollection,
];

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
  blkVehUnitCount?: string;
  blkRelTypeStrt?: string;
  blkRelTypeEnd?: string;
  blkConsistPatternUser?: string;
  blkNumOperation?: string;
  blkvehuoirs?: string;
  blockActivities?: string;
}

export class Block extends Item<Block> {
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
  blkvehuoirs: BlkvehuoirsCollection;
  blockActivities: BlockActivitiesCollection;
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

  get vehicleTasks() {
    return (
      this.vehicleSchedule &&
      Array.from(this.vehicleSchedule.setOfVtasByBlock.get(this) as Set<VehicleTask>)
    );
  }

  get vehicleUnitsAtStart(): VehicleUnit[] | undefined {
    return (
      this.vehicleSchedule &&
      this.blkvehuoirs.map((blkVehuOir) => {
        const vehu = this.vehicleSchedule?.vehicleUnits.getById(blkVehuOir.vehuUniqueId);
        if (!vehu) throw new Error(``);
        return;
      })
    );
  }

  get vehicleSchedule() {
    return this.parent && (this.parent.parent as VehicleSchedule);
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

  addTrip(trip) {
    this.blockActivities.addTrip(trip);
  }

  addVehuAtStart(vehu) {
    this.blkVehUnitCount += 1;
    this.blkvehuoirs.createNewItem({
      blkvehuoirRank: this.blkVehUnitCount,
      vehuUniqueId: vehu.vehuInternalNumber,
    });
  }

  removeTrip(trip) {
    this.blockActivities.removeTrip(trip);
  }

  addTrips(...trips) {
    trips.forEach((trip) => {
      this.addTrip(trip);
    });
  }

  get shortLoggingOutput() {
    return `${this.blkNumber}-[${this.blockActivities.length}]`;
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

export default Block;
