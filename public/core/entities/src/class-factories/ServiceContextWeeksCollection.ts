import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import {
  ServiceContextWeeksCollection as BimoServiceContextWeeksCollection,
  ServiceContextWeek as BimoServiceContextWeek,
} from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ServiceContextWeekProps } from "./ServiceContextWeek";

export interface ServiceContextWeeksCollectionProps
  extends ExtendedCollectionProps<BimoServiceContextWeek, ServiceContextWeekProps> {}

export function ServiceContextWeeksCollectionClassFactory({
  ServiceContextWeek,
}: EntityConstructorByEntityClassKey): typeof BimoServiceContextWeeksCollection {
  const childClasses: (typeof Entity)[] = [ServiceContextWeek];

  class ServiceContextWeeksCollection extends Collection<
    BimoServiceContextWeek,
    ServiceContextWeekProps
  > {
    constructor(props: ServiceContextWeeksCollectionProps = {}) {
      super({
        itemName: "ServiceContextWeek",
        businessIdPropName: "scwkSchedUnitId",
        ItemConstructor: ServiceContextWeek,
        associationType: "aggregation",
        ...props,
      });
    }
  }

  ServiceContextWeeksCollection.allChildClasses = getAllChildClasses(childClasses);

  return ServiceContextWeeksCollection;
}

export default ServiceContextWeeksCollectionClassFactory;
