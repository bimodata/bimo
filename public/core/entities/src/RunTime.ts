import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

const childClasses = [];

export interface RunTimeProps extends ExtendedItemProps {
  bimoId?: string;
  rtStartPlaceId?: string;
  rtEndPlaceId?: string;
  rtPeriodStartTime?: string;
  rtPeriodEndTime?: string;
  rtRunTime?: string;
  rtRouteId?: string;
  rtVariantId?: string;
  rtNetworkEventId?: string;
  rtDetourId?: string;
}

export class RunTime extends Item<RunTime> {
  bimoId?: string;
  rtStartPlaceId?: string;
  rtEndPlaceId?: string;
  rtPeriodStartTime?: string;
  rtPeriodEndTime?: string;
  rtRunTime?: string;
  rtRouteId?: string;
  rtVariantId?: string;
  rtNetworkEventId?: string;
  rtDetourId?: string;
  constructor(props: RunTimeProps) {
    super(props);
    this.bimoId = gavpfp("bimoId", props);
    this.rtStartPlaceId = gavpfp("rtStartPlaceId", props, `string`);
    this.rtEndPlaceId = gavpfp("rtEndPlaceId", props, `string`);
    this.rtPeriodStartTime = gavpfp("rtPeriodStartTime", props, `string`);
    this.rtPeriodEndTime = gavpfp("rtPeriodEndTime", props, `string`);
    this.rtRunTime = gavpfp("rtRunTime", props, `string`);
    this.rtRouteId = gavpfp("rtRouteId", props, `string`);
    this.rtVariantId = gavpfp("rtVariantId", props, `string`);
    this.rtNetworkEventId = gavpfp("rtNetworkEventId", props, `string`);
    this.rtDetourId = gavpfp("rtDetourId", props, `string`);
  }

  copy() {
    const copiedItem = new RunTime(this);
    return copiedItem;
  }

  get runTimeVersion() {
    return this.parent && this.parent.parent;
  }

  get od() {
    return `${this.rtStartPlaceId} -> ${this.rtEndPlaceId}`;
  }

  /** @type {string} key made of all attributes except the runtime */
  get key() {
    return (
      `${this.rtStartPlaceId}|${this.rtEndPlaceId}|${this.rtPeriodStartTime}|${this.rtPeriodEndTime}` +
      `|${this.rtRouteId}|${this.rtVariantId}|${this.rtNetworkEventId}|${this.rtDetourId}`
    );
  }

  /** @type {string} key made of all attributes including the runtime */
  get keyWithTime() {
    return (
      `${this.rtStartPlaceId}|${this.rtEndPlaceId}|${this.rtPeriodStartTime}|${this.rtPeriodEndTime}` +
      `|${this.rtRouteId}|${this.rtVariantId}|${this.rtNetworkEventId}|${this.rtDetourId}:${this.rtRunTime}`
    );
  }

  get shortLoggingOutput() {
    return `${this.rtStartPlaceId} -> ${this.rtEndPlaceId} (${this.rtRouteId}|${this.rtVariantId}) : ${this.rtRunTime}`;
  }
}

RunTime.hastusKeywords = ["runtime"];
RunTime.hastusObject = "run_time";

RunTime.allChildClasses = getAllChildClasses(childClasses);

export default RunTime;
