import getAndSetIfRequired from "@bimo/core-utils-get-and-set-if-required";
import { BimoBlockActivity } from "../class-factories/BlockActivity";
import { BimoVehicleSchedule } from "../class-factories/VehicleSchedule";
import {
  BlockActivityItem,
  BaseBlockActivityItem,
} from "../class-factories/BlockActivityItem";

export function computeActivityEntityItemsOfVsc(vsc: BimoVehicleSchedule) {
  const activityEntityItemByBlockActivity: Map<
    BimoBlockActivity,
    BlockActivityItem<BaseBlockActivityItem>
  > = new Map();
  const setOfBlockActivitiesByBlockActivityEntityItem: Map<
    BlockActivityItem<BaseBlockActivityItem>,
    Set<BimoBlockActivity>
  > = new Map();

  vsc.blocks.forEach((block) => {
    block.blockActivities.forEach((blockActivity) => {
      const collectionKey =
        collectionKeyByEntityClassKey[blockActivity.activityEntityClassKey];
      const hastusIdKey =
        hastusIdKeyByEntityClassKey[blockActivity.activityEntityClassKey];

      let activityEntityItem = vsc[collectionKey].getByBusinessId(
        blockActivity[hastusIdKey]
      );
      if (!activityEntityItem) {
        const foundInOtherSchedule = vsc.vscincloirs.some((vscInclOir) => {
          activityEntityItem = vscInclOir.vsc?.[collectionKey].getByBusinessId(
            blockActivity[hastusIdKey]
          );
          return !!activityEntityItem;
        });
        if (!foundInOtherSchedule) {
          throw new Error(
            `Impossible de trouver un ${blockActivity.activityNameByLanguageCode.fr} avec l'id ${blockActivity[hastusIdKey]} ` +
              `dans l'horaire ${vsc.shortLoggingOutput} et ses horaires inclus.`
          );
        }
      }

      const setOfBlockActivitiesOfThisEntityItem = getAndSetIfRequired(
        setOfBlockActivitiesByBlockActivityEntityItem,
        activityEntityItem,
        new Set()
      );
      setOfBlockActivitiesOfThisEntityItem.add(blockActivity);

      if (!activityEntityItem) throw new Error(`Activité manquante`);
      activityEntityItemByBlockActivity.set(blockActivity, activityEntityItem);
    });
  });
  return {
    setOfBlockActivitiesByBlockActivityEntityItem,
    activityEntityItemByBlockActivity,
  };
}

export default computeActivityEntityItemsOfVsc;

export type ComputedActivityEntityItemObjects = ReturnType<
  typeof computeActivityEntityItemsOfVsc
>;

export type BlockActivityCollectionKey =
  | "trips"
  | "consistChanges"
  | "vehicleStandbys"
  | "maintenances";

export type CollectionKeyByEntityClassKey = {
  Trip: "trips";
  ConsistChange: "consistChanges";
  VehicleStandby: "vehicleStandbys";
  Maintenance: "maintenances";
};

const collectionKeyByEntityClassKey: CollectionKeyByEntityClassKey = {
  Trip: "trips",
  ConsistChange: "consistChanges",
  VehicleStandby: "vehicleStandbys",
  Maintenance: "maintenances",
};

// {[entityClassKey in BlockActivityEntityClassKey]}
export type HastusIdKeyByEntityClassKey = {
  Trip: "blkactTripNo";
  ConsistChange: "blkactCchgNo";
  VehicleStandby: "blkactVehicleStandbyNo";
  Maintenance: "blkactMaintenanceNo";
};
const hastusIdKeyByEntityClassKey: HastusIdKeyByEntityClassKey = {
  Trip: "blkactTripNo",
  ConsistChange: "blkactCchgNo",
  VehicleStandby: "blkactVehicleStandbyNo",
  Maintenance: "blkactMaintenanceNo",
};
