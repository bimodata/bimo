import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TrainPathVariant as BimoTrainPathVariant } from "../base-types/rawIndex";
export { TrainPathVariant as BimoTrainPathVariant } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import {
  TrainPathVariantDatesCollection,
  TrainPathVariantDatesCollectionProps,
} from "./TrainPathVariantDatesCollection";
import {
  TrainPathVariantPointsCollection,
  TrainPathVariantPointsCollectionProps,
} from "./TrainPathVariantPointsCollection";

const childClasses: (typeof Entity)[] = [
  TrainPathVariantPointsCollection,
  TrainPathVariantDatesCollection,
];

export interface TrainPathVariantProps extends ExtendedItemProps {
  trnpvTrainPathRimId?: string;
  trainPathVariantPoints?: TrainPathVariantPointsCollection;
  trainPathVariantDates?: TrainPathVariantDatesCollection;
}

export function TrainPathVariantClassFactory(entityConstructorByEntityClassKey: EntityConstructorByEntityClassKey): typeof BimoTrainPathVariant{
 class TrainPathVariant extends Item<TrainPathVariant> {
    trnpvTrainPathRimId?: string;
    trainPathVariantPoints: TrainPathVariantPointsCollection;
    trainPathVariantDates: TrainPathVariantDatesCollection;
    constructor(props: TrainPathVariantProps) {
      super(props);
  
      this.trnpvTrainPathRimId = gavpfp("trnpvTrainPathRimId", props, `string`);
  
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
  }
  
  TrainPathVariant.allChildClasses = getAllChildClasses(childClasses);
  
  return TrainPathVariant
}

export default TrainPathVariantClassFactory