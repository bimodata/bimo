import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface TrainPathVariantDateProps extends ExtendedItemProps {
  trnpdDate?: string;
  trnpdEffectiveDate?: string;
  trnpdStatusOir?: string;
}
export declare class TrainPathVariantDate extends Item<TrainPathVariantDate> {
  trnpdDate?: string;
  trnpdEffectiveDate?: string;
  trnpdStatusOir?: string;
  constructor(props: TrainPathVariantDateProps);
  get shortLoggingOutput(): string;
}
