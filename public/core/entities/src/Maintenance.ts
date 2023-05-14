import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { Maintenance as BimoMaintenance } from "../base-types/rawIndex";
export { Maintenance as BimoMaintenance } from "../base-types/rawIndex";
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
import { BimoMaintenancesCollection, MaintenancesCollectionProps } from "./MaintenancesCollection";
export function MaintenanceClassFactory({
  BlockActivity,
  Place,
  MaintenancesCollection,
}: EntityConstructorByEntityClassKey): typeof BimoMaintenance{
  
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
  
 class Maintenance
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
    declare parent?: MaintenancesCollection;
    static itemIdPropName = "mtnInternalNumber";
    static blkActIdPropName = "blkactMaintenanceNo";
  
    constructor(props: MaintenanceProps) {
      super(props);
      this.bimoId = gavpfp("bimoId", props);
      this._mtnInternalNumber = gavpfp("mtnInternalNumber", props);
      if (!this._mtnInternalNumber) this._mtnInternalNumber = this.bimoId;
  
      this.mtnStartTime = gavpfp("mtnStartTime", props);
      this.mtnEndTime = gavpfp("mtnEndTime", props);
      this.mtnPlace = gavpfp("mtnPlace", props);
      this.mtnVehicle = gavpfp("mtnVehicle", props);
      this.mtnVehicleActivityId = gavpfp("mtnVehicleActivityId", props);
      this.mtnOperateSun = gavpfp("mtnOperateSun", props, "string", "1");
      this.mtnOperateMon = gavpfp("mtnOperateMon", props, "string", "0");
      this.mtnOperateTue = gavpfp("mtnOperateTue", props, "string", "0");
      this.mtnOperateWed = gavpfp("mtnOperateWed", props, "string", "0");
      this.mtnOperateThu = gavpfp("mtnOperateThu", props, "string", "0");
      this.mtnOperateFri = gavpfp("mtnOperateFri", props, "string", "0");
      this.mtnOperateSat = gavpfp("mtnOperateSat", props, "string", "0");
      this.mtnEvent = gavpfp("mtnEvent", props);
      this.mtnEventStatus = gavpfp("mtnEventStatus", props);
      this.mtnComment = gavpfp("mtnComment", props);
    }
  
    get mtnInternalNumber() {
      return this._mtnInternalNumber;
    }
  
    set mtnInternalNumber(v) {
      if (this.parent && this.parent.invalidateItemByBusinessId) {
        this.parent.invalidateItemByBusinessId();
      }
      this._mtnInternalNumber = v;
    }
  
    get shortLoggingOutput() {
      return `[${this.mtnVehicleActivityId}]-${this.mtnPlace}-(${this.mtnStartTime}=>${this.mtnEndTime})`;
    }
  
    get blkactVehicleActivityTypeNo() {
      return activityTypeNoByMaintenanceVehicleActivityId[this.mtnVehicleActivityId];
    }
  
    private get setOfBlockActivities() {
      return computeSetOfBlockActivitiesHelper<Maintenance>(this);
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
      return getSingleBlockActivityHelper<Maintenance>(this);
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
      return this.mtnStartTime;
    }
  
    get startTimeAsDuration() {
      return this._getAndSetCachedValue("startTimeAsDuration", () =>
        hastusExtendedHoursToDuration(this.startTime)
      );
    }
  
    get endTime() {
      return this.mtnEndTime;
    }
  
    get endTimeAsDuration() {
      return this._getAndSetCachedValue("endTimeAsDuration", () =>
        hastusExtendedHoursToDuration(this.endTime)
      );
    }
  
    get startPlaceId() {
      return this.mtnPlace;
    }
  
    get endPlaceId() {
      return this.mtnPlace;
    }
  
    improveStartPlacePrecision(morePreciseStartPlace: Place) {
      this.mtnPlace = morePreciseStartPlace.plcIdentifier;
    }
  
    improveEndPlacePrecision(morePreciseEndPlace: Place) {
      this.mtnPlace = morePreciseEndPlace.plcIdentifier;
    }
  
    shiftTimes(shiftInSeconds: number) {
      this.mtnStartTime = durationToHastusExtendedHoursString(
        this.startTimeAsDuration.plus({ second: shiftInSeconds })
      );
      this.mtnEndTime = durationToHastusExtendedHoursString(
        this.endTimeAsDuration.plus({ second: shiftInSeconds })
      );
      this._nullifyCachedValue("startTimeAsDuration");
      this._nullifyCachedValue("endTimeAsDuration");
    }
  }
  
  Maintenance.hastusKeywords = ["maintenance"];
  Maintenance.hastusObject = "maintenance";
  
  Maintenance.allChildClasses = getAllChildClasses(childClasses);
  
  return Maintenance
}

export type ActivityTypeNoByMaintenanceVehicleActivityId = {
  PC: "10000";
  EJ: "10001";
};

const activityTypeNoByMaintenanceVehicleActivityId: ActivityTypeNoByMaintenanceVehicleActivityId =
  {
    PC: "10000",
    EJ: "10001",
  };

export default MaintenanceClassFactory