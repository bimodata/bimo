/**
 * This class is not serializable. It is meant to be computed from an existing vehicle schedule.
 * A block section is a section of a block that is operated by a specific vehicle unit
 */

import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { BlockActivitiesCollection, BlockActivitiesCollectionProps } from "./BlockActivitiesCollection";


export interface BlockSectionProps extends ExtendedItemProps {
  id?: string;
  label?: string;
  block?: string;
  blockActivities?: string;
}

export class BlockSection extends Item<BlockSection> {
  id?: string;
  label?: string;
  block?: string;
  blockActivities?: string;
  constructor(props: BlockSectionProps) {
    super(props);

    this.id = props.id;
    this.label = props.label;

    /** @type {import ('./Block')} */
    this.block = props.block;

    this.blockActivities = new BlockActivitiesCollection(
      { associationType: 'aggregation', items: props.blockActivities },
    );
  }

  /** @type {import ('./VehicleTask')} */
  get vehicleTask() {
    return this.parent && this.parent.parent;
  }

  /** @type {import ('./VehicleSchedule')} */
  get vehicleSchedule() {
    return this.vehicleTask && this.vehicleTask.vehicleSchedule;
  }

  /** @type {import ('./BlockActivity')} */
  get firstBlockActivity() {
    return this.blockActivities.first;
  }

  /** @type {import ('./BlockActivity')} */
  get lastBlockActivity() {
    return this.blockActivities.last;
  }

  get _indexInSortedParent() {
    if (!this.parent) return null;
    this.parent.sortByTime();
    return this.parent.indexOf(this);
  }

  getNthBlockSectionFromThisOne(n) {
    return this.parent && this.parent.items[this._indexInSortedParent + n];
  }

  /** @type {BlockSection} */
  get nextBlockSection() {
    return this.getNthBlockSectionFromThisOne(1);
  }

  /** @type {BlockSection} */
  get previousBlockSection() {
    return this.getNthBlockSectionFromThisOne(-1);
  }

  get mediumLoggingOutput() {
    return `${this.block?.slo} (${this.vehicleTask?.slo})`;
  }
}

export default BlockSection;
