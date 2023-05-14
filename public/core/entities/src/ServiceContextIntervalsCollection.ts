import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ServiceContextIntervalsCollection as BimoServiceContextIntervalsCollection } from "../base-types/rawIndex";
export { ServiceContextIntervalsCollection as BimoServiceContextIntervalsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import {
  ServiceContextInterval,
  ServiceContextIntervalProps,
} from "./ServiceContextInterval";

const childClasses: (typeof Entity)[] = [ServiceContextInterval];

export interface ServiceContextIntervalsCollectionProps
  extends ExtendedCollectionProps<BimoServiceContextInterval, ServiceContextIntervalProps> {}

export function ServiceContextIntervalsCollectionClassFactory(entityConstructorByEntityClassKey: EntityConstructorByEntityClassKey): typeof BimoServiceContextIntervalsCollection{
 class ServiceContextIntervalsCollection extends Collection<
    ServiceContextInterval,
    ServiceContextIntervalProps
  > {
    constructor(props: ServiceContextIntervalsCollectionProps = {}) {
      super({
        itemName: "ServiceContextInterval",
        ItemConstructor: ServiceContextInterval,
        associationType: "aggregation",
        ...props,
      });
    }
  }
  
  ServiceContextIntervalsCollection.allChildClasses = getAllChildClasses(childClasses);
  
  return ServiceContextIntervalsCollection
}

export default ServiceContextIntervalsCollectionClassFactory