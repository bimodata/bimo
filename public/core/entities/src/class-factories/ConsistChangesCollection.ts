import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import {
  ConsistChangesCollection as BimoConsistChangesCollection,
  VehicleSchedule as BimoVehicleSchedule,
  ConsistChange as BimoConsistChange,
} from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { ConsistChangeProps } from "./ConsistChange";
export interface ConsistChangesCollectionProps
  extends ExtendedCollectionProps<BimoConsistChange, ConsistChangeProps> {}

export function ConsistChangesCollectionClassFactory({
  ConsistChange,
}: EntityConstructorByEntityClassKey): typeof BimoConsistChangesCollection {
  const childClasses: (typeof Entity)[] = [ConsistChange];

  class ConsistChangesCollection extends Collection<
    BimoConsistChange,
    ConsistChangeProps
  > {
    declare parent?: BimoVehicleSchedule;
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

  return ConsistChangesCollection;
}

export default ConsistChangesCollectionClassFactory;
