/**
 * This class is not serializable. It is meant to be computed from an existing vehicle schedule.
 * A block section is a section of a block that is operated by a specific vehicle unit
 */
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { BlockActivitiesCollection } from "./BlockActivitiesCollection";
import { BlockActivityProps } from "./BlockActivity";
import BlockSectionsCollection from "./BlockSectionsCollection";
import { VehicleTask } from "./VehicleTask";
import { Block } from "./Block";
export interface BlockSectionProps extends ExtendedItemProps {
  id?: string;
  block: Block;
  blockActivities?: BlockActivityProps[];
}
export declare class BlockSection extends Item<BlockSection> {
  id?: string;
  block: Block;
  blockActivities: BlockActivitiesCollection;
  parent?: BlockSectionsCollection;
  constructor(props: BlockSectionProps);
  get vehicleTask(): VehicleTask | undefined;
  get vehicleSchedule(): import("./VehicleSchedule").VehicleSchedule | undefined;
  get firstBlockActivity(): import("./BlockActivity").BlockActivity;
  get lastBlockActivity(): import("./BlockActivity").BlockActivity;
  get _indexInSortedParent(): number;
  getNthBlockSectionFromThisOne(n: number): BlockSection | undefined;
  get nextBlockSection(): BlockSection | undefined;
  get previousBlockSection(): BlockSection | undefined;
  get mediumLoggingOutput(): string;
}
export default BlockSection;
