import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { ServiceDefinition, ServiceDefinitionProps } from "./ServiceDefinition";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [ServiceDefinition];

export interface ServiceDefinitionsCollectionProps
  extends ExtendedCollectionProps<ServiceDefinition, ServiceDefinitionProps> {}

export class ServiceDefinitionsCollection extends Collection<
  ServiceDefinition,
  ServiceDefinitionProps
> {
  constructor(props: ServiceDefinitionsCollectionProps = {}) {
    super({
      itemName: "ServiceDefinition",
      ItemConstructor: ServiceDefinition,
      // idPropName: 'sdefIdentifier',
      businessIdPropName: "sdefIdentifier",
      labelPropName: "sdefDescription",
      ...props,
    });
  }
}

ServiceDefinitionsCollection.allChildClasses = getAllChildClasses(childClasses);

export default ServiceDefinitionsCollection;
