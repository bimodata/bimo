import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { CirculationDaysCollection } from "./CirculationDaysCollection";
export interface CirculationPeriodProps extends ExtendedItemProps {
  bimoId?: string;
  cirperId?: string;
  cirperPrevPeriodId?: string;
  cirperNextPeriodId?: string;
  circulationDays?: CirculationDaysCollection;
}
export declare class CirculationPeriod extends Item<CirculationPeriod> {
  bimoId?: string;
  cirperId?: string;
  cirperPrevPeriodId?: string;
  cirperNextPeriodId?: string;
  circulationDays?: CirculationDaysCollection;
  constructor(props: CirculationPeriodProps);
  get shortLoggingOutput(): string;
}
