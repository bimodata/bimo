import { Duration } from "luxon";
import { Place } from "./Place";
import { Block } from "./Block";
import { BlockActivity } from "./BlockActivity";
import { VehicleTask } from "./VehicleTask";
import { VehicleSchedule } from "./VehicleSchedule";
import { Item } from "@bimo/core-utils-collection";
import { Trip } from "./Trip";
import { Maintenance } from "./Maintenance";
import { VehicleStandby } from "./VehicleStandby";
import { ConsistChange } from "./ConsistChange";
export type BaseBlockActivityItem = Trip | Maintenance | VehicleStandby | ConsistChange;
export interface BlockActivityItem<ItemType> extends Item<ItemType> {
  blkactVehicleActivityTypeNo: string;
  blockActivities: BlockActivity[];
  addBlockActivity: (newBlockActivity: BlockActivity) => void;
  removeBlockActivity: (blockActivity: BlockActivity) => void;
  blockActivity: BlockActivity;
  vehicleTasks: VehicleTask[] | null;
  block: Block | null;
  vehicleSchedule: VehicleSchedule | null;
  startTime: string;
  startTimeAsDuration: Duration;
  endTime: string;
  endTimeAsDuration: Duration;
  startPlaceId: string;
  endPlaceId: string;
  improveStartPlacePrecision: (morePreciseStartPlace: Place) => void;
  improveEndPlacePrecision: (morePreciseEndPlace: Place) => void;
  shiftTimes: (shiftInSeconds: number) => void;
}
export declare function computeSetOfBlockActivitiesHelper<ItemType>(
  blockActivityItem: BlockActivityItem<ItemType>
): Set<BlockActivity>;
export declare function getSingleBlockActivityHelper<ItemType>(
  blockActivityItem: BlockActivityItem<ItemType>
): BlockActivity;
