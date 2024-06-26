import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { SchedulingUnitDate as BimoSchedulingUnitDate } from "../base-types/rawIndex";
export { SchedulingUnitDate as BimoSchedulingUnitDate } from "../base-types/rawIndex";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

export interface SchedulingUnitDateProps extends ExtendedItemProps {
  scudDate?: string;
  scudSchedUnitName?: string;
  scudSchedUnitType?: string;
  scudProdPhaseDate?: string;
  scudApplicMethod?: string;
  scudSpecSchedName?: string;
  scudSpecSchedType?: string;
  scudSpecSchedScenario?: string;
  scudSpecSchedBooking?: string;
  scudGetFromSource?: string;
  scudGetFromDayRank?: string;
  scudGetFromCalendarId?: string;
  scudGetFromBookingId?: string;
  scudGetFromDate?: string;
  scudProdBookingId?: string;
  scudProdSchedType?: string;
}

export function SchedulingUnitDateClassFactory({}: EntityConstructorByEntityClassKey): typeof BimoSchedulingUnitDate {
  class SchedulingUnitDate extends Item<SchedulingUnitDate> {
    scudDate?: string;
    scudSchedUnitName?: string;
    scudSchedUnitType?: string;
    scudProdPhaseDate?: string;
    scudApplicMethod?: string;
    scudSpecSchedName?: string;
    scudSpecSchedType?: string;
    scudSpecSchedScenario?: string;
    scudSpecSchedBooking?: string;
    scudGetFromSource?: string;
    scudGetFromDayRank?: string;
    scudGetFromCalendarId?: string;
    scudGetFromBookingId?: string;
    scudGetFromDate?: string;
    scudProdBookingId?: string;
    scudProdSchedType?: string;
    constructor(props: SchedulingUnitDateProps) {
      super(props);
      this.scudDate = gavpfp("scudDate", props, `string`);
      this.scudSchedUnitName = gavpfp("scudSchedUnitName", props, `string`);
      this.scudSchedUnitType = gavpfp("scudSchedUnitType", props, `string`, "1100");
      this.scudProdPhaseDate = gavpfp("scudProdPhaseDate", props, `string`, "0");
      this.scudApplicMethod = gavpfp("scudApplicMethod", props, `string`, "2");
      this.scudSpecSchedName = gavpfp("scudSpecSchedName", props, `string`);
      this.scudSpecSchedType = gavpfp("scudSpecSchedType", props);
      this.scudSpecSchedScenario = gavpfp("scudSpecSchedScenario", props);
      this.scudSpecSchedBooking = gavpfp("scudSpecSchedBooking", props, `string`);
      this.scudGetFromSource = gavpfp("scudGetFromSource", props, `string`);
      this.scudGetFromDayRank = gavpfp("scudGetFromDayRank", props, `string`);
      this.scudGetFromCalendarId = gavpfp("scudGetFromCalendarId", props);
      this.scudGetFromBookingId = gavpfp("scudGetFromBookingId", props);
      this.scudGetFromDate = gavpfp("scudGetFromDate", props);
      this.scudProdBookingId = gavpfp("scudProdBookingId", props);
      this.scudProdSchedType = gavpfp("scudProdSchedType", props);
    }

    get mediumLoggingOutput() {
      return (
        `${this.scudSchedUnitName} (${this.scudApplicMethod}) :` +
        `${this.scudSpecSchedName} - ${this.scudSpecSchedType} ${this.scudSpecSchedScenario} `
      );
    }

    get shortLoggingOutput() {
      return `${this.scudSchedUnitName} (${this.scudApplicMethod})`;
    }
  }

  return SchedulingUnitDate;
}

export default SchedulingUnitDateClassFactory;
