import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { ServiceContextDaysCollection } from "./ServiceContextDaysCollection";
export interface ServiceContextWeekProps extends ExtendedItemProps {
  scwkSchedUnitId?: string;
  scwkSchedUnitType?: string;
  scwkDescription?: string;
  scwkAddedForNetEvent?: string;
  serviceContextDays?: string;
}
export declare class ServiceContextWeek extends Item<ServiceContextWeek> {
  scwkSchedUnitId?: string;
  scwkSchedUnitType?: string;
  scwkDescription?: string;
  scwkAddedForNetEvent?: string;
  serviceContextDays: ServiceContextDaysCollection;
  constructor(props: ServiceContextWeekProps);
}
