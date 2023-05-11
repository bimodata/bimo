import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ServiceContextWeek, ServiceContextWeekProps } from "./ServiceContextWeek";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [ServiceContextWeek];

export interface ServiceContextWeeksCollectionProps
  extends ExtendedCollectionProps<ServiceContextWeek, ServiceContextWeekProps> {}

export class ServiceContextWeeksCollection extends Collection<
  ServiceContextWeek,
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

export default ServiceContextWeeksCollection;