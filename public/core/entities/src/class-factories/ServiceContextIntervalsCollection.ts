import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import {
  ServiceContextIntervalsCollection as BimoServiceContextIntervalsCollection,
  ServiceContextInterval as BimoServiceContextInterval,
} from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ServiceContextIntervalProps } from "./ServiceContextInterval";

export interface ServiceContextIntervalsCollectionProps
  extends ExtendedCollectionProps<
    BimoServiceContextInterval,
    ServiceContextIntervalProps
  > {}

export function ServiceContextIntervalsCollectionClassFactory({
  ServiceContextInterval,
}: EntityConstructorByEntityClassKey): typeof BimoServiceContextIntervalsCollection {
  const childClasses: (typeof Entity)[] = [ServiceContextInterval];
  class ServiceContextIntervalsCollection extends Collection<
    BimoServiceContextInterval,
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

  return ServiceContextIntervalsCollection;
}

export default ServiceContextIntervalsCollectionClassFactory;
