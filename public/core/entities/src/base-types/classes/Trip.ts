import { ExtendedItemProps } from "@bimo/core-utils-collection";
import { TripTpsCollection } from "./TripTpsCollection";
import { TripPointsCollection } from "./TripPointsCollection";
import { TripPoint, TripPointProps } from "./TripPoint";
import { TripTp } from "./TripTp";
import { TripvehgrpspecsCollection } from "./TripvehgrpspecsCollection";
import { TripOrVariant, TripOrVariantTypeEnum } from "./TripOrVariant";
import { BlockActivityItem } from "./BlockActivityItem";
import { BlockActivity } from "./BlockActivity";
import { BimoContext } from "@bimo/core-global-types";
import { TripsCollection } from "./TripsCollection";
import { VehicleSchedule } from "./VehicleSchedule";
import { Place } from "./Place";
export type TripType = "0" | "3";
export interface TripProps extends ExtendedItemProps {
  bimoId: string | null;
  trpNumber?: string;
  trpIsProtected?: string;
  trpRoute?: string;
  trpViaVariant?: string;
  trpType?: TripType;
  trpDirection?: string;
  trpPlaceStart?: string;
  trpPlaceEnd?: string;
  trpOriginalStartPlace?: string;
  trpOriginalEndPlace?: string;
  trpOriginalBuildSpecPlace?: string;
  trpTimeStart?: string;
  trpTimeEnd?: string;
  trpStartLayUser?: string;
  trpEndLayUser?: string;
  trpInternalDistance: string | null;
  trpDistance: string | null;
  trpCreator?: string;
  trpNote?: string;
  trpSecondNote?: string;
  trpIsPublic?: string;
  trpShftMaxEarlier?: string;
  trpShftMaxLater?: string;
  trpInternalShftMaxEarlier?: string;
  trpInternalShftMaxLater?: string;
  trpIsSpecial?: string;
  trpAvailForTravel?: string;
  trpOperatesSun?: string;
  trpOperatesMon?: string;
  trpOperatesTue?: string;
  trpOperatesWed?: string;
  trpOperatesThu?: string;
  trpOperatesFri?: string;
  trpOperatesSat?: string;
  trpEventForOir?: string;
  trpEventStatusForOir?: string;
  trpGarage?: string;
  trpPattern?: string;
  trpVehicleDisplay?: string;
  trpBuildAt?: string;
  trpBuildSpecPlace?: string;
  trpBuildTime?: string;
  trpBlockingGarage?: string;
  trpRunTimePattern?: string;
  trpOriginalNumber?: string;
  trpIntNumber: string | null;
  trpAreVehGroupSpecsFromVehcv?: string;
  trpAreVehSpecCstrFromVehcv?: string;
  trpRecommendedVehGroup?: string;
  trpConsiderLoadAtStart?: string;
  trpConsiderLoadAtEnd?: string;
  BlockNo?: string;
  tripTps?: TripTpsCollection;
  tripPoints?: TripPointsCollection | TripPointProps[];
  tripvehgrpspecs?: TripvehgrpspecsCollection;
}
export declare class Trip
  extends TripOrVariant<Trip, TripProps, TripPoint, TripPointProps>
  implements BlockActivityItem<Trip>
{
  _bimoId: string | null;
  trpNumber: string;
  trpIsProtected?: string;
  trpRoute?: string;
  trpViaVariant?: string;
  trpType: TripType;
  trpDirection?: string;
  _trpPlaceStart: string;
  _trpPlaceEnd: string;
  _trpOriginalStartPlace?: string;
  _trpOriginalEndPlace?: string;
  trpOriginalBuildSpecPlace?: string;
  trpTimeStart: string;
  trpTimeEnd: string;
  trpStartLayUser?: string;
  trpEndLayUser?: string;
  trpInternalDistance: string | null;
  trpCreator?: string;
  trpNote?: string;
  trpSecondNote?: string;
  _trpIsPublic?: string;
  trpShftMaxEarlier?: string;
  trpShftMaxLater?: string;
  trpInternalShftMaxEarlier?: string;
  trpInternalShftMaxLater?: string;
  trpIsSpecial?: string;
  trpAvailForTravel?: string;
  trpOperatesSun?: string;
  trpOperatesMon?: string;
  trpOperatesTue?: string;
  trpOperatesWed?: string;
  trpOperatesThu?: string;
  trpOperatesFri?: string;
  trpOperatesSat?: string;
  trpEventForOir?: string;
  trpEventStatusForOir?: string;
  trpGarage?: string;
  trpPattern?: string;
  trpVehicleDisplay?: string;
  trpBuildAt?: string;
  trpBuildSpecPlace?: string;
  trpBuildTime?: string;
  trpBlockingGarage?: string;
  trpRunTimePattern?: string;
  trpOriginalNumber?: string;
  _trpIntNumber: string | null;
  trpAreVehGroupSpecsFromVehcv?: string;
  trpAreVehSpecCstrFromVehcv?: string;
  trpRecommendedVehGroup?: string;
  trpConsiderLoadAtStart?: string;
  trpConsiderLoadAtEnd?: string;
  BlockNo?: string;
  tripTps: TripTpsCollection;
  tripPoints: TripPointsCollection;
  tripvehgrpspecs: TripvehgrpspecsCollection;
  parent?: TripsCollection;
  _status: string;
  _links: {
    [linkType: string]: any;
  };
  static itemIdPropName: string;
  static blkActIdPropName: string;
  constructor(
    props: TripProps,
    context?: BimoContext,
    tripOrVariantType?: TripOrVariantTypeEnum
  );
  /** en km */
  get trpDistance(): string | null;
  /** en km */
  set trpDistance(v: string | number | null);
  get trpPlaceStart(): string;
  get trpPlaceEnd(): string;
  set trpPlaceStart(v: string);
  set trpPlaceEnd(v: string);
  get trpOriginalStartPlace(): string;
  get trpOriginalEndPlace(): string;
  set trpOriginalStartPlace(v: string);
  set trpOriginalEndPlace(v: string);
  get trpIntNumber(): string | null;
  get productive(): "0" | "1";
  set trpIntNumber(v: string | null);
  get trpIsPublic(): string;
  set trpIsPublic(v: string);
  get bimoId(): string | null;
  set bimoId(v: string | null);
  /**
     * For trip, we should override this and make it handle more complex cases
     * For example, a trip from a "weekday" schedule
     * could be used in many different blocking schedules: a monday, a tuesday, ...
     * We currently only support:
     *  - cases where some other method explicitly sets the blockActivity on a trip
     *  - cases where the trip and the block are in the same vsc (blocking and scheduling)
    get blockActivity() {}
    set blockActivity(v) {}
     */
  get blkactVehicleActivityTypeNo(): string;
  slice(start: any, end: any): void;
  setStartAndEndAttributesFromPoints(): void;
  removeLoadTimeAtStartAndEnd(): void;
  moveToVehicleSchedule(targetVehicleSchedule: VehicleSchedule): void;
  delete(): void;
  /** Creates a new instance of a trip. All trips points are new instances too. BimoId is set to undefined */
  copy(newInternalNumber?: string): Trip;
  /** key of the form '${trpRoute}|${trpViaVariant}' or null if either is null    */
  get routeAndVariantKey(): string | null;
  get shortLoggingOutput(): string;
  get mediumLoggingOutput(): string;
  get longLoggingOutput(): string;
  get veryLongLoggingOutput(): string;
  /** the first 3 digits of the trip number */
  get trancheNum(): string;
  get firstTripPoint(): TripPoint;
  get lastTripPoint(): TripPoint;
  get firstTripTimingPoint(): TripTp;
  get lastTripTimingPoint(): TripTp;
  get durationInSeconds(): any;
  validateTripPointTimes(): void;
  getTimeDiffInSecondsBetweenTripPointIndexes(
    indexOfFirst: number,
    indexOfSecond: number
  ): any;
  changeCurrentStartPlace(newStartPlace: Place | string): void;
  changeOriginalStartPlace(newStartPlace: Place | string): void;
  changeStartPlace(newStartPlace: Place | string): void;
  changeCurrentEndPlace(newEndPlace: Place | string): void;
  changeOriginalEndPlace(newEndPlace: Place | string): void;
  changeEndPlace(newEndPlace: Place | string): void;
  improveStartPlacePrecision(morePreciseStartPlace: Place | string): void;
  improveEndPlacePrecision(morePreciseEndPlace: Place | string): void;
  get setOfBlockActivities(): Set<BlockActivity>;
  get blockActivities(): BlockActivity[];
  addBlockActivity(newBlockActivity: BlockActivity): void;
  removeBlockActivity(blockActivity: BlockActivity): void;
  get blockActivity(): BlockActivity;
  get block(): import("./Block").Block | null;
  get vehicleTasks(): import("./VehicleTask").VehicleTask[] | null;
  get vehicleSchedule(): VehicleSchedule | null;
  get startTime(): string;
  get startTimeAsDuration(): any;
  get endTime(): string;
  get endTimeAsDuration(): any;
  get startPlaceId(): string;
  get endPlaceId(): string;
  shiftTimes(shiftInSeconds: number): void;
}
