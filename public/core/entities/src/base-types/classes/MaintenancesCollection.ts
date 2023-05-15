import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { Maintenance, MaintenanceProps } from "./Maintenance";
import { VehicleSchedule } from "./VehicleSchedule";
export interface MaintenancesCollectionProps
  extends ExtendedCollectionProps<Maintenance, MaintenanceProps> {}
export declare class MaintenancesCollection extends Collection<
  Maintenance,
  MaintenanceProps
> {
  parent?: VehicleSchedule;
  constructor(props?: MaintenancesCollectionProps);
}
