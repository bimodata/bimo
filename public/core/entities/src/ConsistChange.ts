const childClasses = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import BlockActivityItemMixin, { BlockActivityItem } from "./BlockActivityItem";

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

export class ConsistChange extends BlockActivityItemMixin(Item, {
  blkActIdPropName: "blkactCchgNo",
  itemIdPropName: "cchgInternalNumber",
  placePropName: "cchgPlaceStart",
  startTimePropName: "cchgTimeStart",
  endTimePropName: "cchgTimeStart", // TODO: improve this
}) {
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

  /** @param {import ('./Trip')} newTrip */
  setNewTrip(newTrip) {
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
    return this._cchgTimeStart || this._cchgBuildTime;
  }

  set cchgTimeStart(v) {
    this._cchgTimeStart = v;
  }

  get shortLoggingOutput() {
    return `${this.cchgActivity}-${this.cchgPlaceStart}-${this.cchgTimeStart}-${this.cchgOnTripNo}`;
  }
}

ConsistChange.hastusKeywords = ["consist_change"];
ConsistChange.hastusObject = "consist_change";
ConsistChange.allChildClasses = getAllChildClasses(childClasses);

export default ConsistChange;
