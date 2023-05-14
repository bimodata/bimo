import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TripvehgrpspecsCollection as BimoTripvehgrpspecsCollection } from "../base-types/rawIndex";
export { TripvehgrpspecsCollection as BimoTripvehgrpspecsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { BimoTripvehgrpspec, TripvehgrpspecProps } from "./Tripvehgrpspec";
export function TripvehgrpspecsCollectionClassFactory({
  Tripvehgrpspec,
}: EntityConstructorByEntityClassKey): typeof BimoTripvehgrpspecsCollection{
  
  const childClasses: (typeof Entity)[] = [Tripvehgrpspec];
  import { getAllChildClasses } from "@bimo/core-utils-serialization";
  import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
  
  export interface TripvehgrpspecsCollectionProps
  extends ExtendedCollectionProps<BimoTripvehgrpspec, TripvehgrpspecProps> {}
  
 class TripvehgrpspecsCollection extends Collection<
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
  
  return TripvehgrpspecsCollection
}

export default TripvehgrpspecsCollectionClassFactory