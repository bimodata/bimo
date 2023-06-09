import { BimoContext } from "@bimo/core-global-types";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { TrainPath } from "./TrainPath";
import { TrainPathVariantDate } from "./TrainPathVariantDate";
import { TrainPathVariantDatesCollection } from "./TrainPathVariantDatesCollection";
import { TrainPathVariantPointsCollection } from "./TrainPathVariantPointsCollection";
export interface TrainPathVariantProps extends ExtendedItemProps {
  trnpvTrainPathRimId?: string;
  trnpvDateOffset?: string;
  trnpvInternalNumber?: string;
  trainPathVariantPoints?: TrainPathVariantPointsCollection;
  trainPathVariantDates?: TrainPathVariantDatesCollection;
}
export declare class TrainPathVariant extends Item<TrainPathVariant> {
  trnpvTrainPathRimId?: string;
  trnpvDateOffset?: string;
  trnpvInternalNumber?: string;
  trainPathVariantPoints: TrainPathVariantPointsCollection;
  trainPathVariantDates: TrainPathVariantDatesCollection;
  constructor(props: TrainPathVariantProps, context: BimoContext);
  get shortLoggingOutput(): string;
  get mediumLoggingOutput(): string;
  get longLoggingOutput(): string;
  get trainPath(): TrainPath | undefined;
  get productive(): string | undefined;
  get routeId(): string | undefined;
  removeDate(trainPathVariantDate: TrainPathVariantDate): void;
}
