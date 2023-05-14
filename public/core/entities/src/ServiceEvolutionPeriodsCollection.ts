import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ServiceEvolutionPeriodsCollection as BimoServiceEvolutionPeriodsCollection } from "../base-types/rawIndex";
export { ServiceEvolutionPeriodsCollection as BimoServiceEvolutionPeriodsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import {
  ServiceEvolutionPeriod,
  ServiceEvolutionPeriodProps,
} from "./ServiceEvolutionPeriod";

const childClasses: (typeof Entity)[] = [ServiceEvolutionPeriod];

export interface ServiceEvolutionPeriodsCollectionProps
  extends ExtendedCollectionProps<BimoServiceEvolutionPeriod, ServiceEvolutionPeriodProps> {}

export function ServiceEvolutionPeriodsCollectionClassFactory(entityConstructorByEntityClassKey: EntityConstructorByEntityClassKey): typeof BimoServiceEvolutionPeriodsCollection{
 class ServiceEvolutionPeriodsCollection extends Collection<
    ServiceEvolutionPeriod,
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
  
  return ServiceEvolutionPeriodsCollection
}

export default ServiceEvolutionPeriodsCollectionClassFactory