import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { LoadTime as BimoLoadTime } from "../base-types/rawIndex";
export { LoadTime as BimoLoadTime } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

const childClasses: (typeof Entity)[] = [];

export interface LoadTimeProps extends ExtendedItemProps {
  bimoId?: string;
  ltPlaceId?: string;
  ltLoadPlaceId?: string;
  ltPeriodStartTime?: string;
  ltPeriodEndTime?: string;
  ltDirection?: string;
  ltLoadTime?: string;
  ltRouteId?: string;
  ltVariantId?: string;
  ltNetworkEventId?: string;
  ltDetourId?: string;
}

export function LoadTimeClassFactory({}: EntityConstructorByEntityClassKey): typeof BimoLoadTime {
  class LoadTime extends Item<LoadTime> {
    bimoId?: string;
    ltPlaceId?: string;
    ltLoadPlaceId?: string;
    ltPeriodStartTime?: string;
    ltPeriodEndTime?: string;
    ltDirection?: string;
    ltLoadTime?: string;
    ltRouteId?: string;
    ltVariantId?: string;
    ltNetworkEventId?: string;
    ltDetourId?: string;
    constructor(props: LoadTimeProps) {
      super(props);
      this.bimoId = gavpfp("bimoId", props);
      this.ltPlaceId = gavpfp("ltPlaceId", props, `string`);
      this.ltLoadPlaceId = gavpfp("ltLoadPlaceId", props, `string`);
      this.ltPeriodStartTime = gavpfp("ltPeriodStartTime", props, `string`);
      this.ltPeriodEndTime = gavpfp("ltPeriodEndTime", props, `string`);
      this.ltDirection = gavpfp("ltDirection", props, `string`);
      this.ltLoadTime = gavpfp("ltLoadTime", props, `string`);
      this.ltRouteId = gavpfp("ltRouteId", props, `string`);
      this.ltVariantId = gavpfp("ltVariantId", props, `string`);
      this.ltNetworkEventId = gavpfp("ltNetworkEventId", props, `string`);
      this.ltDetourId = gavpfp("ltDetourId", props, `string`);
    }

    /** @type {string} key made of all attributes except the loadtime */
    get key() {
      return (
        `${this.ltPlaceId}|${this.ltLoadPlaceId}|${this.ltPeriodStartTime}|${this.ltPeriodEndTime}` +
        `|${this.ltRouteId}|${this.ltVariantId}|${this.ltNetworkEventId}|${this.ltDetourId}`
      );
    }

    /** @type {string} key made of all attributes including the loadtime */
    get keyWithTime() {
      return (
        `${this.ltPlaceId}|${this.ltLoadPlaceId}|${this.ltPeriodStartTime}|${this.ltPeriodEndTime}` +
        `|${this.ltRouteId}|${this.ltVariantId}|${this.ltNetworkEventId}|${this.ltDetourId}:${this.ltLoadTime}`
      );
    }
  }

  LoadTime.hastusKeywords = ["loadtime"];
  LoadTime.hastusObject = "load_time";

  LoadTime.allChildClasses = getAllChildClasses(childClasses);

  return LoadTime;
}

export default LoadTimeClassFactory;
