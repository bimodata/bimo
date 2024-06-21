import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { CirculationPeriod } from "./CirculationPeriod";
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
export declare class CirculationDay extends Item<CirculationDay> {
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
  constructor(props: CirculationDayProps);
  get circulationPeriod(): CirculationPeriod | undefined;
  get shortLoggingOutput(): string;
}
