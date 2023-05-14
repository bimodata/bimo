import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ServiceContextWeek as BimoServiceContextWeek } from "../base-types/rawIndex";
export { ServiceContextWeek as BimoServiceContextWeek } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { BimoServiceContextDaysCollection } from "./ServiceContextDaysCollection";

export interface ServiceContextWeekProps extends ExtendedItemProps {
  scwkSchedUnitId?: string;
  scwkSchedUnitType?: string;
  scwkDescription?: string;
  scwkAddedForNetEvent?: string;
  serviceContextDays?: string;
}

export function ServiceContextWeekClassFactory({
  ServiceContextDaysCollection,
}: EntityConstructorByEntityClassKey): typeof BimoServiceContextWeek {
  const childClasses: (typeof Entity)[] = [ServiceContextDaysCollection];

  class ServiceContextWeek extends Item<ServiceContextWeek> {
    scwkSchedUnitId?: string;
    scwkSchedUnitType?: string;
    scwkDescription?: string;
    scwkAddedForNetEvent?: string;
    serviceContextDays: BimoServiceContextDaysCollection;
    constructor(props: ServiceContextWeekProps) {
      super(props);
      this.scwkSchedUnitId = gavpfp("scwkSchedUnitId", props, `string`);
      this.scwkSchedUnitType = gavpfp("scwkSchedUnitType", props, `string`, "1100");
      this.scwkDescription = gavpfp("scwkDescription", props, `string`);
      this.scwkAddedForNetEvent = gavpfp("scwkAddedForNetEvent", props, "string", "0");

      this.serviceContextDays = gavpfp(
        "serviceContextDays",
        props,
        ServiceContextDaysCollection,
        new ServiceContextDaysCollection(),
        { altPropName: "service_context_day", parent: this }
      );
    }
  }

  ServiceContextWeek.allChildClasses = getAllChildClasses(childClasses);

  return ServiceContextWeek;
}

export default ServiceContextWeekClassFactory;
