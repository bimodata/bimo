import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ServiceContextDay as BimoServiceContextDay } from "../base-types/rawIndex";
export { ServiceContextDay as BimoServiceContextDay } from "../base-types/rawIndex";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

export interface ServiceContextDayProps extends ExtendedItemProps {
  scdayWeekRank?: string;
  scdayProdPhaseDay?: string;
  scdayApplicMethod?: string;
  scdaySpecSchedName?: string;
  scdaySpecSchedType?: string;
  scdaySpecSchedScenario?: string;
  scdaySpecSchedBooking?: string;
  scdayGetFromCalendarId?: string;
  scdayGetFromBookingId?: string;
  scdayGetFromContext?: string;
  scdayGetFromDayRank?: string;
}

export function ServiceContextDayClassFactory({}: EntityConstructorByEntityClassKey): typeof BimoServiceContextDay {
  class ServiceContextDay extends Item<ServiceContextDay> {
    scdayWeekRank?: string;
    scdayProdPhaseDay?: string;
    scdayApplicMethod?: string;
    scdaySpecSchedName?: string;
    scdaySpecSchedType?: string;
    scdaySpecSchedScenario?: string;
    scdaySpecSchedBooking?: string;
    scdayGetFromCalendarId?: string;
    scdayGetFromBookingId?: string;
    scdayGetFromContext?: string;
    scdayGetFromDayRank?: string;
    constructor(props: ServiceContextDayProps) {
      super(props);
      this.scdayWeekRank = gavpfp("scdayWeekRank", props, `string`);
      this.scdayProdPhaseDay = gavpfp("scdayProdPhaseDay", props, `string`, "0");
      this.scdayApplicMethod = gavpfp("scdayApplicMethod", props, `string`, "1");
      this.scdaySpecSchedName = gavpfp("scdaySpecSchedName", props);
      this.scdaySpecSchedType = gavpfp("scdaySpecSchedType", props, `string`);
      this.scdaySpecSchedScenario = gavpfp("scdaySpecScenario", props, `string`);
      this.scdaySpecSchedBooking = gavpfp("scdaySpecBooking", props, `string`);
      this.scdayGetFromCalendarId = gavpfp("scdayGetFromCalendarId", props, `string`);
      this.scdayGetFromBookingId = gavpfp("scdayGetFromBookingId", props, `string`);
      this.scdayGetFromContext = gavpfp("scdayGetFromContext", props, `string`);
      this.scdayGetFromDayRank = gavpfp("scdayGetFromDayRank", props, `string`);
    }
  }

  return ServiceContextDay;
}

export default ServiceContextDayClassFactory;
