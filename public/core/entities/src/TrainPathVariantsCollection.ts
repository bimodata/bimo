/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { TrainPathVariant, TrainPathVariantProps } from "./TrainPathVariant";

const childClasses = [TrainPathVariant];

export interface TrainPathVariantsCollectionProps
  extends ExtendedCollectionProps<TrainPathVariant, TrainPathVariantProps> {}

export class TrainPathVariantsCollection extends Collection<
  TrainPathVariant,
  TrainPathVariantProps
> {
  constructor(props: TrainPathVariantsCollectionProps = {}) {
    super({
      itemName: "TrainPathVariant",
      ItemConstructor: TrainPathVariant,
      associationType: "composition",
      ...props,
    });
  }

  get self() {
    return this;
  }
}

TrainPathVariantsCollection.allChildClasses = getAllChildClasses(childClasses);

export default TrainPathVariantsCollection;
