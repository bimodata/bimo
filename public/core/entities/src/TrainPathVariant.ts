import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';
import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { TrainPathVariantDatesCollection, TrainPathVariantDatesCollectionProps } from "./TrainPathVariantDatesCollection";
import { TrainPathVariantPointsCollection, TrainPathVariantPointsCollectionProps } from "./TrainPathVariantPointsCollection";

const childClasses = [TrainPathVariantPointsCollection, TrainPathVariantDatesCollection];

export interface TrainPathVariantProps extends ExtendedItemProps {
  trnpvTrainPathRimId?: string;
  trainPathVariantPoints?: string;
  trainPathVariantDates?: string;
}

export class TrainPathVariant extends Item<TrainPathVariant> {
  trnpvTrainPathRimId?: string;
  trainPathVariantPoints?: string;
  trainPathVariantDates?: string;
  constructor(props: TrainPathVariantProps) {
    super(props);

    this.trnpvTrainPathRimId = gavpfp('trnpvTrainPathRimId', props, `string`);

    /* Children */
    /** @type {TrainPathVariantPointsCollection} */
    this.trainPathVariantPoints = gavpfp(
      'trainPathVariantPoints', props,
      TrainPathVariantPointsCollection,
      new TrainPathVariantPointsCollection(),
      { altPropName: 'train_path_variant_point', parent: this },
    );
    /** @type {TrainPathVariantDatesCollection} */
    this.trainPathVariantDates = gavpfp(
      'trainPathVariantDates', props,
      TrainPathVariantDatesCollection,
      new TrainPathVariantDatesCollection(),
      { altPropName: 'train_path_date', parent: this },
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



export default TrainPathVariant;
