import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { CirculationPlanVehicleScheduleInfosCollection as BimoCirculationPlanVehicleScheduleInfosCollection } from "../base-types/rawIndex";
export { CirculationPlanVehicleScheduleInfosCollection as BimoCirculationPlanVehicleScheduleInfosCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoCirculationPlanVehicleScheduleInfo, CirculationPlanVehicleScheduleInfoProps } from "./CirculationPlanVehicleScheduleInfo";

export interface CirculationPlanVehicleScheduleInfosCollectionProps
  extends ExtendedCollectionProps<BimoCirculationPlanVehicleScheduleInfo, CirculationPlanVehicleScheduleInfoProps> {}

export function CirculationPlanVehicleScheduleInfosCollectionClassFactory({
  CirculationPlanVehicleScheduleInfo,
}: EntityConstructorByEntityClassKey): typeof BimoCirculationPlanVehicleScheduleInfosCollection {
  const childClasses: (typeof Entity)[] = [CirculationPlanVehicleScheduleInfo];

  class CirculationPlanVehicleScheduleInfosCollection extends Collection<
    BimoCirculationPlanVehicleScheduleInfo,
    CirculationPlanVehicleScheduleInfoProps
  > {
    constructor(props: CirculationPlanVehicleScheduleInfosCollectionProps = {}) {
      super({
        itemName: "CirculationPlanVehicleScheduleInfo",
        ItemConstructor: CirculationPlanVehicleScheduleInfo,
        idPropName: `bimoId`,
        labelPropName: `slo`,
        ...props,
      });
    }
  }

  CirculationPlanVehicleScheduleInfosCollection.allChildClasses = getAllChildClasses(childClasses);

  return CirculationPlanVehicleScheduleInfosCollection;
}

export default CirculationPlanVehicleScheduleInfosCollectionClassFactory;
