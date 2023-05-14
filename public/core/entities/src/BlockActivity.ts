import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { BlockActivity as BimoBlockActivity } from "../base-types/rawIndex";
export { BlockActivity as BimoBlockActivity } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { StringByLanguageCode } from "@bimo/core-global-types";

import { BimoBlock, BlockProps } from "./Block";
import { BimoTrip, TripProps } from "./Trip";
import { BimoBlockActivitiesCollection, BlockActivitiesCollectionProps } from "./BlockActivitiesCollection";
import { BimoConsistChange, ConsistChangeProps } from "./ConsistChange";
import { BimoPlace, PlaceProps } from "./Place";
export function BlockActivityClassFactory({
  Block,
  Trip,
  BlockActivitiesCollection,
  ConsistChange,
  Place,
}: EntityConstructorByEntityClassKey): typeof BimoBlockActivity{
  
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
  
 class BlockActivity extends Item<BlockActivity> {
    blkactVehicleActivityTypeNo: string;
    blkactTripNo: string;
    blkactHasFixedLink?: string;
    blkactCchgNo: string;
    blkactVehicleStandbyNo: string;
    blkactMaintenanceNo: string;
    bimoId?: string;
    activityEntityClassKey: BlockActivityEntityClassKey;
    activityNameByLanguageCode: StringByLanguageCode;
    declare parent?: BlockActivitiesCollection;
    constructor(props: BlockActivityProps) {
      super(props);
      this.blkactVehicleActivityTypeNo = gavpfp("blkactVehicleActivityTypeNo", props);
      this.blkactTripNo = gavpfp("blkactTripNo", props);
      this.blkactHasFixedLink = gavpfp("blkactHasFixedLink", props, "string", "0");
      this.blkactCchgNo = gavpfp("blkactCchgNo", props);
      this.blkactVehicleStandbyNo = gavpfp("blkactVehicleStandbyNo", props);
      this.blkactMaintenanceNo = gavpfp("blkactMaintenanceNo", props);
      /** Doesn't exist in hastus but we create it for consistency */ this.bimoId = gavpfp(
        "bimoId",
        props
      );
  
      if (this.blkactTripNo) {
        this.activityEntityClassKey = `Trip`;
        this.activityNameByLanguageCode = { fr: "Voyage" };
      } else if (this.blkactCchgNo) {
        this.activityEntityClassKey = `ConsistChange`;
        this.activityNameByLanguageCode = { fr: "Changement de composition" };
      } else if (this.blkactVehicleStandbyNo) {
        this.activityEntityClassKey = `VehicleStandby`;
        this.activityNameByLanguageCode = { fr: "Réserve" };
      } else if (this.blkactMaintenanceNo) {
        this.activityEntityClassKey = `Maintenance`;
        this.activityNameByLanguageCode = { fr: "Maintenance" };
      } else {
        throw new Error(`Unknown block activity`);
      }
    }
  
    get block() {
      return this.parent && (this.parent.parent as Block);
    }
  
    get vehicleTasks() {
      const setOfVtas =
        this.vehicleSchedule && this.vehicleSchedule.setOfVtasByBlockActivity.get(this);
      return setOfVtas && Array.from(setOfVtas);
    }
  
    get blockSections() {
      const setOfBlockSections =
        this.vehicleSchedule &&
        this.vehicleSchedule.setOfBlockSectionsByBlockActivity.get(this);
      return setOfBlockSections && Array.from(setOfBlockSections);
    }
  
    setNewTrip(newTrip: Trip) {
      if (this.activityEntityClassKey === "Trip") {
        this.blkactTripNo = newTrip.trpIntNumber;
        if (this.vehicleSchedule) {
          this.vehicleSchedule.activityEntityItemByBlockActivity.set(this, newTrip);
        }
      }
      if (this.activityEntityClassKey === "ConsistChange") {
        (this.activityEntityItem as ConsistChange).setNewTrip(newTrip);
      }
    }
  
    get vehicleSchedule() {
      return this.block && this.block.vehicleSchedule;
    }
  
    get activityEntityItem() {
      return (
        this.vehicleSchedule &&
        this.vehicleSchedule.activityEntityItemByBlockActivity.get(this)
      );
    }
  
    // eslint-disable-next-line class-methods-use-this
    set activityEntityItem(v) {
      throw new Error(`Should not set ActivityEntityItem`);
    }
  
    get startTime() {
      return this.activityEntityItem?.startTime;
    }
  
    get startTimeAsDuration() {
      return this.activityEntityItem?.startTimeAsDuration;
    }
  
    get endTime() {
      return this.activityEntityItem?.endTime;
    }
  
    get endTimeAsDuration() {
      return this.activityEntityItem?.endTimeAsDuration;
    }
  
    get startPlaceId() {
      return this.activityEntityItem?.startPlaceId;
    }
  
    get endPlaceId() {
      return this.activityEntityItem?.endPlaceId;
    }
  
    get shortLoggingOutput() {
      try {
        return `${this.activityNameByLanguageCode && this.activityNameByLanguageCode.fr} (${
          this.blkactVehicleActivityTypeNo
        }) - ${this.activityEntityItem && this.activityEntityItem.shortLoggingOutput}`;
      } catch (error) {
        return `${this.activityNameByLanguageCode && this.activityNameByLanguageCode.fr} (${
          this.blkactVehicleActivityTypeNo
        }) // ${this.blkactTripNo} // ${this.bimoId}`;
      }
    }
  
    get mediumLoggingOutput() {
      return `${this.slo} (block: ${this.block?.slo})`;
    }
  
    get longLoggingOutput() {
      return `${this.mlo} (vtas: ${this.vehicleTasks?.map((vta) => vta.slo).join(" / ")})`;
    }
  
    improveEndPlacePrecision(morePreciseEndPlace: Place) {
      this.activityEntityItem?.improveEndPlacePrecision(morePreciseEndPlace);
    }
  
    improveStartPlacePrecision(morePreciseStartPlace: Place) {
      this.activityEntityItem?.improveStartPlacePrecision(morePreciseStartPlace);
    }
  
    shiftTimes(shiftInSeconds: number) {
      this.activityEntityItem?.shiftTimes(shiftInSeconds);
    }
  
    get _indexInSortedParent() {
      if (!this.parent) return null;
      this.parent.sortByTime();
      return this.parent.indexOf(this);
    }
  
    getNthActivityFromThisOne(n: number) {
      return this.parent && this.parent.items[this._indexInSortedParent + n];
    }
  
    get nextBlockActivity() {
      return this.getNthActivityFromThisOne(1);
    }
  
    get previousBlockActivity() {
      return this.getNthActivityFromThisOne(-1);
    }
  }
  
  BlockActivity.hastusKeywords = ["block_activity"];
  BlockActivity.hastusObject = "block_activity";
  
  BlockActivity.allChildClasses = getAllChildClasses(childClasses);
  
  return BlockActivity
}

export default BlockActivityClassFactory