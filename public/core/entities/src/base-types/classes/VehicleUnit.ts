import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { Entity } from "@bimo/core-utils-entity";
import { VehicleTask } from "./VehicleTask";
import { VehicleSchedule } from "./VehicleSchedule";
export interface VehicleUnitProps extends ExtendedItemProps {
  vehuInternalNumber: string;
  vehuIdentifierUser?: string;
  vehuVehicleGroup?: string;
  vehuVehicleType?: string;
  vehuCodeRoulement?: string;
  vehicleTask?: VehicleTask;
}
export declare class VehicleUnit extends Item<VehicleUnit> {
  vehuInternalNumber: string;
  vehuIdentifierUser?: string;
  vehuVehicleGroup?: string;
  vehuVehicleType?: string;
  vehuCodeRoulement?: string;
  vehicleTask?: VehicleTask;
  constructor(props: VehicleUnitProps);
  get shortLoggingOutput(): string;
  get vehicleSchedule(): VehicleSchedule | undefined;
}
