import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TrainPathVariantPoint as BimoTrainPathVariantPoint } from "../base-types/rawIndex";
export { TrainPathVariantPoint as BimoTrainPathVariantPoint } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { ExtendedItemProps } from "@bimo/core-utils-collection";
import {
  hastusHoursAndMinutesToDuration,
  addTimeObjectToHastusExtendedHoursString,
  durationToHastusExtendedHoursString,
} from "@bimo/core-utils-time-and-date";

export interface TrainPathVariantPointProps extends ExtendedItemProps {
  trnpvptPlace: string;
  trnpvptArrivalTime?: string;
  trnpvptLoadTime?: string;
  trnpvptNoStopping?: string;
  trnpvptPassMidnight?: string;
}

export function TrainPathVariantPointClassFactory({
  TripOrVariantPoint,
}: EntityConstructorByEntityClassKey): typeof BimoTrainPathVariantPoint {
  const childClasses: (typeof Entity)[] = [];

  class TrainPathVariantPoint extends TripOrVariantPoint<
    TrainPathVariantPoint,
    TrainPathVariantPointProps
  > {
    trnpvptPlace: string;
    trnpvptArrivalTime: string;
    trnpvptLoadTime?: string;
    trnpvptNoStopping?: string;
    trnpvptPassMidnight?: string;
    constructor(props: TrainPathVariantPointProps) {
      super(props, "trainPathVariant");

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

    /** In Hastus extended hours format */
    get arrivalTime(): string {
      if (this.trnpvptPassMidnight === "0") return this.trnpvptArrivalTime;
      return addTimeObjectToHastusExtendedHoursString(this.trnpvptArrivalTime, {
        hours: 24,
      });
    }

    get departureTime(): string {
      if (!this.trnpvptLoadTime) return this.arrivalTime;
      return durationToHastusExtendedHoursString(
        this.getTimeAsDuration("arrival", false).plus(
          hastusHoursAndMinutesToDuration(this.trnpvptLoadTime)
        )
      );
    }

    // eslint-disable-next-line class-methods-use-this
    get isTimingPoint() {
      return "1";
    }

    // eslint-disable-next-line class-methods-use-this
    get allowLoadTime() {
      return "1";
    }
  }

  TrainPathVariantPoint.allChildClasses = getAllChildClasses(childClasses);

  return TrainPathVariantPoint;
}

export default TrainPathVariantPointClassFactory;
