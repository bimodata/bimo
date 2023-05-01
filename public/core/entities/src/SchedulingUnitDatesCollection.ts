import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { SchedulingUnitDate, SchedulingUnitDateProps } from "./SchedulingUnitDate";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [SchedulingUnitDate];

export interface SchedulingUnitDatesCollectionProps
  extends ExtendedCollectionProps<SchedulingUnitDate, SchedulingUnitDateProps> {}

export class SchedulingUnitDatesCollection extends Collection<
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

export default SchedulingUnitDatesCollection;
