import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TrainPathVariantDatesCollection as BimoTrainPathVariantDatesCollection } from "../base-types/rawIndex";
export { TrainPathVariantDatesCollection as BimoTrainPathVariantDatesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import {
  BimoTrainPathVariantDate,
  TrainPathVariantDateProps,
} from "./TrainPathVariantDate";

export interface TrainPathVariantDatesCollectionProps
  extends ExtendedCollectionProps<BimoTrainPathVariantDate, TrainPathVariantDateProps> {}

export function TrainPathVariantDatesCollectionClassFactory({
  TrainPathVariantDate,
}: EntityConstructorByEntityClassKey): typeof BimoTrainPathVariantDatesCollection {
  const childClasses: (typeof Entity)[] = [TrainPathVariantDate];

  class TrainPathVariantDatesCollection extends Collection<
    BimoTrainPathVariantDate,
    TrainPathVariantDateProps
  > {
    constructor(props: TrainPathVariantDatesCollectionProps = {}) {
      super({
        itemName: "TrainPathVariantDate",
        ItemConstructor: TrainPathVariantDate,
        associationType: "composition",
        ...props,
      });
    }
  }

  TrainPathVariantDatesCollection.allChildClasses = getAllChildClasses(childClasses);

  return TrainPathVariantDatesCollection;
}

export default TrainPathVariantDatesCollectionClassFactory;
