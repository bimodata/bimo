import { Duration } from "luxon";
import { Item } from "@bimo/core-utils-collection";
import { BimoPlace } from "./Place";
import { BimoBlock } from "./Block";
import { BimoBlockActivity } from "./BlockActivity";
import { BimoVehicleTask } from "./VehicleTask";
import { BimoVehicleSchedule } from "./VehicleSchedule";
import { BimoTrip } from "./Trip";
import { BimoMaintenance } from "./Maintenance";
import { BimoVehicleStandby } from "./VehicleStandby";
import { BimoConsistChange } from "./ConsistChange";

export type BaseBlockActivityItem =
  | BimoTrip
  | BimoMaintenance
  | BimoVehicleStandby
  | BimoConsistChange;

export interface BlockActivityItem<ItemType> extends Item<ItemType> {
  blkactVehicleActivityTypeNo: string;
  blockActivities: BimoBlockActivity[];
  addBlockActivity: (newBlockActivity: BimoBlockActivity) => void;
  removeBlockActivity: (blockActivity: BimoBlockActivity) => void;
  blockActivity: BimoBlockActivity;
  vehicleTasks: BimoVehicleTask[] | null;
  block: BimoBlock | null;
  vehicleSchedule: BimoVehicleSchedule | null;
  startTime: string;
  startTimeAsDuration: Duration;
  endTime: string;
  endTimeAsDuration: Duration;
  startPlaceId: string;
  endPlaceId: string;
  improveStartPlacePrecision: (morePreciseStartPlace: BimoPlace) => void;
  improveEndPlacePrecision: (morePreciseEndPlace: BimoPlace) => void;
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
  let setOfBlockActivities: Set<BimoBlockActivity> =
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
