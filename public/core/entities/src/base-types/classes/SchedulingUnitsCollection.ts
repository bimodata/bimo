import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { SchedulingUnit, SchedulingUnitProps } from "./SchedulingUnit";
export interface SchedulingUnitsCollectionProps
  extends ExtendedCollectionProps<SchedulingUnit, SchedulingUnitProps> {}
export declare class SchedulingUnitsCollection extends Collection<
  SchedulingUnit,
  SchedulingUnitProps
> {
  constructor(props?: SchedulingUnitsCollectionProps);
}
