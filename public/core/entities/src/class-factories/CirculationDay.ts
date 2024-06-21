import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { CirculationDay as BimoCirculationDay } from "../base-types/rawIndex";
export { CirculationDay as BimoCirculationDay } from "../base-types/rawIndex";
import { CirculationPeriod as BimoCirculationPeriod } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

const childClasses: (typeof Entity)[] = [];

export interface CirculationDayProps extends ExtendedItemProps {
  bimoId?: string;
  cirdDay?: string;
  cirdVehicleTaskId?: string;
  cirdStartPlace?: string;
  cirdStartTime?: string;
  cirdStartRoute?: string;
  cirdEndPlace?: string;
  cirdEndTime?: string;
  cirdEndRoute?: string;
  cirdIdFirstInServTrip?: string;
  cirdRank?: string;
  cirdVehicleType?: string;
  cirdHasFixedLink?: string;
}

export function CirculationDayClassFactory(
  entityConstructorByEntityClassKey: EntityConstructorByEntityClassKey
): typeof BimoCirculationDay {
  class CirculationDay extends Item<CirculationDay> {
    bimoId?: string;
    cirdDay?: string;
    cirdVehicleTaskId?: string;
    cirdStartPlace?: string;
    cirdStartTime?: string;
    cirdStartRoute?: string;
    cirdEndPlace?: string;
    cirdEndTime?: string;
    cirdEndRoute?: string;
    cirdIdFirstInServTrip?: string;
    cirdRank?: string;
    cirdVehicleType?: string;
    cirdHasFixedLink?: string;
    constructor(props: CirculationDayProps) {
      super(props);
      this.bimoId = gavpfp("bimoId", props);
      this.cirdDay = gavpfp("cirdDay", props, `string`);
      this.cirdVehicleTaskId = gavpfp("cirdVehicleTaskId", props, `string`);
      this.cirdStartPlace = gavpfp("cirdStartPlace", props, `string`);
      this.cirdStartTime = gavpfp("cirdStartTime", props, `string`);
      this.cirdStartRoute = gavpfp("cirdStartRoute", props, `string`);
      this.cirdEndPlace = gavpfp("cirdEndPlace", props, `string`);
      this.cirdEndTime = gavpfp("cirdEndTime", props, `string`);
      this.cirdEndRoute = gavpfp("cirdEndRoute", props, `string`);
      this.cirdIdFirstInServTrip = gavpfp("cirdIdFirstInServTrip", props, `string`);
      this.cirdRank = gavpfp("cirdRank", props, `string`);
      this.cirdVehicleType = gavpfp("cirdVehicleType", props, `string`);
      this.cirdHasFixedLink = gavpfp("cirdHasFixedLink", props, `string`);
    }

    get circulationPeriod() {
      return this.parent && (this.parent.parent as BimoCirculationPeriod);
    }

    get shortLoggingOutput() {
      return `${this.cirdVehicleTaskId} & ${this.cirdDay} (${this.cirdStartPlace} => ${this.cirdEndPlace})`;
    }
  }

  CirculationDay.hastusKeywords = ["circulation_day"];
  CirculationDay.hastusObject = "circulation_day";

  CirculationDay.allChildClasses = getAllChildClasses(childClasses);

  return CirculationDay;
}

export default CirculationDayClassFactory;
