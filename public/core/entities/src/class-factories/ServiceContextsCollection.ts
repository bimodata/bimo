import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ServiceContextsCollection as BimoServiceContextsCollection } from "../base-types/rawIndex";
export { ServiceContextsCollection as BimoServiceContextsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BimoServiceContext, ServiceContextProps } from "./ServiceContext";

export interface ServiceContextsCollectionProps
  extends ExtendedCollectionProps<BimoServiceContext, ServiceContextProps> {}

export function ServiceContextsCollectionClassFactory({
  ServiceContext,
}: EntityConstructorByEntityClassKey): typeof BimoServiceContextsCollection {
  const childClasses: (typeof Entity)[] = [ServiceContext];

  class ServiceContextsCollection extends Collection<
    BimoServiceContext,
    ServiceContextProps
  > {
    constructor(props: ServiceContextsCollectionProps = {}) {
      super({
        itemName: "ServiceContext",
        ItemConstructor: ServiceContext,
        associationType: "aggregation",
        ...props,
      });
    }
  }

  ServiceContextsCollection.allChildClasses = getAllChildClasses(childClasses);

  return ServiceContextsCollection;
}

export default ServiceContextsCollectionClassFactory;
