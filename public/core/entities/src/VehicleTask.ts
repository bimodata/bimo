/**
 * This class is not serializable. It is meant to be computed from an existing vehicle schedule.
 */

import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { BlocksCollection } from "./BlocksCollection";
import { VehicleUnit } from "./VehicleUnit";
import { VehicleSchedule } from "./VehicleSchedule";

export interface VehicleTaskProps extends ExtendedItemProps {
  vehicleUnit: VehicleUnit;
  blocksThatStartWithThisVehu: BlocksCollection;
  id?: string;
  label?: string;
}

export class VehicleTask extends Item<VehicleTask> {
  vehicleUnit: VehicleUnit;
  blocksThatStartWithThisVehu: BlocksCollection;
  id?: string;
  label?: string;
  constructor(props: VehicleTaskProps) {
    super(props);
    this.vehicleUnit = props.vehicleUnit;
    this.vehicleUnit.vehicleTask = this;
    this.blocksThatStartWithThisVehu = props.blocksThatStartWithThisVehu;
    this.id = this.vehicleUnit.vehuInternalNumber;
    this.label = this.vehicleUnit.vehuIdentifierUser;
  }

  get vehicleSchedule() {
    return this.parent && (this.parent.parent as VehicleSchedule);
  }

  get shortLoggingOutput() {
    return `(${this.id})-"${this.label}"-[${this.blocks?.count()}]`;
  }

  get longLoggingOutput() {
    return `${this.shortLoggingOutput}\n${this.blockActivities
      .map((ba) => ba.shortLoggingOutput)
      .join("\n")}`;
  }

  get businessLoggingOutput() {
    return `${this.label} (${this.vehicleUnit.vehuVehicleType})\n${this.blockActivities
      .map((ba) => ba.shortLoggingOutput)
      .join("\n")}`;
  }

  /** @type {import ('./BlocksCollection')} */
  get blocks() {
    return (
      this.vehicleSchedule &&
      this.vehicleSchedule.blocksAndActsAndSectionsByVta.get(this).blocks
    );
  }

  /** @type {import ('./BlockActivitiesCollection')} */
  get blockActivities() {
    return this.vehicleSchedule.blocksAndActsAndSectionsByVta.get(this).blockActivities;
  }

  /** @type {import ('./BlockSectionsCollection')} */
  get blockSections() {
    return this.vehicleSchedule.blocksAndActsAndSectionsByVta.get(this).blockSections;
  }
}

export default VehicleTask;
