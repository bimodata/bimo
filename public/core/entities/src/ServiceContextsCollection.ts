import { getAllChildClasses } from '@bimo/core-utils-serialization';

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ServiceContext, ServiceContextProps } from "./ServiceContext";

const childClasses = [ServiceContext];


export interface ServiceContextsCollectionProps extends ExtendedCollectionProps<ServiceContext, ServiceContextProps> {
}

export class ServiceContextsCollection extends Collection<ServiceContext, ServiceContextProps> {
  constructor(props: ServiceContextsCollectionProps = {}) {
    super({
      itemName: 'ServiceContext',
      ItemConstructor: ServiceContext,
      associationType: 'aggregation',
      ...props,
    });
  }
}

ServiceContextsCollection.allChildClasses = getAllChildClasses(childClasses);



export default ServiceContextsCollection;
