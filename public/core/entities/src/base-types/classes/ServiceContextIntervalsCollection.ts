import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ServiceContextInterval, ServiceContextIntervalProps } from "./ServiceContextInterval";
export interface ServiceContextIntervalsCollectionProps extends ExtendedCollectionProps<ServiceContextInterval, ServiceContextIntervalProps> {
}
export declare class ServiceContextIntervalsCollection extends Collection<ServiceContextInterval, ServiceContextIntervalProps> {
    constructor(props?: ServiceContextIntervalsCollectionProps);
}
export default ServiceContextIntervalsCollection;
