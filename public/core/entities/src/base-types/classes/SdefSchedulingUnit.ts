import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { SchedulingUnit } from "./SchedulingUnit";
export interface SdefSchedulingUnitProps extends ExtendedItemProps {
  sdscuIdentifier?: string;
  sdscuType?: string;
  sdscuInclSunday?: string;
  sdscuInclMonday?: string;
  sdscuInclTuesday?: string;
  sdscuInclWednesday?: string;
  sdscuInclThursday?: string;
  sdscuInclFriday?: string;
  sdscuInclSaturday?: string;
  includedSchedulingUnits?: SchedulingUnit[];
}
export declare class SdefSchedulingUnit extends Item<SdefSchedulingUnit> {
  sdscuIdentifier?: string;
  sdscuType?: string;
  sdscuInclSunday?: string;
  sdscuInclMonday?: string;
  sdscuInclTuesday?: string;
  sdscuInclWednesday?: string;
  sdscuInclThursday?: string;
  sdscuInclFriday?: string;
  sdscuInclSaturday?: string;
  includedSchedulingUnits: SchedulingUnit[];
  constructor(props: SdefSchedulingUnitProps);
}
