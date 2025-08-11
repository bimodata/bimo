import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { SchedulingUnitsCollection as BimoSchedulingUnitsCollection, SchedulingUnit as BimoSchedulingUnit  } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { SchedulingUnitProps } from "./SchedulingUnit";

export interface SchedulingUnitsCollectionProps
  extends ExtendedCollectionProps<BimoSchedulingUnit, SchedulingUnitProps> {}

export function SchedulingUnitsCollectionClassFactory({
  SchedulingUnit,
}: EntityConstructorByEntityClassKey): typeof BimoSchedulingUnitsCollection {
  const childClasses: (typeof Entity)[] = [SchedulingUnit];

  class SchedulingUnitsCollection extends Collection<
    BimoSchedulingUnit,
    SchedulingUnitProps
  > {
    constructor(props: SchedulingUnitsCollectionProps = {}) {
      super({
        itemName: "SchedulingUnit",
        ItemConstructor: SchedulingUnit,
        // idPropName: 'scuIdentifier',
        businessIdPropName: "scuIdentifier",
        labelPropName: "slo",
        ...props,
      });
    }
  }

  SchedulingUnitsCollection.allChildClasses = getAllChildClasses(childClasses);

  return SchedulingUnitsCollection;
}

export default SchedulingUnitsCollectionClassFactory;
