import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { SdefSchedulingUnit, SdefSchedulingUnitProps } from "./SdefSchedulingUnit";
export interface SdefSchedulingUnitsCollectionProps
  extends ExtendedCollectionProps<SdefSchedulingUnit, SdefSchedulingUnitProps> {}
export declare class SdefSchedulingUnitsCollection extends Collection<
  SdefSchedulingUnit,
  SdefSchedulingUnitProps
> {
  constructor(props?: SdefSchedulingUnitsCollectionProps);
}
