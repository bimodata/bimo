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

export default BlockActivityItem;

export function computeSetOfBlockActivitiesHelper<ItemType>(
  blockActivityItem: BlockActivityItem<ItemType>
) {
  if (!blockActivityItem.vehicleSchedule)
    throw new Error(
      `An item must have a vehicleSchedule when its blockActivities are accessed(${blockActivityItem.slo})`
    );
  let setOfBlockActivities: Set<BlockActivity> =
    blockActivityItem.vehicleSchedule.setOfBlockActivitiesByBlockActivityEntityItem.get(
      blockActivityItem
    );
  if (!setOfBlockActivities) {
    const foundInBlockingVsc = blockActivityItem.vehicleSchedule.blockingVscs.some(
      (blockingVsc) => {
        setOfBlockActivities =
          blockingVsc.setOfBlockActivitiesByBlockActivityEntityItem.get(
            blockActivityItem
          );
        return setOfBlockActivities;
      }
    );
    if (!foundInBlockingVsc) {
      /** This is pretty weird but corresponds to a case where we don't really know what is the blocking vsc
       * of a block activity, and we are not interested in figuring it out here. We still want the item to
       * have a "local" memory of its block activities, and we are actually confident that if the
       * vscs caches were reset, everything would fall back in order, but to avoid recomputing these
       * caches too often, we use this "local cache"
       */
      setOfBlockActivities = blockActivityItem._getAndSetCachedValue(
        "fallbackSetOfBlockActivities",
        () => new Set()
      );
    }
  }
  return setOfBlockActivities;
}

export function getSingleBlockActivityHelper<ItemType>(
  blockActivityItem: BlockActivityItem<ItemType>
) {
  const blockActs = blockActivityItem.blockActivities;
  return (blockActs && blockActs[0]) ?? null;
}
