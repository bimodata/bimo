import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { TrainPathVariantDatesCollection } from "./TrainPathVariantDatesCollection";
import { TrainPathVariantPointsCollection } from "./TrainPathVariantPointsCollection";
export interface TrainPathVariantProps extends ExtendedItemProps {
  trnpvTrainPathRimId?: string;
  trainPathVariantPoints?: TrainPathVariantPointsCollection;
  trainPathVariantDates?: TrainPathVariantDatesCollection;
}
export declare class TrainPathVariant extends Item<TrainPathVariant> {
  trnpvTrainPathRimId?: string;
  trainPathVariantPoints: TrainPathVariantPointsCollection;
  trainPathVariantDates: TrainPathVariantDatesCollection;
  constructor(props: TrainPathVariantProps);
  get shortLoggingOutput(): string;
  get mediumLoggingOutput(): string;
  get longLoggingOutput(): string;
}
