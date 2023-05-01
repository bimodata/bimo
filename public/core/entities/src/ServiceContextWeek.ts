import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import {
  ServiceContextDaysCollection,
  ServiceContextDaysCollectionProps,
} from "./ServiceContextDaysCollection";

const childClasses = [ServiceContextDaysCollection];

export interface ServiceContextWeekProps extends ExtendedItemProps {
  scwkSchedUnitId?: string;
  scwkSchedUnitType?: string;
  scwkDescription?: string;
  scwkAddedForNetEvent?: string;
  serviceContextDays?: string;
}

export class ServiceContextWeek extends Item<ServiceContextWeek> {
  scwkSchedUnitId?: string;
  scwkSchedUnitType?: string;
  scwkDescription?: string;
  scwkAddedForNetEvent?: string;
  serviceContextDays: ServiceContextDaysCollection;
  constructor(props: ServiceContextWeekProps) {
    super(props);
    this.scwkSchedUnitId = gavpfp("scwkSchedUnitId", props, `string`);
    this.scwkSchedUnitType = gavpfp("scwkSchedUnitType", props, `string`, "1100");
    this.scwkDescription = gavpfp("scwkDescription", props, `string`);
    this.scwkAddedForNetEvent = gavpfp("scwkAddedForNetEvent", props, "string", "0");

    /* Children */
    /** @type {ServiceContextDaysCollection} */
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

export default ServiceContextWeek;
