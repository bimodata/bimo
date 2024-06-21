import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { CirculationPlansCollection as BimoCirculationPlansCollection } from "../base-types/rawIndex";
export { CirculationPlansCollection as BimoCirculationPlansCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import {
  BimoCirculationPlan,
  CirculationPlanProps,
} from "./CirculationPlan";

export interface CirculationPlansCollectionProps
  extends ExtendedCollectionProps<
    BimoCirculationPlan,
    CirculationPlanProps
  > { }

export function CirculationPlansCollectionClassFactory({
  CirculationPlan,
}: EntityConstructorByEntityClassKey): typeof BimoCirculationPlansCollection {
  const childClasses: (typeof Entity)[] = [CirculationPlan];

  class CirculationPlansCollection extends Collection<
    BimoCirculationPlan,
    CirculationPlanProps
  > {
    constructor(props: CirculationPlansCollectionProps = {}) {
      super({
        itemName: "CirculationPlan",
        ItemConstructor: CirculationPlan,
        idPropName: "bimoId",
        labelPropName: `cirpName`,
        associationType: `aggregation`,
        ...props,
      });
    }


    static createFromOirStyleData(oirStyleData: any) {
      const rawCirculationsPlans = oirStyleData.circulation_plan;

      if (!rawCirculationsPlans) {
        throw new Error(`Bad oirStyleData: could not find "circulation_plan" key`);
      }
      const newCirculationPlansCollection = new CirculationPlansCollection({
        items: rawCirculationsPlans,
      });

      return newCirculationPlansCollection;
    }

    generateOirStyleData() {
      return {
        circulation_plan: this.map((circulationPlan) => ({
          ...circulationPlan,
          circulation_plan_vehicle_schedule_info: circulationPlan.circulationPlanVehicleScheduleInfos?.items,
          circulation_period: circulationPlan.circulationPeriods?.map((circulationPeriod) => ({
            ...circulationPeriod,
            circulation_day: circulationPeriod.circulationDays?.items
          }),
          )
        })),
      };
    }
  }

  CirculationPlansCollection.allChildClasses = getAllChildClasses(childClasses);

  return CirculationPlansCollection;
}

export default CirculationPlansCollectionClassFactory;
