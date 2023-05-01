const childClasses = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { BlockActivityItemMixin, BlockActivityItemProps } from "./BlockActivityItem";

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

export class VehicleStandby extends BlockActivityItemMixin<typeof VehicleStandby>(Item, {
  blkActIdPropName: "blkactVehicleStandbyNo",
  itemIdPropName: "sdbyStandbyNo",
  placePropName: "sdbyPlace",
  startTimePropName: "sdbyStartTime",
  endTimePropName: "sdbyEndTime",
}) {
  bimoId?: string;
  _sdbyStandbyNo?: string;
  _sdbyStandbyNo?: string;
  sdbyStartTime?: string;
  sdbyEndTime?: string;
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
  constructor(props: VehicleStandbyProps) {
    super(props);
    this.bimoId = gavpfp("bimoId", props);
    this._sdbyStandbyNo = gavpfp("sdbyStandbyNo", props);
    if (!this._sdbyStandbyNo) this._sdbyStandbyNo = this.bimoId;

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
}

VehicleStandby.hastusKeywords = ["vehicle_standby"];
VehicleStandby.hastusObject = "vehicle_standby";

VehicleStandby.allChildClasses = getAllChildClasses(childClasses);

export default VehicleStandby;
