import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ConsistChange as BimoConsistChange } from "../base-types/rawIndex";
export { ConsistChange as BimoConsistChange } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import {
  hastusExtendedHoursToDuration,
  durationToHastusExtendedHoursString,
} from "@bimo/core-utils-time-and-date";

import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import {
  BlockActivityItem,
  computeSetOfBlockActivitiesHelper,
  getSingleBlockActivityHelper,
} from "./BlockActivityItem";
import { BimoBlockActivity, BlockActivityProps } from "./BlockActivity";
import { BimoPlace, PlaceProps } from "./Place";
import { BimoConsistChangesCollection, ConsistChangesCollectionProps } from "./ConsistChangesCollection";
import { BimoTrip, TripProps } from "./Trip";
export function ConsistChangeClassFactory({
  BlockActivity,
  Place,
  ConsistChangesCollection,
  Trip,
}: EntityConstructorByEntityClassKey): typeof BimoConsistChange{
  
  export interface ConsistChangeProps extends ExtendedItemProps {
    cchgActivity?: string;
    _cchgInternalNumber?: string;
    _cchgBuildTime?: string;
    cchgEvent?: string;
    cchgEventStatus?: string;
    cchgPlaceStart?: string;
    _cchgTimeStart?: string;
    cchgDuration?: string;
    cchgOnTripNo?: string;
    cchgOrigOnTripNo?: string;
    cchgUnitCount?: string;
    cchgOnTrip?: string;
    cchgIsRequired?: string;
    cchgRelatedBlock?: string;
    cchgRelatedBlockIntNo?: string;
    cchgOntrpBlock?: string;
    cchgOntrpBlockIntNo?: string;
    cchgComment?: string;
    cchgPosition?: string;
    cchgTimeSpecified?: string;
    cchgOperatesSun?: string;
    cchgOperatesMon?: string;
    cchgOperatesTue?: string;
    cchgOperatesWed?: string;
    cchgOperatesThu?: string;
    cchgOperatesFri?: string;
    cchgOperatesSat?: string;
    cchgFromNote?: string;
    cchgToNote?: string;
  }
  
 class ConsistChange
    extends Item<ConsistChange>
    implements BlockActivityItem<ConsistChange>
  {
    cchgActivity?: string;
    _cchgInternalNumber?: string;
    _cchgBuildTime?: string;
    cchgEvent?: string;
    cchgEventStatus?: string;
    cchgPlaceStart: string;
    _cchgTimeStart?: string;
    cchgDuration?: string;
    cchgOnTripNo?: string;
    cchgOrigOnTripNo?: string;
    cchgUnitCount?: string;
    cchgOnTrip?: string;
    cchgIsRequired?: string;
    cchgRelatedBlock?: string;
    cchgRelatedBlockIntNo?: string;
    cchgOntrpBlock?: string;
    cchgOntrpBlockIntNo?: string;
    cchgComment?: string;
    cchgPosition?: string;
    cchgTimeSpecified?: string;
    cchgOperatesSun?: string;
    cchgOperatesMon?: string;
    cchgOperatesTue?: string;
    cchgOperatesWed?: string;
    cchgOperatesThu?: string;
    cchgOperatesFri?: string;
    cchgOperatesSat?: string;
    cchgFromNote?: string;
    cchgToNote?: string;
    declare parent?: ConsistChangesCollection;
    static blkActIdPropName = "blkactCchgNo";
    static itemIdPropName = "cchgInternalNumber";
    constructor(props: ConsistChangeProps) {
      super(props);
      this.cchgActivity = gavpfp("cchgActivity", props);
      this._cchgInternalNumber = gavpfp("cchgInternalNumber", props);
      this._cchgBuildTime = gavpfp("cchgBuildTime", props);
      this.cchgEvent = gavpfp("cchgEvent", props);
      this.cchgEventStatus = gavpfp("cchgEventStatus", props);
      this.cchgPlaceStart = gavpfp("cchgPlaceStart", props);
      this._cchgTimeStart = gavpfp("cchgTimeStart", props);
      this.cchgDuration = gavpfp("cchgDuration", props);
      this.cchgOnTripNo = gavpfp("cchgOnTripNo", props);
      this.cchgOrigOnTripNo = gavpfp("cchgOrigOnTripNo", props);
      this.cchgUnitCount = gavpfp("cchgUnitCount", props);
      this.cchgOnTrip = gavpfp("cchgOnTrip", props);
      this.cchgIsRequired = gavpfp("cchgIsRequired", props, "string", "0");
  
      /** @type {string} - WARNING: this is the blkNumber, not the blkIntNumber */
      this.cchgRelatedBlock = gavpfp("cchgRelatedBlock", props);
      /** @type {string} - This is currently not exported in default OIG but we add it because it makes senses */
      this.cchgRelatedBlockIntNo = gavpfp("cchgRelatedBlockIntNo", props);
  
      /** @type {string} - WARNING: this is the blkNumber, not the blkIntNumber */
      this.cchgOntrpBlock = gavpfp("cchgOntrpBlock", props);
      /** @type {string} - This is currently not exported in default OIG but we add it because it makes senses */
      this.cchgOntrpBlockIntNo = gavpfp("cchgOntrpBlockIntNo", props);
  
      this.cchgComment = gavpfp("cchgComment", props);
      this.cchgPosition = gavpfp("cchgPosition", props, "string", "0");
      this.cchgTimeSpecified = gavpfp("cchgTimeSpecified", props);
      this.cchgOperatesSun = gavpfp("cchgOperatesSun", props, "string", "1");
      this.cchgOperatesMon = gavpfp("cchgOperatesMon", props, "string", "0");
      this.cchgOperatesTue = gavpfp("cchgOperatesTue", props, "string", "0");
      this.cchgOperatesWed = gavpfp("cchgOperatesWed", props, "string", "0");
      this.cchgOperatesThu = gavpfp("cchgOperatesThu", props, "string", "0");
      this.cchgOperatesFri = gavpfp("cchgOperatesFri", props, "string", "0");
      this.cchgOperatesSat = gavpfp("cchgOperatesSat", props, "string", "0");
      this.cchgFromNote = gavpfp("cchgFromNote", props);
      this.cchgToNote = gavpfp("cchgToNote", props);
    }
  
    setNewTrip(newTrip: Trip) {
      if (!newTrip.trpIntNumber)
        throw new Error(`${newTrip.mlo} should have a trpIntNumber`);
      this.cchgOnTripNo = newTrip.trpIntNumber;
    }
  
    get cchgInternalNumber() {
      return this._cchgInternalNumber;
    }
  
    set cchgInternalNumber(v) {
      if (this.parent && this.parent.invalidateItemByBusinessId) {
        this.parent.invalidateItemByBusinessId();
      }
      this._cchgInternalNumber = v;
    }
  
    get cchgBuildTime() {
      return this._cchgBuildTime || this._cchgTimeStart;
    }
  
    set cchgBuildTime(v) {
      this._cchgBuildTime = v;
    }
  
    get cchgTimeStart() {
      if (!this._cchgTimeStart && !this._cchgBuildTime) {
        throw new Error(`cchgTimeStart or cchgBuildTime must be provided`);
      }
      return (this._cchgTimeStart || this._cchgBuildTime) as string;
    }
  
    set cchgTimeStart(v) {
      this._cchgTimeStart = v;
    }
  
    get shortLoggingOutput() {
      return `${this.cchgActivity}-${this.cchgPlaceStart}-${this.cchgTimeStart}-${this.cchgOnTripNo}`;
    }
  
    get blkactVehicleActivityTypeNo() {
      // throw new Error(
      //   `A single blkactVehicleActivityTypeNo cannot be computed on consist changes`
      // );
      return "";
    }
  
    private get setOfBlockActivities() {
      return computeSetOfBlockActivitiesHelper<ConsistChange>(this);
    }
  
    get blockActivities(): BlockActivity[] {
      const setOfBlockActivities = this.setOfBlockActivities;
      return setOfBlockActivities && Array.from(setOfBlockActivities);
    }
  
    addBlockActivity(newBlockActivity: BlockActivity) {
      this.setOfBlockActivities.add(newBlockActivity);
    }
  
    removeBlockActivity(blockActivity: BlockActivity) {
      this.setOfBlockActivities.delete(blockActivity);
    }
  
    get blockActivity(): BlockActivity {
      return getSingleBlockActivityHelper<ConsistChange>(this);
    }
  
    get block() {
      return this.blockActivity?.block ?? null;
    }
  
    get vehicleTasks() {
      return this.blockActivity?.vehicleTasks ?? null;
    }
  
    get vehicleSchedule() {
      return this.parent?.parent ?? null;
    }
  
    get startTime() {
      return this.cchgTimeStart;
    }
  
    get startTimeAsDuration() {
      return this._getAndSetCachedValue("startTimeAsDuration", () =>
        hastusExtendedHoursToDuration(this.startTime)
      );
    }
  
    // TODO: improve this
    get endTime() {
      return this.cchgTimeStart;
    }
  
    get endTimeAsDuration() {
      return this._getAndSetCachedValue("endTimeAsDuration", () =>
        hastusExtendedHoursToDuration(this.endTime)
      );
    }
  
    get startPlaceId() {
      return this.cchgPlaceStart;
    }
  
    get endPlaceId() {
      return this.cchgPlaceStart;
    }
  
    improveStartPlacePrecision(morePreciseStartPlace: Place) {
      this.cchgPlaceStart = morePreciseStartPlace.plcIdentifier;
    }
  
    improveEndPlacePrecision(morePreciseEndPlace: Place) {
      this.cchgPlaceStart = morePreciseEndPlace.plcIdentifier;
    }
  
    shiftTimes(shiftInSeconds: number) {
      this.cchgTimeStart = durationToHastusExtendedHoursString(
        this.startTimeAsDuration.plus({ second: shiftInSeconds })
      );
      this.cchgTimeStart = durationToHastusExtendedHoursString(
        this.endTimeAsDuration.plus({ second: shiftInSeconds })
      );
      this._nullifyCachedValue("startTimeAsDuration");
      this._nullifyCachedValue("endTimeAsDuration");
    }
  }
  
  ConsistChange.hastusKeywords = ["consist_change"];
  ConsistChange.hastusObject = "consist_change";
  ConsistChange.allChildClasses = getAllChildClasses(childClasses);
  
  return ConsistChange
}

export default ConsistChangeClassFactory