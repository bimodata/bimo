import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { CirculationDay, CirculationDayProps } from "./CirculationDay";
export interface CirculationDaysCollectionProps
  extends ExtendedCollectionProps<CirculationDay, CirculationDayProps> {}
export declare class CirculationDaysCollection extends Collection<
  CirculationDay,
  CirculationDayProps
> {
  constructor(props?: CirculationDaysCollectionProps);
}
