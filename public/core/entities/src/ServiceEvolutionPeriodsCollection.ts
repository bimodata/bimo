import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import {
  ServiceEvolutionPeriod,
  ServiceEvolutionPeriodProps,
} from "./ServiceEvolutionPeriod";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [ServiceEvolutionPeriod];

export interface ServiceEvolutionPeriodsCollectionProps
  extends ExtendedCollectionProps<ServiceEvolutionPeriod, ServiceEvolutionPeriodProps> {}

export class ServiceEvolutionPeriodsCollection extends Collection<
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

export default ServiceEvolutionPeriodsCollection;
