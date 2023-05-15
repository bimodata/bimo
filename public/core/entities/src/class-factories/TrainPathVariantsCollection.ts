import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TrainPathVariantsCollection as BimoTrainPathVariantsCollection } from "../base-types/rawIndex";
export { TrainPathVariantsCollection as BimoTrainPathVariantsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoTrainPathVariant, TrainPathVariantProps } from "./TrainPathVariant";

export interface TrainPathVariantsCollectionProps
  extends ExtendedCollectionProps<BimoTrainPathVariant, TrainPathVariantProps> {}

export function TrainPathVariantsCollectionClassFactory({
  TrainPathVariant,
}: EntityConstructorByEntityClassKey): typeof BimoTrainPathVariantsCollection {
  const childClasses: (typeof Entity)[] = [TrainPathVariant];

  class TrainPathVariantsCollection extends Collection<
    BimoTrainPathVariant,
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
  }

  TrainPathVariantsCollection.allChildClasses = getAllChildClasses(childClasses);

  return TrainPathVariantsCollection;
}

export default TrainPathVariantsCollectionClassFactory;
