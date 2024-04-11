import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { PassengerLoadTripsCollection as BimoPassengerLoadTripsCollection } from "../base-types/rawIndex";
export { PassengerLoadTripsCollection as BimoPassengerLoadTripsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { BimoPassengerLoadTrip, PassengerLoadTripProps } from "./PassengerLoadTrip";

import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

export interface PassengerLoadTripsCollectionProps
  extends ExtendedCollectionProps<BimoPassengerLoadTrip, PassengerLoadTripProps> {}

export function PassengerLoadTripsCollectionClassFactory({
  PassengerLoadTrip,
}: EntityConstructorByEntityClassKey): typeof BimoPassengerLoadTripsCollection {
  const childClasses: (typeof Entity)[] = [PassengerLoadTrip];

  class PassengerLoadTripsCollection extends Collection<
    BimoPassengerLoadTrip,
    PassengerLoadTripProps
  > {
    constructor(props: PassengerLoadTripsCollectionProps = {}) {
      super({
        itemName: "PassengerLoadTrip",
        ItemConstructor: PassengerLoadTrip,
        items: props.items,
        parent: props.parent,
      });
    }
  }

  PassengerLoadTripsCollection.allChildClasses = getAllChildClasses(childClasses);

  return PassengerLoadTripsCollection;
}

export default PassengerLoadTripsCollectionClassFactory;
