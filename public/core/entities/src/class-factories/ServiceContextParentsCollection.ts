import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ServiceContextParentsCollection as BimoServiceContextParentsCollection } from "../base-types/rawIndex";
export { ServiceContextParentsCollection as BimoServiceContextParentsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import {
  BimoServiceContextParent,
  ServiceContextParentProps,
} from "./ServiceContextParent";
export interface ServiceContextParentsCollectionProps
  extends ExtendedCollectionProps<BimoServiceContextParent, ServiceContextParentProps> {}

export function ServiceContextParentsCollectionClassFactory({
  ServiceContextParent,
}: EntityConstructorByEntityClassKey): typeof BimoServiceContextParentsCollection {
  const childClasses: (typeof Entity)[] = [ServiceContextParent];

  class ServiceContextParentsCollection extends Collection<
    BimoServiceContextParent,
    ServiceContextParentProps
  > {
    constructor(props: ServiceContextParentsCollectionProps = {}) {
      super({
        itemName: "ServiceContextParent",
        ItemConstructor: ServiceContextParent,
        associationType: "aggregation",
        ...props,
      });
    }
  }

  ServiceContextParentsCollection.allChildClasses = getAllChildClasses(childClasses);

  return ServiceContextParentsCollection;
}

export default ServiceContextParentsCollectionClassFactory;
