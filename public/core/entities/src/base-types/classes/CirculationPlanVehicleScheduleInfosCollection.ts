import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { CirculationPlanVehicleScheduleInfo, CirculationPlanVehicleScheduleInfoProps } from "./CirculationPlanVehicleScheduleInfo";
export interface CirculationPlanVehicleScheduleInfosCollectionProps
  extends ExtendedCollectionProps<CirculationPlanVehicleScheduleInfo, CirculationPlanVehicleScheduleInfoProps> {}
export declare class CirculationPlanVehicleScheduleInfosCollection extends Collection<
  CirculationPlanVehicleScheduleInfo,
  CirculationPlanVehicleScheduleInfoProps
> {
  constructor(props?: CirculationPlanVehicleScheduleInfosCollectionProps);
}
