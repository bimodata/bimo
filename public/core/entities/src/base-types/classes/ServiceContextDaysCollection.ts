import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ServiceContextDay, ServiceContextDayProps } from "./ServiceContextDay";
export interface ServiceContextDaysCollectionProps
  extends ExtendedCollectionProps<ServiceContextDay, ServiceContextDayProps> {}
export declare class ServiceContextDaysCollection extends Collection<
  ServiceContextDay,
  ServiceContextDayProps
> {
  constructor(props?: ServiceContextDaysCollectionProps);
}
