import { TripTp, TripTpProps } from "./TripTp";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [TripTp];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

export interface TripTpsCollectionProps
  extends ExtendedCollectionProps<TripTp, TripTpProps> {}

export class TripTpsCollection extends Collection<TripTp, TripTpProps> {
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

export default TripTpsCollection;
