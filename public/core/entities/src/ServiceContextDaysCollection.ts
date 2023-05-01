import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ServiceContextDay, ServiceContextDayProps } from "./ServiceContextDay";

const childClasses = [ServiceContextDay];

export interface ServiceContextDaysCollectionProps
  extends ExtendedCollectionProps<ServiceContextDay, ServiceContextDayProps> {}

export class ServiceContextDaysCollection extends Collection<
  ServiceContextDay,
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

export default ServiceContextDaysCollection;
