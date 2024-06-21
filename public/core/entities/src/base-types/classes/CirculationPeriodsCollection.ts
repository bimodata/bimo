import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import {
  CirculationPeriod,
  CirculationPeriodProps,
} from "./CirculationPeriod";
export interface CirculationPeriodsCollectionProps
  extends ExtendedCollectionProps<CirculationPeriod, CirculationPeriodProps> {}
export declare class CirculationPeriodsCollection extends Collection<
  CirculationPeriod,
  CirculationPeriodProps
> {
  constructor(props?: CirculationPeriodsCollectionProps);
}
