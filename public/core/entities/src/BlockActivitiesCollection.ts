import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BlockActivity, BlockActivityProps } from "./BlockActivity";
import { BlockActivityItem, BaseBlockActivityItem } from "./BlockActivityItem";

const childClasses = [BlockActivity];

export interface BlockActivitiesCollectionProps
  extends ExtendedCollectionProps<BlockActivity, BlockActivityProps> {}

export class BlockActivitiesCollection extends Collection<
  BlockActivity,
  BlockActivityProps
> {
  constructor(props: BlockActivitiesCollectionProps = {}) {
    super({
      itemName: "BlockActivity",
      ItemConstructor: BlockActivity,
      idPropName: `bimoId`,
      labelPropName: `blkactVehicleActivityTypeNo`,
      ...props,
    });
  }

  sortByTime() {
    try {
      this.items.sort(
        (blkActA, blkActB) =>
          blkActA.startTimeAsDuration.as("second") -
          blkActB.startTimeAsDuration.as("second")
      );
    } catch (error) {
      const newError = new Error(
        `Error while sorting these blockActivities:\n${this.longLoggingOutput}\n${error.stack}`
      );
      throw newError;
    }
  }

  /**
   * We first check for a addToBlockActivitiesCollectionFn
   * This allows activities to change the way they should be added to a blocksCollection
   * which is especially useful for:
   *  - Consist changes: they impact two blocks, and sometimes need to add two activities
   *    to the same block
   *  - Trips: they may not want to store a single blockActivity on themselves
   *    as they can often en up in multiple blocks (e.g.: weekday trip of a schedule
   *    that is used in 5 different blocking schedules )
   * @param {Object} activity the item corresponding to the activity to add
   * typically a Trip, Maintenance, VehicleStandBy or ConsistChange
   */
  addActivity(activity: BlockActivityItem<BaseBlockActivityItem>) {
    // if (activity.addToBlockActivitiesCollectionFn)
    //   return activity.addToBlockActivitiesCollectionFn(this);
    const blkAct = this.createNewItem({
      blkactVehicleActivityTypeNo: activity.blkactVehicleActivityTypeNo,
      //@ts-expect-error
      [activity.constructor.blkActIdPropName]:
        //@ts-expect-error
        activity[activity.constructor.itemIdPropName],
    });
    activity.addBlockActivity(blkAct);
    return blkAct;
  }

  /**
   * We first check for a removeFromBlockActivitiesCollectionFn
   * This allows activities to change the way they should be removed from a blocksCollection
   * which is especially useful for:
   *  - Consist changes: they impact two blocks, and sometimes need to add/remove two activities
   *    from the same block
   *  - Trips: they may have multiple blockActivities stored on themselves
   *    as they can often en up in multiple blocks (e.g.: weekday trip of a schedule
   *    that is used in 5 different blocking schedules )
   * @param {Object} activity the item corresponding to the activity to add
   * typically a Trip, Maintenance, VehicleStandBy or ConsistChange
   */
  removeActivity(activity) {
    if (activity.removeFromBlockActivitiesCollectionFn)
      return activity.removeFromBlockActivitiesCollectionFn(this);
    this.remove(activity.blockActivity);
    activity.removeBlockActivity(activity.blockActivity);
    return null;
  }

  /** @param {import('@bimo-hastus/domain-entities/src/Trip')} trip */
  addTrip(trip) {
    return this.addActivity(trip);
  }

  /** @param {import('@bimo-hastus/domain-entities/src/Trip')} trip */
  removeTrip(trip) {
    return this.removeActivity(trip);
  }

  /** @param {import('@bimo-hastus/domain-entities/src/Maintenance')} maintenance */
  addMaintenance(maintenance) {
    return this.addActivity(maintenance);
  }

  /** @param {import('@bimo-hastus/domain-entities/src/Maintenance')} maintenance */
  removeMaintenance(maintenance) {
    return this.removeActivity(maintenance);
  }
}

BlockActivitiesCollection.allChildClasses = getAllChildClasses(childClasses);

export default BlockActivitiesCollection;
