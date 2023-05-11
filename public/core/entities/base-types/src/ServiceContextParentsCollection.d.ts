import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ServiceContextParent, ServiceContextParentProps } from "./ServiceContextParent";
export interface ServiceContextParentsCollectionProps extends ExtendedCollectionProps<ServiceContextParent, ServiceContextParentProps> {
}
export declare class ServiceContextParentsCollection extends Collection<ServiceContextParent, ServiceContextParentProps> {
    constructor(props?: ServiceContextParentsCollectionProps);
}
export default ServiceContextParentsCollection;
