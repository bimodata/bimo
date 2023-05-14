import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TrainPathVariantDatesCollection as BimoTrainPathVariantDatesCollection } from "../base-types/rawIndex";
export { TrainPathVariantDatesCollection as BimoTrainPathVariantDatesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoTrainPathVariantDate, TrainPathVariantDateProps } from "./TrainPathVariantDate";
export function TrainPathVariantDatesCollectionClassFactory({
  TrainPathVariantDate,
}: EntityConstructorByEntityClassKey): typeof BimoTrainPathVariantDatesCollection{
  
  const childClasses: (typeof Entity)[] = [TrainPathVariantDate];
  
  export interface TrainPathVariantDatesCollectionProps
  extends ExtendedCollectionProps<BimoTrainPathVariantDate, TrainPathVariantDateProps> {}
  
 class TrainPathVariantDatesCollection extends Collection<
    TrainPathVariantDate,
    TrainPathVariantDateProps
  > {
    constructor(props: TrainPathVariantDatesCollectionProps = {}) {
      super({
        itemName: "TrainPathVariantDate",
        ItemConstructor: TrainPathVariantDate,
        associationType: "aggregation",
        ...props,
      });
    }
  
    get self() {
      return this;
    }
  }
  
  TrainPathVariantDatesCollection.allChildClasses = getAllChildClasses(childClasses);
  
  return TrainPathVariantDatesCollection
}

export default TrainPathVariantDatesCollectionClassFactory