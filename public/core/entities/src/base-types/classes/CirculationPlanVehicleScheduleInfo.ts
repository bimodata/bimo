import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
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
export declare class CirculationPlanVehicleScheduleInfo extends Item<CirculationPlanVehicleScheduleInfo> {
  bimoId?: string;
  cirpvscinfoDay?: string;
  cirpvscinfoName?: string;
  cirpvscinfoScenario?: string;
  cirpvscinfoBooking?: string;
  cirpvscinfoType?: string;
  cirpvscinfoEvents?: string;
  cirpvscinfoStatus?: string;
  constructor(props: CirculationPlanVehicleScheduleInfoProps);
}
