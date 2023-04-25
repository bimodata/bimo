/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { getAllChildClasses } from '@bimo/core-utils-serialization';

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { TrainPathVariantPoint, TrainPathVariantPointProps } from "./TrainPathVariantPoint";

const childClasses = [TrainPathVariantPoint];


export interface TrainPathVariantPointsCollectionProps extends ExtendedCollectionProps<TrainPathVariantPoint, TrainPathVariantPointProps> {
}

export class TrainPathVariantPointsCollection extends Collection<TrainPathVariantPoint, TrainPathVariantPointProps> {
  constructor(props: TrainPathVariantPointsCollectionProps = {}) {
    super({
      itemName: 'TrainPathVariantPoint',
      ItemConstructor: TrainPathVariantPoint,
      associationType: 'aggregation',
      ...props,
    });
  }

  get self() {
    return this;
  }
}

TrainPathVariantPointsCollection.allChildClasses = getAllChildClasses(childClasses);



export default TrainPathVariantPointsCollection;
