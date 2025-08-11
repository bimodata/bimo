import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import {
  ServiceContextDaysCollection as BimoServiceContextDaysCollection,
  ServiceContextDay as BimoServiceContextDay,
} from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ServiceContextDayProps } from "./ServiceContextDay";
export interface ServiceContextDaysCollectionProps
  extends ExtendedCollectionProps<BimoServiceContextDay, ServiceContextDayProps> {}

export function ServiceContextDaysCollectionClassFactory({
  ServiceContextDay,
}: EntityConstructorByEntityClassKey): typeof BimoServiceContextDaysCollection {
  const childClasses: (typeof Entity)[] = [ServiceContextDay];

  class ServiceContextDaysCollection extends Collection<
    BimoServiceContextDay,
    ServiceContextDayProps
  > {
    constructor(props: ServiceContextDaysCollectionProps = {}) {
      super({
        itemName: "ServiceContextDay",
        ItemConstructor: ServiceContextDay,
        associationType: "aggregation",
        ...props,
      });
    }
  }

  ServiceContextDaysCollection.allChildClasses = getAllChildClasses(childClasses);

  return ServiceContextDaysCollection;
}

export default ServiceContextDaysCollectionClassFactory;
