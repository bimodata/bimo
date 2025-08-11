import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { SdefSchedulingUnitsCollection as BimoSdefSchedulingUnitsCollection, SdefSchedulingUnit as BimoSdefSchedulingUnit  } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { SdefSchedulingUnitProps } from "./SdefSchedulingUnit";

export interface SdefSchedulingUnitsCollectionProps
  extends ExtendedCollectionProps<BimoSdefSchedulingUnit, SdefSchedulingUnitProps> {}

export function SdefSchedulingUnitsCollectionClassFactory({
  SdefSchedulingUnit,
}: EntityConstructorByEntityClassKey): typeof BimoSdefSchedulingUnitsCollection {
  const childClasses: (typeof Entity)[] = [SdefSchedulingUnit];

  class SdefSchedulingUnitsCollection extends Collection<
    BimoSdefSchedulingUnit,
    SdefSchedulingUnitProps
  > {
    constructor(props: SdefSchedulingUnitsCollectionProps = {}) {
      super({
        itemName: "SdefSchedulingUnit",
        ItemConstructor: SdefSchedulingUnit,
        // idPropName: 'sdscuIdentifier',
        businessIdPropName: "sdscuIdentifier",
        labelPropName: "sdscuIdentifier",
        ...props,
      });
    }
  }

  SdefSchedulingUnitsCollection.allChildClasses = getAllChildClasses(childClasses);

  return SdefSchedulingUnitsCollection;
}

export default SdefSchedulingUnitsCollectionClassFactory;
