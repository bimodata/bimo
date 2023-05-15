import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ServiceContextWeek, ServiceContextWeekProps } from "./ServiceContextWeek";
export interface ServiceContextWeeksCollectionProps
  extends ExtendedCollectionProps<ServiceContextWeek, ServiceContextWeekProps> {}
export declare class ServiceContextWeeksCollection extends Collection<
  ServiceContextWeek,
  ServiceContextWeekProps
> {
  constructor(props?: ServiceContextWeeksCollectionProps);
}
