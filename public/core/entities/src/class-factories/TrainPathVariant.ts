import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TrainPathVariant as BimoTrainPathVariant } from "../base-types/rawIndex";
export { TrainPathVariant as BimoTrainPathVariant } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { ExtendedItemProps } from "@bimo/core-utils-collection";

import { BimoTrainPath } from "./TrainPath";
import { BimoTrainPathVariantDate } from "./TrainPathVariantDate";
import { BimoTrainPathVariantDatesCollection } from "./TrainPathVariantDatesCollection";
import { BimoTrainPathVariantPointsCollection } from "./TrainPathVariantPointsCollection";
import {
  BimoTrainPathVariantPoint,
  TrainPathVariantPointProps,
} from "./TrainPathVariantPoint";
import { BimoContext } from "@bimo/core-global-types";

export interface TrainPathVariantProps extends ExtendedItemProps {
  trnpvTrainPathRimId?: string;
  trnpvDateOffset?: string;
  trnpvInternalNumber?: string;
  trainPathVariantPoints?: BimoTrainPathVariantPointsCollection;
  trainPathVariantDates?: BimoTrainPathVariantDatesCollection;
}

export function TrainPathVariantClassFactory({
  TrainPathVariantPointsCollection,
  TrainPathVariantDatesCollection,
  TripOrVariant,
}: EntityConstructorByEntityClassKey): typeof BimoTrainPathVariant {
  const childClasses: (typeof Entity)[] = [
    TrainPathVariantPointsCollection,
    TrainPathVariantDatesCollection,
  ];
  class TrainPathVariant extends TripOrVariant<
    TrainPathVariant,
    TrainPathVariantProps,
    BimoTrainPathVariantPoint,
    TrainPathVariantPointProps
  > {
    trnpvTrainPathRimId?: string;
    trnpvDateOffset?: string;
    trnpvInternalNumber?: string;
    trainPathVariantPoints: BimoTrainPathVariantPointsCollection;
    trainPathVariantDates: BimoTrainPathVariantDatesCollection;
    constructor(props: TrainPathVariantProps, context: BimoContext) {
      super(props, context, "trainPathVariant");

      this.trnpvTrainPathRimId = gavpfp("trnpvTrainPathRimId", props, `string`);
      this.trnpvDateOffset = gavpfp("trnpvDateOffset", props, `string`);
      this.trnpvInternalNumber = gavpfp("trnpvInternalNumber", props, `string`);

      /** @type {TrainPathVariantPointsCollection} */
      this.trainPathVariantPoints = gavpfp(
        "trainPathVariantPoints",
        props,
        TrainPathVariantPointsCollection,
        new TrainPathVariantPointsCollection(),
        { altPropName: "train_path_variant_point", parent: this }
      );
      /** @type {TrainPathVariantDatesCollection} */
      this.trainPathVariantDates = gavpfp(
        "trainPathVariantDates",
        props,
        TrainPathVariantDatesCollection,
        new TrainPathVariantDatesCollection(),
        { altPropName: "train_path_date", parent: this }
      );
    }

    get trainPath() {
      return this.parent && (this.parent.parent as BimoTrainPath);
    }

    get productive() {
      return this.trainPath?.trnpIsInService;
    }

    get routeId() {
      return this.trainPath?.trnpRoute;
    }

    get shortLoggingOutput() {
      return `${this.trnpvTrainPathRimId}: ${this.trainPathVariantPoints.length} points et ${this.trainPathVariantDates.length} dates`;
    }

    get mediumLoggingOutput() {
      return `${this.shortLoggingOutput}
      ----------------------------------
      ${this.trainPathVariantPoints.items.map((item) => item.mediumLoggingOutput)}`;
    }

    get longLoggingOutput() {
      return `${this.mediumLoggingOutput}
      ----------------------------------
      ${this.trainPathVariantDates.items.map((item) => item.mediumLoggingOutput)}`;
    }

    removeDate(trainPathVariantDate: BimoTrainPathVariantDate) {
      this.trainPathVariantDates.remove(trainPathVariantDate);
      this.trainPath?._nullifyCachedValue("allTrainPathDates");
    }
  }

  TrainPathVariant.allChildClasses = getAllChildClasses(childClasses);

  return TrainPathVariant;
}

export default TrainPathVariantClassFactory;
