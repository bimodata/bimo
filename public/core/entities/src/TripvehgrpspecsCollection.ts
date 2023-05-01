import { Tripvehgrpspec, TripvehgrpspecProps } from "./Tripvehgrpspec";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [Tripvehgrpspec];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

export interface TripvehgrpspecsCollectionProps
  extends ExtendedCollectionProps<Tripvehgrpspec, TripvehgrpspecProps> {}

export class TripvehgrpspecsCollection extends Collection<
  Tripvehgrpspec,
  TripvehgrpspecProps
> {
  constructor(props: TripvehgrpspecsCollectionProps = {}) {
    super({
      itemName: "Tripvehgrpspec",
      ItemConstructor: Tripvehgrpspec,
      items: props.items,
      parent: props.parent,
    });
  }
}

TripvehgrpspecsCollection.allChildClasses = getAllChildClasses(childClasses);

export default TripvehgrpspecsCollection;
