import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { TrainPathVariantDatesCollection } from "./TrainPathVariantDatesCollection";
import { TrainPathVariantsCollection } from "./TrainPathVariantsCollection";
export interface TrainPathProps extends ExtendedItemProps {
  trnpIdentifier: string;
  trnpRoute?: string;
  trnpIsInService?: string;
  trnpSchedUnit?: string;
  trainPathVariants?: TrainPathVariantsCollection;
}
export declare class TrainPath extends Item<TrainPath> {
  trnpIdentifier: string;
  trnpRoute?: string;
  trnpIsInService?: string;
  trnpSchedUnit?: string;
  trainPathVariants: TrainPathVariantsCollection;
  constructor(props: TrainPathProps);
  get shortLoggingOutput(): string;
  get allTrainPathDates(): TrainPathVariantDatesCollection;
}
