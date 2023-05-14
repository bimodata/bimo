import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TripTpsCollection as BimoTripTpsCollection } from "../base-types/rawIndex";
export { TripTpsCollection as BimoTripTpsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { BimoTripTp, TripTpProps } from "./TripTp";

import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

export interface TripTpsCollectionProps
  extends ExtendedCollectionProps<BimoTripTp, TripTpProps> {}

export function TripTpsCollectionClassFactory({
  TripTp,
}: EntityConstructorByEntityClassKey): typeof BimoTripTpsCollection {
  const childClasses: (typeof Entity)[] = [TripTp];

  class TripTpsCollection extends Collection<BimoTripTp, TripTpProps> {
    constructor(props: TripTpsCollectionProps = {}) {
      super({
        itemName: "TripTp",
        ItemConstructor: TripTp,
        items: props.items,
        parent: props.parent,
      });
    }
  }

  TripTpsCollection.allChildClasses = getAllChildClasses(childClasses);

  return TripTpsCollection;
}

export default TripTpsCollectionClassFactory;
