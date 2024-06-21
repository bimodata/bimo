import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { CirculationPlanVehicleScheduleInfo as BimoCirculationPlanVehicleScheduleInfo } from "../base-types/rawIndex";
export { CirculationPlanVehicleScheduleInfo as BimoCirculationPlanVehicleScheduleInfo } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

const childClasses: (typeof Entity)[] = [];

export interface CirculationPlanVehicleScheduleInfoProps extends ExtendedItemProps {
  bimoId?: string;
  cirpvscinfoDay?: string;
  cirpvscinfoName?: string;
  cirpvscinfoScenario?: string;
  cirpvscinfoBooking?: string;
  cirpvscinfoType?: string;
  cirpvscinfoEvents?: string;
  cirpvscinfoStatus?: string;
}

export function CirculationPlanVehicleScheduleInfoClassFactory(
  entityConstructorByEntityClassKey: EntityConstructorByEntityClassKey
): typeof BimoCirculationPlanVehicleScheduleInfo {
  class CirculationPlanVehicleScheduleInfo extends Item<CirculationPlanVehicleScheduleInfo> {
    bimoId?: string;
    cirpvscinfoDay?: string;
    cirpvscinfoName?: string;
    cirpvscinfoScenario?: string;
    cirpvscinfoBooking?: string;
    cirpvscinfoType?: string;
    cirpvscinfoEvents?: string;
    cirpvscinfoStatus?: string;
    constructor(props: CirculationPlanVehicleScheduleInfoProps) {
      super(props);
      this.bimoId = gavpfp("bimoId", props);
      this.cirpvscinfoDay = gavpfp("cirpvscinfoDay", props, `string`);
      this.cirpvscinfoName = gavpfp("cirpvscinfoName", props, `string`);
      this.cirpvscinfoScenario = gavpfp("cirpvscinfoScenario", props, `string`);
      this.cirpvscinfoBooking = gavpfp("cirpvscinfoBooking", props, `string`);
      this.cirpvscinfoType = gavpfp("cirpvscinfoType", props, `string`);
      this.cirpvscinfoEvents = gavpfp("cirpvscinfoEvents", props, `string`);
      this.cirpvscinfoStatus = gavpfp("cirpvscinfoStatus", props, `string`);
    }

  }

  CirculationPlanVehicleScheduleInfo.hastusKeywords = ["circulation_plan_vehicle_schedule_info"];
  CirculationPlanVehicleScheduleInfo.hastusObject = "circulation_plan_vehicle_schedule_info";

  CirculationPlanVehicleScheduleInfo.allChildClasses = getAllChildClasses(childClasses);

  return CirculationPlanVehicleScheduleInfo;
}

export default CirculationPlanVehicleScheduleInfoClassFactory;
