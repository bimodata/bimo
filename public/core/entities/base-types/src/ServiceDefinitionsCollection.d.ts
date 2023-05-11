import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ServiceDefinition, ServiceDefinitionProps } from "./ServiceDefinition";
export interface ServiceDefinitionsCollectionProps extends ExtendedCollectionProps<ServiceDefinition, ServiceDefinitionProps> {
}
export declare class ServiceDefinitionsCollection extends Collection<ServiceDefinition, ServiceDefinitionProps> {
    constructor(props?: ServiceDefinitionsCollectionProps);
}
export default ServiceDefinitionsCollection;
