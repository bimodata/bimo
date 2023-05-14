import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { SchedulingUnitDatesCollection as BimoSchedulingUnitDatesCollection } from "../base-types/rawIndex";
export { SchedulingUnitDatesCollection as BimoSchedulingUnitDatesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BimoSchedulingUnitDate, SchedulingUnitDateProps } from "./SchedulingUnitDate";
export function SchedulingUnitDatesCollectionClassFactory({
  SchedulingUnitDate,
}: EntityConstructorByEntityClassKey): typeof BimoSchedulingUnitDatesCollection{
  
  const childClasses: (typeof Entity)[] = [SchedulingUnitDate];
  
  export interface SchedulingUnitDatesCollectionProps
  extends ExtendedCollectionProps<BimoSchedulingUnitDate, SchedulingUnitDateProps> {}
  
 class SchedulingUnitDatesCollection extends Collection<
    SchedulingUnitDate,
    SchedulingUnitDateProps
  > {
    constructor(props: SchedulingUnitDatesCollectionProps) {
      super({
        itemName: "SchedulingUnitDate",
        ItemConstructor: SchedulingUnitDate,
        associationType: "aggregation",
        idPropName: "scudSchedUnitName",
        ...props,
      });
    }
  }
  
  SchedulingUnitDatesCollection.allChildClasses = getAllChildClasses(childClasses);
  
  return SchedulingUnitDatesCollection
}

export default SchedulingUnitDatesCollectionClassFactory