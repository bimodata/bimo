import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [];

export interface TrainPathVariantPointProps extends ExtendedItemProps {
  trnpvptPlace: string;
  trnpvptArrivalTime?: string;
  trnpvptLoadTime?: string;
  trnpvptNoStopping?: string;
  trnpvptPassMidnight?: string;
}

export class TrainPathVariantPoint extends Item<TrainPathVariantPoint> {
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

export default TrainPathVariantPoint;
