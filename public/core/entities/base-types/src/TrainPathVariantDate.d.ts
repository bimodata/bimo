import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface TrainPathVariantDateProps extends ExtendedItemProps {
    trnpdEffectiveDate?: string;
    trnpdStatusOir?: string;
}
export declare class TrainPathVariantDate extends Item<TrainPathVariantDate> {
    trnpdEffectiveDate?: string;
    trnpdStatusOir?: string;
    constructor(props: TrainPathVariantDateProps);
    get shortLoggingOutput(): string;
}
export default TrainPathVariantDate;
