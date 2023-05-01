import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import {
  ServiceEvolutionPeriod,
  ServiceEvolutionPeriodProps,
} from "./ServiceEvolutionPeriod";

const childClasses = [ServiceEvolutionPeriod];

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
