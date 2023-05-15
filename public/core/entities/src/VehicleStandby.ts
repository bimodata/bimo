import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { VehicleStandby as BimoVehicleStandby } from "../base-types/rawIndex";
export { VehicleStandby as BimoVehicleStandby } from "../base-types/rawIndex";
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
import {
  BimoVehicleStandbysCollection,
  VehicleStandbysCollectionProps,
} from "./VehicleStandbysCollection";

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

export function VehicleStandbyClassFactory({
  BlockActivity,
  Place,
  VehicleStandbysCollection,
}: EntityConstructorByEntityClassKey): typeof BimoVehicleStandby {
  class VehicleStandby
    extends Item<VehicleStandby>
    implements BlockActivityItem<VehicleStandby>
  {
    bimoId?: string;
    _sdbyStandbyNo: string;
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
    declare parent?: BimoVehicleStandbysCollection;
    static itemIdPropName = "sdbyStandbyNo";
    static blkActIdPropName = "blkactVehicleStandbyNo";
    constructor(props: VehicleStandbyProps) {
      super(props);
      this.bimoId = gavpfp("bimoId", props);
      this._sdbyStandbyNo = gavpfp("sdbyStandbyNo", props);
      if (!this._sdbyStandbyNo) this._sdbyStandbyNo = this.bimoId as string;

      this.sdbyStartTime = gavpfp("sdbyStartTime", props);
      this.sdbyEndTime = gavpfp("sdbyEndTime", props);
      this.sdbyPlace = gavpfp("sdbyPlace", props);
      this.sdbyOperateSun = gavpfp("sdbyOperateSun", props);
      this.sdbyOperateMon = gavpfp("sdbyOperateMon", props);
      this.sdbyOperateTue = gavpfp("sdbyOperateTue", props);
      this.sdbyOperateWed = gavpfp("sdbyOperateWed", props);
      this.sdbyOperateThu = gavpfp("sdbyOperateThu", props);
      this.sdbyOperateFri = gavpfp("sdbyOperateFri", props);
      this.sdbyOperateSat = gavpfp("sdbyOperateSat", props);
      this.sdbyEvent = gavpfp("sdbyEvent", props);
      this.sdbyEventStatus = gavpfp("sdbyEventStatus", props);
      this.sdbyComment = gavpfp("sdbyComment", props);
      this.sdbyCouvertureAdcNecessaire = gavpfp("sdbyCouvertureAdcNecessaire", props);
    }

    get sdbyStandbyNo() {
      return this._sdbyStandbyNo;
    }

    set sdbyStandbyNo(v) {
      if (this.parent && this.parent.invalidateItemByBusinessId) {
        this.parent.invalidateItemByBusinessId();
      }
      this._sdbyStandbyNo = v;
    }

    get blkactVehicleActivityTypeNo() {
      return "";
    }

    get setOfBlockActivities() {
      return computeSetOfBlockActivitiesHelper<VehicleStandby>(this);
    }

    get blockActivities(): BimoBlockActivity[] {
      const setOfBlockActivities = this.setOfBlockActivities;
      return setOfBlockActivities && Array.from(setOfBlockActivities);
    }

    addBlockActivity(newBlockActivity: BimoBlockActivity) {
      this.setOfBlockActivities.add(newBlockActivity);
    }

    removeBlockActivity(blockActivity: BimoBlockActivity) {
      this.setOfBlockActivities.delete(blockActivity);
    }

    get blockActivity(): BimoBlockActivity {
      return getSingleBlockActivityHelper<VehicleStandby>(this);
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
      return this.sdbyStartTime;
    }

    get startTimeAsDuration() {
      return this._getAndSetCachedValue("startTimeAsDuration", () =>
        hastusExtendedHoursToDuration(this.startTime)
      );
    }

    get endTime() {
      return this.sdbyEndTime;
    }

    get endTimeAsDuration() {
      return this._getAndSetCachedValue("endTimeAsDuration", () =>
        hastusExtendedHoursToDuration(this.endTime)
      );
    }

    get startPlaceId() {
      return this.sdbyPlace;
    }

    get endPlaceId() {
      return this.sdbyPlace;
    }

    improveStartPlacePrecision(morePreciseStartPlace: BimoPlace) {
      this.sdbyPlace = morePreciseStartPlace.plcIdentifier;
    }

    improveEndPlacePrecision(morePreciseEndPlace: BimoPlace) {
      this.sdbyPlace = morePreciseEndPlace.plcIdentifier;
    }

    shiftTimes(shiftInSeconds: number) {
      this.sdbyStartTime = durationToHastusExtendedHoursString(
        this.startTimeAsDuration.plus({ second: shiftInSeconds })
      );
      this.sdbyEndTime = durationToHastusExtendedHoursString(
        this.endTimeAsDuration.plus({ second: shiftInSeconds })
      );
      this._nullifyCachedValue("startTimeAsDuration");
      this._nullifyCachedValue("endTimeAsDuration");
    }
  }

  VehicleStandby.hastusKeywords = ["vehicle_standby"];
  VehicleStandby.hastusObject = "vehicle_standby";

  VehicleStandby.allChildClasses = getAllChildClasses(childClasses);

  return VehicleStandby;
}

export default VehicleStandbyClassFactory;
