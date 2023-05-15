/**
 * This class is not serializable. It is meant to be computed from an existing vehicle schedule.
 */
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { BlocksCollection } from "./BlocksCollection";
import { VehicleUnit } from "./VehicleUnit";
import { VehicleSchedule } from "./VehicleSchedule";
import { BlockSectionsCollection } from "./BlockSectionsCollection";
import { BlockActivitiesCollection } from "./BlockActivitiesCollection";

export interface VehicleTaskProps extends ExtendedItemProps {
  vehicleUnit: VehicleUnit;
  blocksThatStartWithThisVehu: BlocksCollection;
  id?: string;
  label?: string;
}
export declare class VehicleTask extends Item<VehicleTask> {
  vehicleUnit: VehicleUnit;
  blocksThatStartWithThisVehu: BlocksCollection;
  id?: string;
  constructor(props: VehicleTaskProps);
  get vehicleSchedule(): VehicleSchedule | undefined;
  get shortLoggingOutput(): string;
  get longLoggingOutput(): string;
  get businessLoggingOutput(): string;
  get blocks(): BlocksCollection | undefined;
  get blockActivities(): BlockActivitiesCollection | undefined;
  get blockSections(): BlockSectionsCollection | undefined;
}
export default VehicleTask;
