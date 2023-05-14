import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TrainPathVariantPointsCollection as BimoTrainPathVariantPointsCollection } from "../base-types/rawIndex";
export { TrainPathVariantPointsCollection as BimoTrainPathVariantPointsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import {
  TrainPathVariantPoint,
  TrainPathVariantPointProps,
} from "./TrainPathVariantPoint";

const childClasses: (typeof Entity)[] = [TrainPathVariantPoint];

export interface TrainPathVariantPointsCollectionProps
  extends ExtendedCollectionProps<BimoTrainPathVariantPoint, TrainPathVariantPointProps> {}

export function TrainPathVariantPointsCollectionClassFactory(entityConstructorByEntityClassKey: EntityConstructorByEntityClassKey): typeof BimoTrainPathVariantPointsCollection{
 class TrainPathVariantPointsCollection extends Collection<
    TrainPathVariantPoint,
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
  
  return TrainPathVariantPointsCollection
}

export default TrainPathVariantPointsCollectionClassFactory