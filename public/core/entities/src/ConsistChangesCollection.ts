import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ConsistChangesCollection as BimoConsistChangesCollection } from "../base-types/rawIndex";
export { ConsistChangesCollection as BimoConsistChangesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoConsistChange, ConsistChangeProps } from "./ConsistChange";
import { BimoVehicleSchedule, VehicleScheduleProps } from "./VehicleSchedule";
export function ConsistChangesCollectionClassFactory({
  ConsistChange,
  VehicleSchedule,
}: EntityConstructorByEntityClassKey): typeof BimoConsistChangesCollection{
  
  const childClasses: (typeof Entity)[] = [ConsistChange];
  
  export interface ConsistChangesCollectionProps
  extends ExtendedCollectionProps<BimoConsistChange, ConsistChangeProps> {}
  
 class ConsistChangesCollection extends Collection<
    ConsistChange,
    ConsistChangeProps
  > {
    declare parent?: VehicleSchedule;
    constructor(props: ConsistChangesCollectionProps = {}) {
      super({
        itemName: "ConsistChange",
        ItemConstructor: ConsistChange,
        idPropName: `cchgInternalNumber`,
        businessIdPropName: `cchgInternalNumber`,
        labelPropName: ``,
        ...props,
      });
    }
  }
  
  ConsistChangesCollection.allChildClasses = getAllChildClasses(childClasses);
  
  return ConsistChangesCollection
}

export default ConsistChangesCollectionClassFactory