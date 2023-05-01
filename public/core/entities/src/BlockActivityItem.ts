import timeAndDate from "@bimo/core-utils-time-and-date";
import { Item, ExtendedItem, ExtendedItemProps } from "@bimo/core-utils-collection";

import { Trip } from "./Trip";
import { Maintenance } from "./Maintenance";
import { VehicleStandby } from "./VehicleStandby";
import { ConsistChange } from "./ConsistChange";

export type BlockActivityItem = Trip | Maintenance | VehicleStandby | ConsistChange;

type Constructor = new (...args: any[]) => any;
type GConstructor<T> = new (...args: any[]) => T;
type Itemable<ItemType extends Constructor> = GConstructor<
  ExtendedItem<InstanceType<ItemType>>
>;

// todo: make sure that switching this from arrow function to real function does not fuckup the
// use of this in the class
export function BlockActivityItemMixin<ItemType extends Itemable<ItemType>>(
  Item: ItemType,
  {
    blkActIdPropName,
    itemIdPropName,
    startTimePropName,
    endTimePropName,
    placePropName,
    startPlacePropName = placePropName,
    endPlacePropName = placePropName,
  }: any
) {
  return class extends Item {
    static get blkActIdPropName() {
      return blkActIdPropName;
    }

    static get itemIdPropName() {
      return itemIdPropName;
    }

    // eslint-disable-next-line class-methods-use-this
    get blkactVehicleActivityTypeNo() {
      throw new Error(`This should be overriden by the subclass`);
    }

    get _setOfBlockActivities() {
      if (!this.vehicleSchedule)
        throw new Error(
          `An item must have a vehicleSchedule when its blockActivities are accessed(${this.slo})`
        );
      let setOfBlockActivities =
        this.vehicleSchedule.setOfblockActivitiesByBlockActivityEntityItem.get(this);
      if (!setOfBlockActivities) {
        const foundInBlockingVsc = this.vehicleSchedule.blockingVscs.some(
          (blockingVsc) => {
            setOfBlockActivities =
              blockingVsc.setOfblockActivitiesByBlockActivityEntityItem.get(this);
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
          setOfBlockActivities = this._getAndSetCachedValue(
            "fallbackSetOfBlockActivities",
            () => new Set()
          );
        }
      }
      return setOfBlockActivities;
    }

    /** @type {import('./BlockActivity')[]} */
    get blockActivities() {
      const setOfBlkActs = this._setOfBlockActivities;
      return setOfBlkActs && Array.from(setOfBlkActs);
    }

    addBlockActivity(newBlockActivity) {
      this._setOfBlockActivities.add(newBlockActivity);
    }

    removeBlockActivity(blockActivity) {
      this._setOfBlockActivities.delete(blockActivity);
    }

    /**
     * TODO: make this smarter
     * @type {import('./BlockActivity')}
     */
    get blockActivity() {
      const blockActs = this.blockActivities;
      return (blockActs && blockActs[0]) ?? null;
    }

    // eslint-disable-next-line class-methods-use-this
    set blockActivity(v) {
      throw new Error(`BlockActivity should not be set manually. Use AddBlockActivity`);
    }

    get vehicleTasks() {
      return this.blockActivity?.vehicleTasks ?? null;
    }

    get block() {
      return this.blockActivity?.block ?? null;
    }

    /** @type {import ('./VehicleSchedule')} */
    get vehicleSchedule() {
      return this.parent?.parent;
    }

    get startTime() {
      return this[startTimePropName];
    }

    get startTimeAsDuration() {
      return this._getAndSetCachedValue("startTimeAsDuration", () =>
        timeAndDate.hastusExtendedHoursToDuration(this.startTime)
      );
    }

    get endTime() {
      return this[endTimePropName];
    }

    get endTimeAsDuration() {
      return this._getAndSetCachedValue("endTimeAsDuration", () =>
        timeAndDate.hastusExtendedHoursToDuration(this.endTime)
      );
    }

    get startPlaceId() {
      return this[startPlacePropName];
    }

    get endPlaceId() {
      return this[endPlacePropName];
    }

    improveStartPlacePrecision(morePreciseStartPlace) {
      this[startPlacePropName] = morePreciseStartPlace.plcIdentifier;
    }

    improveEndPlacePrecision(morePreciseEndPlace) {
      this[endPlacePropName] = morePreciseEndPlace.plcIdentifier;
    }

    shiftTimes(shiftInSeconds) {
      // TODO: override this on Trip to also handle tripPoints
      this[startTimePropName] = timeAndDate.durationToHastusExtendedHoursString(
        this.startTimeAsDuration.plus({ second: shiftInSeconds })
      );
      this[endTimePropName] = timeAndDate.durationToHastusExtendedHoursString(
        this.endTimeAsDuration.plus({ second: shiftInSeconds })
      );
      this._nullifyCachedValue("startTimeAsDuration");
      this._nullifyCachedValue("endTimeAsDuration");
    }
  };
}

export default BlockActivityItemMixin;
