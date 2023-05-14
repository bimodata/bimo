import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { BlockActivitiesCollection as BimoBlockActivitiesCollection } from "../base-types/rawIndex";
export { BlockActivitiesCollection as BimoBlockActivitiesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoBlockActivity, BlockActivityProps } from "./BlockActivity";
import { BimoMaintenance, MaintenanceProps } from "./Maintenance";
import { BimoTrip, TripProps } from "./Trip";
import { BimoBlockActivityItem, BlockActivityItemProps } from "./BlockActivityItem";
export function BlockActivitiesCollectionClassFactory({
  BlockActivity,
  Maintenance,
  Trip,
  BlockActivityItem,
}: EntityConstructorByEntityClassKey): typeof BimoBlockActivitiesCollection{
  
  const childClasses: (typeof Entity)[] = [BlockActivity];
  
  export interface BlockActivitiesCollectionProps
  extends ExtendedCollectionProps<BimoBlockActivity, BlockActivityProps> {}
  
 class BlockActivitiesCollection extends Collection<
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
        this.items.sort((blkActA, blkActB) => {
          const timeA = blkActA.startTimeAsDuration;
          const timeB = blkActB.startTimeAsDuration;
          if (!timeA || !timeB) throw new Error(`Missing start time on an activity`);
          return timeA.as("second") - timeB.as("second");
        });
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
    removeActivity(activity: BlockActivityItem<BaseBlockActivityItem>): null {
      // if (activity.removeFromBlockActivitiesCollectionFn)
      //   return activity.removeFromBlockActivitiesCollectionFn(this);
      this.remove(activity.blockActivity);
      activity.removeBlockActivity(activity.blockActivity);
      return null;
    }
  
    addTrip(trip: Trip) {
      return this.addActivity(trip);
    }
  
    removeTrip(trip: Trip) {
      return this.removeActivity(trip);
    }
  
    addMaintenance(maintenance: Maintenance) {
      return this.addActivity(maintenance);
    }
  
    removeMaintenance(maintenance: Maintenance) {
      return this.removeActivity(maintenance);
    }
  }
  
  BlockActivitiesCollection.allChildClasses = getAllChildClasses(childClasses);
  
  return BlockActivitiesCollection
}

export default BlockActivitiesCollectionClassFactory