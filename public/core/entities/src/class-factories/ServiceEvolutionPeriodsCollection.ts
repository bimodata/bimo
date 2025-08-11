import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import {
  ServiceEvolutionPeriodsCollection as BimoServiceEvolutionPeriodsCollection,
  ServiceEvolutionPeriod as BimoServiceEvolutionPeriod,
} from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { ServiceEvolutionPeriodProps } from "./ServiceEvolutionPeriod";

export interface ServiceEvolutionPeriodsCollectionProps
  extends ExtendedCollectionProps<
    BimoServiceEvolutionPeriod,
    ServiceEvolutionPeriodProps
  > {}

export function ServiceEvolutionPeriodsCollectionClassFactory({
  ServiceEvolutionPeriod,
}: EntityConstructorByEntityClassKey): typeof BimoServiceEvolutionPeriodsCollection {
  const childClasses: (typeof Entity)[] = [ServiceEvolutionPeriod];

  class ServiceEvolutionPeriodsCollection extends Collection<
    BimoServiceEvolutionPeriod,
    ServiceEvolutionPeriodProps
  > {
    constructor(props: ServiceEvolutionPeriodsCollectionProps = {}) {
      super({
        itemName: "ServiceEvolutionPeriod",
        ItemConstructor: ServiceEvolutionPeriod,
        associationType: "aggregation",
        ...props,
      });
    }
  }

  ServiceEvolutionPeriodsCollection.allChildClasses = getAllChildClasses(childClasses);

  return ServiceEvolutionPeriodsCollection;
}

export default ServiceEvolutionPeriodsCollectionClassFactory;
