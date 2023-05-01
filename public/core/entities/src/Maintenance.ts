const childClasses = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { BlockActivityItem, BlockActivityItemProps } from "./BlockActivityItem";

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

export class Maintenance extends BlockActivityItem(Item, {
  blkActIdPropName: "blkactMaintenanceNo",
  itemIdPropName: "mtnInternalNumber",
  placePropName: "mtnPlace",
  startTimePropName: "mtnStartTime",
  endTimePropName: "mtnEndTime",
}) {
  bimoId?: string;
  _mtnInternalNumber?: string;
  _mtnInternalNumber?: string;
  mtnStartTime?: string;
  mtnEndTime?: string;
  mtnPlace: string;
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

  get blkactVehicleActivityTypeNo() {
    return activityTypeNoByMaintenanceVehicleActivityId[this.mtnVehicleActivityId];
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
}

Maintenance.hastusKeywords = ["maintenance"];
Maintenance.hastusObject = "maintenance";

Maintenance.allChildClasses = getAllChildClasses(childClasses);

export default Maintenance;

const activityTypeNoByMaintenanceVehicleActivityId = {
  PC: "10000",
  EJ: "10001",
};
