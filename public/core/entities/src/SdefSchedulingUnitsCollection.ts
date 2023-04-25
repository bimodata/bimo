import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { SdefSchedulingUnit, SdefSchedulingUnitProps } from "./SdefSchedulingUnit";

const childClasses = [SdefSchedulingUnit];


export interface SdefSchedulingUnitsCollectionProps extends ExtendedCollectionProps<SdefSchedulingUnit, SdefSchedulingUnitProps> {
}

export class SdefSchedulingUnitsCollection extends Collection<SdefSchedulingUnit, SdefSchedulingUnitProps> {
  constructor(props: SdefSchedulingUnitsCollectionProps = {}) {
    super({
      itemName: 'SdefSchedulingUnit',
      ItemConstructor: SdefSchedulingUnit,
      // idPropName: 'sdscuIdentifier',
      businessIdPropName: 'sdscuIdentifier',
      labelPropName: 'sdscuIdentifier',
      ...props,
    });
  }
}

SdefSchedulingUnitsCollection.ItemConstructor = SdefSchedulingUnit;

SdefSchedulingUnitsCollection.allChildClasses = getAllChildClasses(childClasses);



export default SdefSchedulingUnitsCollection;
