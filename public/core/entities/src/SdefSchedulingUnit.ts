import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { SdefSchedulingUnit as BimoSdefSchedulingUnit } from "../base-types/rawIndex";
export { SdefSchedulingUnit as BimoSdefSchedulingUnit } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { BimoSchedulingUnit, SchedulingUnitProps } from "./SchedulingUnit";
export function SdefSchedulingUnitClassFactory({
  SchedulingUnit,
}: EntityConstructorByEntityClassKey): typeof BimoSdefSchedulingUnit{
  
  const childClasses: (typeof Entity)[] = [];
  
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
  
 class SdefSchedulingUnit extends Item<SdefSchedulingUnit> {
    sdscuIdentifier?: string;
    sdscuType?: string;
    sdscuInclSunday?: string;
    sdscuInclMonday?: string;
    sdscuInclTuesday?: string;
    sdscuInclWednesday?: string;
    sdscuInclThursday?: string;
    sdscuInclFriday?: string;
    sdscuInclSaturday?: string;
    includedSchedulingUnits: SchedulingUnit[] = [];
    constructor(props: SdefSchedulingUnitProps) {
      super(props);
      this.sdscuIdentifier = gavpfp("sdscuIdentifier", props, `string`);
      this.sdscuType = gavpfp("sdscuType", props, `string`, "1100");
      this.sdscuInclSunday = gavpfp("sdscuInclSunday", props, `string`, "1");
      this.sdscuInclMonday = gavpfp("sdscuInclMonday", props, `string`, "1");
      this.sdscuInclTuesday = gavpfp("sdscuInclTuesday", props, `string`, "1");
      this.sdscuInclWednesday = gavpfp("sdscuInclWednesday", props, `string`, "1");
      this.sdscuInclThursday = gavpfp("sdscuInclThursday", props, `string`, "1");
      this.sdscuInclFriday = gavpfp("sdscuInclFriday", props, `string`, "1");
      this.sdscuInclSaturday = gavpfp("sdscuInclSaturday", props, `string`, "1");
    }
  }
  
  SdefSchedulingUnit.hastusKeywords = ["sdef_scheduling_unit_incl"];
  SdefSchedulingUnit.hastusObject = "sdef_scheduling_unit";
  
  SdefSchedulingUnit.allChildClasses = getAllChildClasses(childClasses);
  
  return SdefSchedulingUnit
}

export default SdefSchedulingUnitClassFactory