import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TrainPathVariantDate as BimoTrainPathVariantDate } from "../base-types/rawIndex";
export { TrainPathVariantDate as BimoTrainPathVariantDate } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

const childClasses: (typeof Entity)[] = [];

export interface TrainPathVariantDateProps extends ExtendedItemProps {
  trnpdDate?: string;
  trnpdEffectiveDate?: string;
  trnpdStatusOir?: string;
}

export function TrainPathVariantDateClassFactory({}: EntityConstructorByEntityClassKey): typeof BimoTrainPathVariantDate {
  class TrainPathVariantDate extends Item<TrainPathVariantDate> {
    trnpdDate?: string;
    trnpdEffectiveDate?: string;
    trnpdStatusOir?: string;
    constructor(props: TrainPathVariantDateProps) {
      super(props);
      /**
       * TODO: change date and effectiveDate for getters and setters, and infer one from the other
       * and the info from the variant when one is not provided. */
      this.trnpdDate = gavpfp("trnpdDate", props, `string`);
      this.trnpdEffectiveDate = gavpfp("trnpdEffectiveDate", props, `string`);
      this.trnpdStatusOir = gavpfp("trnpdStatusOir", props, `string`);
    }

    get shortLoggingOutput() {
      return this.trnpdEffectiveDate ?? super.slo;
    }
  }

  TrainPathVariantDate.allChildClasses = getAllChildClasses(childClasses);

  return TrainPathVariantDate;
}

export default TrainPathVariantDateClassFactory;
