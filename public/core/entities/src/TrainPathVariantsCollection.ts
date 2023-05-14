import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TrainPathVariantsCollection as BimoTrainPathVariantsCollection } from "../base-types/rawIndex";
export { TrainPathVariantsCollection as BimoTrainPathVariantsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoTrainPathVariant, TrainPathVariantProps } from "./TrainPathVariant";
export function TrainPathVariantsCollectionClassFactory({
  TrainPathVariant,
}: EntityConstructorByEntityClassKey): typeof BimoTrainPathVariantsCollection{
  
  const childClasses: (typeof Entity)[] = [TrainPathVariant];
  
  export interface TrainPathVariantsCollectionProps
  extends ExtendedCollectionProps<BimoTrainPathVariant, TrainPathVariantProps> {}
  
 class TrainPathVariantsCollection extends Collection<
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
  
  return TrainPathVariantsCollection
}

export default TrainPathVariantsCollectionClassFactory