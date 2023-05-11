import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BlockActivity, BlockActivityProps } from "./BlockActivity";
import { BlockActivityItem, BaseBlockActivityItem } from "./BlockActivityItem";
import Maintenance from "./Maintenance";
import Trip from "./Trip";
export interface BlockActivitiesCollectionProps extends ExtendedCollectionProps<BlockActivity, BlockActivityProps> {
}
export declare class BlockActivitiesCollection extends Collection<BlockActivity, BlockActivityProps> {
    constructor(props?: BlockActivitiesCollectionProps);
    sortByTime(): void;
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
    addActivity(activity: BlockActivityItem<BaseBlockActivityItem>): BlockActivity;
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
    removeActivity(activity: BlockActivityItem<BaseBlockActivityItem>): null;
    addTrip(trip: Trip): BlockActivity;
    removeTrip(trip: Trip): null;
    addMaintenance(maintenance: Maintenance): BlockActivity;
    removeMaintenance(maintenance: Maintenance): null;
}
export default BlockActivitiesCollection;
