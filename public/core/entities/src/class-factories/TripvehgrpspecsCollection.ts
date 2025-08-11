import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import {
  TripvehgrpspecsCollection as BimoTripvehgrpspecsCollection,
  Tripvehgrpspec as BimoTripvehgrpspec,
} from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { TripvehgrpspecProps } from "./Tripvehgrpspec";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

export interface TripvehgrpspecsCollectionProps
  extends ExtendedCollectionProps<BimoTripvehgrpspec, TripvehgrpspecProps> {}

export function TripvehgrpspecsCollectionClassFactory({
  Tripvehgrpspec,
}: EntityConstructorByEntityClassKey): typeof BimoTripvehgrpspecsCollection {
  const childClasses: (typeof Entity)[] = [Tripvehgrpspec];

  class TripvehgrpspecsCollection extends Collection<
    BimoTripvehgrpspec,
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

  return TripvehgrpspecsCollection;
}

export default TripvehgrpspecsCollectionClassFactory;
