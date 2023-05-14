import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ServiceDefinitionsCollection as BimoServiceDefinitionsCollection } from "../base-types/rawIndex";
export { ServiceDefinitionsCollection as BimoServiceDefinitionsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoServiceDefinition, ServiceDefinitionProps } from "./ServiceDefinition";
export function ServiceDefinitionsCollectionClassFactory({
  ServiceDefinition,
}: EntityConstructorByEntityClassKey): typeof BimoServiceDefinitionsCollection{
  
  const childClasses: (typeof Entity)[] = [ServiceDefinition];
  
  export interface ServiceDefinitionsCollectionProps
  extends ExtendedCollectionProps<BimoServiceDefinition, ServiceDefinitionProps> {}
  
 class ServiceDefinitionsCollection extends Collection<
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
  
  return ServiceDefinitionsCollection
}

export default ServiceDefinitionsCollectionClassFactory