/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { getAllChildClasses } from '@bimo/core-utils-serialization';

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { TrainPathVariantDate, TrainPathVariantDateProps } from "./TrainPathVariantDate";

const childClasses = [TrainPathVariantDate];


export interface TrainPathVariantDatesCollectionProps extends ExtendedCollectionProps<TrainPathVariantDate, TrainPathVariantDateProps> {
}

export class TrainPathVariantDatesCollection extends Collection<TrainPathVariantDate, TrainPathVariantDateProps> {
  constructor(props: TrainPathVariantDatesCollectionProps = {}) {
    super({
      itemName: 'TrainPathVariantDate',
      ItemConstructor: TrainPathVariantDate,
      associationType: 'aggregation',
      ...props,
    });
  }

  get self() {
    return this;
  }
}

TrainPathVariantDatesCollection.allChildClasses = getAllChildClasses(childClasses);



export default TrainPathVariantDatesCollection;
