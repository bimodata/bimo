import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ServiceEvolution, ServiceEvolutionProps } from "./ServiceEvolution";

const childClasses = [ServiceEvolution];

export interface ServiceEvolutionsCollectionProps
  extends ExtendedCollectionProps<ServiceEvolution, ServiceEvolutionProps> {}

export class ServiceEvolutionsCollection extends Collection<
  ServiceEvolution,
  ServiceEvolutionProps
> {
  constructor(props: ServiceEvolutionsCollectionProps = {}) {
    super({
      itemName: "ServiceEvolution",
      ItemConstructor: ServiceEvolution,
      associationType: "aggregation",
      ...props,
    });
  }
}

ServiceEvolutionsCollection.allChildClasses = getAllChildClasses(childClasses);

export default ServiceEvolutionsCollection;
