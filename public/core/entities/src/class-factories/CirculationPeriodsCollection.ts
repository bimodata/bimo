import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { CirculationPeriodsCollection as BimoCirculationPeriodsCollection } from "../base-types/rawIndex";
export { CirculationPeriodsCollection as BimoCirculationPeriodsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import {
  BimoCirculationPeriod,
  CirculationPeriodProps,
} from "./CirculationPeriod";

export interface CirculationPeriodsCollectionProps
  extends ExtendedCollectionProps<
    BimoCirculationPeriod,
    CirculationPeriodProps
  > {}

export function CirculationPeriodsCollectionClassFactory({
  CirculationPeriod,
}: EntityConstructorByEntityClassKey): typeof BimoCirculationPeriodsCollection {
  const childClasses: (typeof Entity)[] = [CirculationPeriod];

  class CirculationPeriodsCollection extends Collection<
    BimoCirculationPeriod,
    CirculationPeriodProps
  > {
    constructor(props: CirculationPeriodsCollectionProps = {}) {
      super({
        itemName: "CirculationPeriod",
        ItemConstructor: CirculationPeriod,
        idPropName: "bimoId",
        labelPropName: `cirperId`,
        associationType: `composition`,
        ...props,
      });
    }

  }

  CirculationPeriodsCollection.allChildClasses = getAllChildClasses(childClasses);

  return CirculationPeriodsCollection;
}

export default CirculationPeriodsCollectionClassFactory;
