import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { CirculationDaysCollection as BimoCirculationDaysCollection } from "../base-types/rawIndex";
export { CirculationDaysCollection as BimoCirculationDaysCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoCirculationDay, CirculationDayProps } from "./CirculationDay";

export interface CirculationDaysCollectionProps
  extends ExtendedCollectionProps<BimoCirculationDay, CirculationDayProps> {}

export function CirculationDaysCollectionClassFactory({
  CirculationDay,
}: EntityConstructorByEntityClassKey): typeof BimoCirculationDaysCollection {
  const childClasses: (typeof Entity)[] = [CirculationDay];

  class CirculationDaysCollection extends Collection<
    BimoCirculationDay,
    CirculationDayProps
  > {
    constructor(props: CirculationDaysCollectionProps = {}) {
      super({
        itemName: "CirculationDay",
        ItemConstructor: CirculationDay,
        idPropName: `bimoId`,
        labelPropName: `slo`,
        ...props,
      });
    }
  }

  CirculationDaysCollection.allChildClasses = getAllChildClasses(childClasses);

  return CirculationDaysCollection;
}

export default CirculationDaysCollectionClassFactory;
