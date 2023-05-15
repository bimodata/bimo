import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TrainPathVariantPoint as BimoTrainPathVariantPoint } from "../base-types/rawIndex";
export { TrainPathVariantPoint as BimoTrainPathVariantPoint } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

export interface TrainPathVariantPointProps extends ExtendedItemProps {
  trnpvptPlace: string;
  trnpvptArrivalTime?: string;
  trnpvptLoadTime?: string;
  trnpvptNoStopping?: string;
  trnpvptPassMidnight?: string;
}

export function TrainPathVariantPointClassFactory({}: EntityConstructorByEntityClassKey): typeof BimoTrainPathVariantPoint {
  const childClasses: (typeof Entity)[] = [];

  class TrainPathVariantPoint extends Item<TrainPathVariantPoint> {
    trnpvptPlace: string;
    trnpvptArrivalTime?: string;
    trnpvptLoadTime?: string;
    trnpvptNoStopping?: string;
    trnpvptPassMidnight?: string;
    constructor(props: TrainPathVariantPointProps) {
      super(props);

      this.trnpvptPlace = gavpfp("trnpvptPlace", props, `string`);
      this.trnpvptArrivalTime = gavpfp("trnpvptArrivalTime", props, `string`);
      this.trnpvptLoadTime = gavpfp("trnpvptLoadTime", props, `string`);
      this.trnpvptNoStopping = gavpfp("trnpvptNoStopping", props, `string`);
      this.trnpvptPassMidnight = gavpfp("trnpvptPassMidnight", props, `string`);
    }

    get shortLoggingOutput() {
      return (
        `${this.trnpvptPlace} (A:${this.trnpvptArrivalTime},` +
        ` L:${this.trnpvptLoadTime}, noStopping:${this.trnpvptNoStopping}, passMidnight:${this.trnpvptPassMidnight})`
      );
    }
  }

  TrainPathVariantPoint.allChildClasses = getAllChildClasses(childClasses);

  return TrainPathVariantPoint;
}

export default TrainPathVariantPointClassFactory;
