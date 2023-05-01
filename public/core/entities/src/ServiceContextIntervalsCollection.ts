import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import {
  ServiceContextInterval,
  ServiceContextIntervalProps,
} from "./ServiceContextInterval";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [ServiceContextInterval];

export interface ServiceContextIntervalsCollectionProps
  extends ExtendedCollectionProps<ServiceContextInterval, ServiceContextIntervalProps> {}

export class ServiceContextIntervalsCollection extends Collection<
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

export default ServiceContextIntervalsCollection;
