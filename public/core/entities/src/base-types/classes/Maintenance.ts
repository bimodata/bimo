import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { BlockActivityItem } from "./BlockActivityItem";
import { BlockActivity } from "./BlockActivity";
import { Place } from "./Place";
import { MaintenancesCollection } from "./MaintenancesCollection";
export interface MaintenanceProps extends ExtendedItemProps {
  bimoId?: string;
  mtnInternalNumber?: string;
  mtnStartTime?: string;
  mtnEndTime?: string;
  mtnPlace?: string;
  mtnVehicle?: string;
  mtnVehicleActivityId?: string;
  mtnOperateSun?: string;
  mtnOperateMon?: string;
  mtnOperateTue?: string;
  mtnOperateWed?: string;
  mtnOperateThu?: string;
  mtnOperateFri?: string;
  mtnOperateSat?: string;
  mtnEvent?: string;
  mtnEventStatus?: string;
  mtnComment?: string;
}
export declare class Maintenance
  extends Item<Maintenance>
  implements BlockActivityItem<Maintenance>
{
  bimoId?: string;
  _mtnInternalNumber?: string;
  mtnStartTime: string;
  mtnEndTime: string;
  mtnPlace: string;
  mtnVehicle?: string;
  mtnVehicleActivityId: "PC" | "EJ";
  mtnOperateSun?: string;
  mtnOperateMon?: string;
  mtnOperateTue?: string;
  mtnOperateWed?: string;
  mtnOperateThu?: string;
  mtnOperateFri?: string;
  mtnOperateSat?: string;
  mtnEvent?: string;
  mtnEventStatus?: string;
  mtnComment?: string;
  parent?: MaintenancesCollection;
  static itemIdPropName: string;
  static blkActIdPropName: string;
  constructor(props: MaintenanceProps);
  get mtnInternalNumber(): string | undefined;
  set mtnInternalNumber(v: string | undefined);
  get shortLoggingOutput(): string;
  get blkactVehicleActivityTypeNo(): "10000" | "10001";
  get setOfBlockActivities(): Set<BlockActivity>;
  get blockActivities(): BlockActivity[];
  addBlockActivity(newBlockActivity: BlockActivity): void;
  removeBlockActivity(blockActivity: BlockActivity): void;
  get blockActivity(): BlockActivity;
  get block(): import("./Block").Block | null;
  get vehicleTasks(): import("./VehicleTask").VehicleTask[] | null;
  get vehicleSchedule(): import("./VehicleSchedule").VehicleSchedule | null;
  get startTime(): string;
  get startTimeAsDuration(): any;
  get endTime(): string;
  get endTimeAsDuration(): any;
  get startPlaceId(): string;
  get endPlaceId(): string;
  improveStartPlacePrecision(morePreciseStartPlace: Place): void;
  improveEndPlacePrecision(morePreciseEndPlace: Place): void;
  shiftTimes(shiftInSeconds: number): void;
}
export type ActivityTypeNoByMaintenanceVehicleActivityId = {
  PC: "10000";
  EJ: "10001";
};
