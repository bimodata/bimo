import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { SchedulingUnitDate, SchedulingUnitDateProps } from "./SchedulingUnitDate";
export interface SchedulingUnitDatesCollectionProps
  extends ExtendedCollectionProps<SchedulingUnitDate, SchedulingUnitDateProps> {}
export declare class SchedulingUnitDatesCollection extends Collection<
  SchedulingUnitDate,
  SchedulingUnitDateProps
> {
  constructor(props: SchedulingUnitDatesCollectionProps);
}
