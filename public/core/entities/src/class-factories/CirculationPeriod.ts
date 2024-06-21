import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { CirculationPeriod as BimoCirculationPeriod } from "../base-types/rawIndex";
export { CirculationPeriod as BimoCirculationPeriod } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

import { BimoCirculationDaysCollection } from "./CirculationDaysCollection";

export interface CirculationPeriodProps extends ExtendedItemProps {

  bimoId?: string;
  cirperId?: string;
  cirperPrevPeriodId?: string;
  cirperNextPeriodId?: string;
  circulationDays?: BimoCirculationDaysCollection;
}
export function CirculationPeriodClassFactory({
  CirculationDaysCollection,
}: EntityConstructorByEntityClassKey): typeof BimoCirculationPeriod {
  const childClasses: (typeof Entity)[] = [CirculationDaysCollection];

  class CirculationPeriod extends Item<CirculationPeriod> {
    bimoId?: string;
    cirperId?: string;
    cirperPrevPeriodId?: string;
    cirperNextPeriodId?: string;
    circulationDays?: BimoCirculationDaysCollection;
    constructor(props: CirculationPeriodProps) {
      super(props);
      this.bimoId = gavpfp("bimoId", props);
      this.cirperId = gavpfp("cirperId", props, `string`);
      this.cirperPrevPeriodId = gavpfp("cirperPrevPeriodId", props, `string`);
      this.cirperNextPeriodId = gavpfp("cirperNextPeriodId", props, `string`);
      this.circulationDays = gavpfp(
        "circulationDays",
        props,
        CirculationDaysCollection,
        new CirculationDaysCollection(),
        { altPropName: "circulation_day", parent: this }
      );
    }

    get shortLoggingOutput() {
      return `${this.cirperId}`;
    }
  }

  CirculationPeriod.hastusKeywords = ["circulation_period"];
  CirculationPeriod.hastusObject = "circulation_period";

  CirculationPeriod.allChildClasses = getAllChildClasses(childClasses);

  return CirculationPeriod;
}

export default CirculationPeriodClassFactory;
