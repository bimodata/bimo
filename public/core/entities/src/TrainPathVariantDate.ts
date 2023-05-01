import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

const childClasses = [];

export interface TrainPathVariantDateProps extends ExtendedItemProps {
  trnpdEffectiveDate?: string;
  trnpdStatusOir?: string;
}

export class TrainPathVariantDate extends Item<TrainPathVariantDate> {
  trnpdEffectiveDate?: string;
  trnpdStatusOir?: string;
  constructor(props: TrainPathVariantDateProps) {
    super(props);

    this.trnpdEffectiveDate = gavpfp("trnpdEffectiveDate", props, `string`);
    this.trnpdStatusOir = gavpfp("trnpdStatusOir", props, `string`);
  }

  get shortLoggingOutput() {
    return this.trnpdEffectiveDate ?? super.slo;
  }
}

TrainPathVariantDate.allChildClasses = getAllChildClasses(childClasses);

export default TrainPathVariantDate;
