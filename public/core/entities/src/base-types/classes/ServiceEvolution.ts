import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface ServiceEvolutionProps extends ExtendedItemProps {
  sevoStartDate?: string;
  sevoDisplayName?: string;
  sevoDescription?: string;
  sevoComment?: string;
  sevoDatetimeStamp?: string;
  sevoUserStamp?: string;
}
export declare class ServiceEvolution extends Item<ServiceEvolution> {
  sevoStartDate?: string;
  sevoDisplayName?: string;
  sevoDescription?: string;
  sevoComment?: string;
  sevoDatetimeStamp?: string;
  sevoUserStamp?: string;
  constructor(props: ServiceEvolutionProps);
}
