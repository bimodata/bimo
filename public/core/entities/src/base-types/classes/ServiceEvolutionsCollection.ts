import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ServiceEvolution, ServiceEvolutionProps } from "./ServiceEvolution";
export interface ServiceEvolutionsCollectionProps
  extends ExtendedCollectionProps<ServiceEvolution, ServiceEvolutionProps> {}
export declare class ServiceEvolutionsCollection extends Collection<
  ServiceEvolution,
  ServiceEvolutionProps
> {
  constructor(props?: ServiceEvolutionsCollectionProps);
}
