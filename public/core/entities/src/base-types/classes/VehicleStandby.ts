import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { BlockActivityItem } from "./BlockActivityItem";
import BlockActivity from "./BlockActivity";
import Place from "./Place";
import { VehicleStandbysCollection } from "./VehicleStandbysCollection";
export interface VehicleStandbyProps extends ExtendedItemProps {
  bimoId?: string;
  sdbyStandbyNo?: string;
  sdbyStartTime?: string;
  sdbyEndTime?: string;
  sdbyPlace?: string;
  sdbyOperateSun?: string;
  sdbyOperateMon?: string;
  sdbyOperateTue?: string;
  sdbyOperateWed?: string;
  sdbyOperateThu?: string;
  sdbyOperateFri?: string;
  sdbyOperateSat?: string;
  sdbyEvent?: string;
  sdbyEventStatus?: string;
  sdbyComment?: string;
  sdbyCouvertureAdcNecessaire?: string;
}
export declare class VehicleStandby
  extends Item<VehicleStandby>
  implements BlockActivityItem<VehicleStandby>
{
  bimoId?: string;
  _sdbyStandbyNo?: string;
  sdbyStartTime: string;
  sdbyEndTime: string;
  sdbyPlace: string;
  sdbyOperateSun?: string;
  sdbyOperateMon?: string;
  sdbyOperateTue?: string;
  sdbyOperateWed?: string;
  sdbyOperateThu?: string;
  sdbyOperateFri?: string;
  sdbyOperateSat?: string;
  sdbyEvent?: string;
  sdbyEventStatus?: string;
  sdbyComment?: string;
  sdbyCouvertureAdcNecessaire?: string;
  parent?: VehicleStandbysCollection;
  static itemIdPropName: string;
  static blkActIdPropName: string;
  constructor(props: VehicleStandbyProps);
  get sdbyStandbyNo(): string;
  set sdbyStandbyNo(v: string);
  get blkactVehicleActivityTypeNo(): string;
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
export default VehicleStandby;
