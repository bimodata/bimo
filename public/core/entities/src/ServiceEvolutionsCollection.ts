import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ServiceEvolutionsCollection as BimoServiceEvolutionsCollection } from "../base-types/rawIndex";
export { ServiceEvolutionsCollection as BimoServiceEvolutionsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BimoServiceEvolution, ServiceEvolutionProps } from "./ServiceEvolution";
export function ServiceEvolutionsCollectionClassFactory({
  ServiceEvolution,
}: EntityConstructorByEntityClassKey): typeof BimoServiceEvolutionsCollection{
  
  const childClasses: (typeof Entity)[] = [ServiceEvolution];
  
  export interface ServiceEvolutionsCollectionProps
  extends ExtendedCollectionProps<BimoServiceEvolution, ServiceEvolutionProps> {}
  
 class ServiceEvolutionsCollection extends Collection<
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
  
  return ServiceEvolutionsCollection
}

export default ServiceEvolutionsCollectionClassFactory