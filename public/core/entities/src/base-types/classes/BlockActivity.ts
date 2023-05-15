import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { Block } from "./Block";
import { Trip } from "./Trip";
import { StringByLanguageCode } from "@bimo/core-global-types";
import { BlockActivitiesCollection } from "./BlockActivitiesCollection";
import { Place } from "./Place";
export interface BlockActivityProps extends ExtendedItemProps {
  blkactVehicleActivityTypeNo: string;
  blkactTripNo?: string;
  blkactHasFixedLink?: string;
  blkactCchgNo?: string;
  blkactVehicleStandbyNo?: string;
  blkactMaintenanceNo?: string;
  bimoId?: string;
  activityNameByLanguageCode?: StringByLanguageCode;
}
export type BlockActivityEntityClassKey =
  | "Trip"
  | "ConsistChange"
  | "VehicleStandby"
  | "Maintenance";
export declare class BlockActivity extends Item<BlockActivity> {
  blkactVehicleActivityTypeNo: string;
  blkactTripNo: string;
  blkactHasFixedLink?: string;
  blkactCchgNo: string;
  blkactVehicleStandbyNo: string;
  blkactMaintenanceNo: string;
  bimoId?: string;
  activityEntityClassKey: BlockActivityEntityClassKey;
  activityNameByLanguageCode: StringByLanguageCode;
  parent?: BlockActivitiesCollection;
  constructor(props: BlockActivityProps);
  get block(): Block | undefined;
  get vehicleTasks(): import("./VehicleTask").VehicleTask[] | undefined;
  get blockSections(): import("./BlockSection").BlockSection[] | undefined;
  setNewTrip(newTrip: Trip): void;
  get vehicleSchedule(): import("./VehicleSchedule").VehicleSchedule | undefined;
  get activityEntityItem():
    | import("./BlockActivityItem").BlockActivityItem<
        import("./BlockActivityItem").BaseBlockActivityItem
      >
    | undefined;
  set activityEntityItem(
    v:
      | import("./BlockActivityItem").BlockActivityItem<
          import("./BlockActivityItem").BaseBlockActivityItem
        >
      | undefined
  );
  get startTime(): string | undefined;
  get startTimeAsDuration(): import("luxon").Duration | undefined;
  get endTime(): string | undefined;
  get endTimeAsDuration(): import("luxon").Duration | undefined;
  get startPlaceId(): string | undefined;
  get endPlaceId(): string | undefined;
  get shortLoggingOutput(): string;
  get mediumLoggingOutput(): string;
  get longLoggingOutput(): string;
  improveEndPlacePrecision(morePreciseEndPlace: Place): void;
  improveStartPlacePrecision(morePreciseStartPlace: Place): void;
  shiftTimes(shiftInSeconds: number): void;
  get _indexInSortedParent(): number;
  getNthActivityFromThisOne(n: number): BlockActivity | undefined;
  get nextBlockActivity(): BlockActivity | undefined;
  get previousBlockActivity(): BlockActivity | undefined;
}
