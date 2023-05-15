import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { TrainPathVariantDate, TrainPathVariantDateProps } from "./TrainPathVariantDate";
export interface TrainPathVariantDatesCollectionProps
  extends ExtendedCollectionProps<TrainPathVariantDate, TrainPathVariantDateProps> {}
export declare class TrainPathVariantDatesCollection extends Collection<
  TrainPathVariantDate,
  TrainPathVariantDateProps
> {
  constructor(props?: TrainPathVariantDatesCollectionProps);
  get self(): this;
}
