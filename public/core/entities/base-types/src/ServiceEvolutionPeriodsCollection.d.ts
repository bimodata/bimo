import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ServiceEvolutionPeriod, ServiceEvolutionPeriodProps } from "./ServiceEvolutionPeriod";
export interface ServiceEvolutionPeriodsCollectionProps extends ExtendedCollectionProps<ServiceEvolutionPeriod, ServiceEvolutionPeriodProps> {
}
export declare class ServiceEvolutionPeriodsCollection extends Collection<ServiceEvolutionPeriod, ServiceEvolutionPeriodProps> {
    constructor(props?: ServiceEvolutionPeriodsCollectionProps);
}
export default ServiceEvolutionPeriodsCollection;
