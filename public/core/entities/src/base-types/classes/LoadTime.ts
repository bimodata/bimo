import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
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
export declare class LoadTime extends Item<LoadTime> {
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
  constructor(props: LoadTimeProps);
  /** @type {string} key made of all attributes except the loadtime */
  get key(): string;
  /** @type {string} key made of all attributes including the loadtime */
  get keyWithTime(): string;
}
