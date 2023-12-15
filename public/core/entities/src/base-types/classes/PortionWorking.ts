import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { PortionWorkingVersion } from "./PortionWorkingVersion";
export interface PortionWorkingProps extends ExtendedItemProps {
  bimoId?: string;
  pwrkRoutedTripId?: string;
  pwrkRoutingTripId?: string;
  pwrkStartPlace?: string;
  pwrkEndPlace?: string;
  pwrkRoutingTripAtTail?: string;
}
export declare class PortionWorking extends Item<PortionWorking> {
  bimoId?: string;
  pwrkRoutedTripId?: string;
  pwrkRoutingTripId?: string;
  pwrkStartPlace?: string;
  pwrkEndPlace?: string;
  pwrkRoutingTripAtTail?: string;
  constructor(props: PortionWorkingProps);
  get portionWorkingVersion(): PortionWorkingVersion | undefined;
  get shortLoggingOutput(): string;
}
