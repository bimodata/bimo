import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { SchedulingUnit, SchedulingUnitProps } from "./SchedulingUnit";

const childClasses = [SchedulingUnit];

export interface SchedulingUnitsCollectionProps
  extends ExtendedCollectionProps<SchedulingUnit, SchedulingUnitProps> {}

export class SchedulingUnitsCollection extends Collection<
  SchedulingUnit,
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

export default SchedulingUnitsCollection;
