import { getAllChildClasses } from '@bimo/core-utils-serialization';

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ServiceContextParent, ServiceContextParentProps } from "./ServiceContextParent";

const childClasses = [ServiceContextParent];


export interface ServiceContextParentsCollectionProps extends ExtendedCollectionProps<ServiceContextParent, ServiceContextParentProps> {
}

export class ServiceContextParentsCollection extends Collection<ServiceContextParent, ServiceContextParentProps> {
  constructor(props: ServiceContextParentsCollectionProps = {}) {
    super({
      itemName: 'ServiceContextParent',
      ItemConstructor: ServiceContextParent,
      associationType: 'aggregation',
      ...props,
    });
  }
}

ServiceContextParentsCollection.allChildClasses = getAllChildClasses(childClasses);



export default ServiceContextParentsCollection;
