import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TrainPathVariantPointsCollection as BimoTrainPathVariantPointsCollection } from "../base-types/rawIndex";
export { TrainPathVariantPointsCollection as BimoTrainPathVariantPointsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import {
  BimoTrainPathVariantPoint,
  TrainPathVariantPointProps,
} from "./TrainPathVariantPoint";

export interface TrainPathVariantPointsCollectionProps
  extends ExtendedCollectionProps<
    BimoTrainPathVariantPoint,
    TrainPathVariantPointProps
  > {}

export function TrainPathVariantPointsCollectionClassFactory({
  TrainPathVariantPoint,
}: EntityConstructorByEntityClassKey): typeof BimoTrainPathVariantPointsCollection {
  const childClasses: (typeof Entity)[] = [TrainPathVariantPoint];

  class TrainPathVariantPointsCollection extends Collection<
    BimoTrainPathVariantPoint,
    TrainPathVariantPointProps
  > {
    constructor(props: TrainPathVariantPointsCollectionProps = {}) {
      super({
        itemName: "TrainPathVariantPoint",
        ItemConstructor: TrainPathVariantPoint,
        associationType: "aggregation",
        ...props,
      });
    }

    get self() {
      return this;
    }
  }

  TrainPathVariantPointsCollection.allChildClasses = getAllChildClasses(childClasses);

  return TrainPathVariantPointsCollection;
}

export default TrainPathVariantPointsCollectionClassFactory;
