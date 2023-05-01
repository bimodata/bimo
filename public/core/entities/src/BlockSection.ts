/**
 * This class is not serializable. It is meant to be computed from an existing vehicle schedule.
 * A block section is a section of a block that is operated by a specific vehicle unit
 */

import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import {
  BlockActivitiesCollection,
  BlockActivitiesCollectionProps,
} from "./BlockActivitiesCollection";
import { BlockActivityProps } from "./BlockActivity";
import BlockSectionsCollection from "./BlockSectionsCollection";
import { VehicleTask } from "./VehicleTask";
import { Block } from "./Block";

export interface BlockSectionProps extends ExtendedItemProps {
  id?: string;
  block: Block;
  blockActivities: BlockActivityProps[];
}

export class BlockSection extends Item<BlockSection> {
  id?: string;
  block: Block;
  blockActivities: BlockActivitiesCollection;
  declare parent?: BlockSectionsCollection;
  constructor(props: BlockSectionProps) {
    super(props);

    this.id = props.id;
    this.label = props.label;

    this.block = props.block;

    this.blockActivities = new BlockActivitiesCollection({
      associationType: "aggregation",
      items: props.blockActivities,
    });
  }

  get vehicleTask() {
    return this.parent && (this.parent.parent as VehicleTask);
  }

  get vehicleSchedule() {
    return this.vehicleTask && this.vehicleTask.vehicleSchedule;
  }

  get firstBlockActivity() {
    return this.blockActivities.first;
  }

  get lastBlockActivity() {
    return this.blockActivities.last;
  }

  get _indexInSortedParent() {
    if (!this.parent) throw new Error(`No parent !`);
    this.parent.sortByTime();
    return this.parent.indexOf(this);
  }

  getNthBlockSectionFromThisOne(n: number) {
    return this.parent && this.parent.items[this._indexInSortedParent + n];
  }

  get nextBlockSection() {
    return this.getNthBlockSectionFromThisOne(1);
  }

  get previousBlockSection() {
    return this.getNthBlockSectionFromThisOne(-1);
  }

  get mediumLoggingOutput() {
    return `${this.block?.slo} (${this.vehicleTask?.slo})`;
  }
}

export default BlockSection;
