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
  trnpdStatus?: string;
  trnpdStatusOir?: string;
  trnpdIsCanceledOrInfeasible?: string;
}

export function TrainPathVariantDateClassFactory({}: EntityConstructorByEntityClassKey): typeof BimoTrainPathVariantDate {
  class TrainPathVariantDate extends Item<TrainPathVariantDate> {
    trnpdDate?: string;
    trnpdEffectiveDate?: string;
    trnpdStatus?: string;
    _trnpdStatusOir?: string;
    trnpdIsCanceledOrInfeasible?: string;
    constructor(props: TrainPathVariantDateProps) {
      super(props);
      /**
       * TODO: change date and effectiveDate for getters and setters, and infer one from the other
       * and the info from the variant when one is not provided. */
      this.trnpdDate = gavpfp("trnpdDate", props, `string`);
      this.trnpdEffectiveDate = gavpfp("trnpdEffectiveDate", props, `string`);
      this.trnpdStatus = gavpfp("trnpdStatus", props, `string`);
      this._trnpdStatusOir = gavpfp("trnpdStatusOir", props, `string`);
      this.trnpdIsCanceledOrInfeasible = gavpfp(
        "trnpdIsCanceledOrInfeasible",
        props,
        `string`
      );
    }

    get trnpdStatusOir() {
      if (this.trnpdIsCanceledOrInfeasible === "1") return "50";
      if (this._trnpdStatusOir) return this._trnpdStatusOir;
      return this.trnpdStatus;
    }

    set trnpdStatusOir(v) {
      if (v === "50") {
        this.trnpdIsCanceledOrInfeasible = "1";
      } else {
        this.trnpdIsCanceledOrInfeasible = "0";
        this.trnpdStatus = v;
      }
      this._trnpdStatusOir = v;
    }

    get shortLoggingOutput() {
      return this.trnpdEffectiveDate ?? super.slo;
    }
  }

  TrainPathVariantDate.allChildClasses = getAllChildClasses(childClasses);

  return TrainPathVariantDate;
}

export default TrainPathVariantDateClassFactory;
