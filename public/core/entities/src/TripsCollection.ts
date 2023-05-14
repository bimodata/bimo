import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TripsCollection as BimoTripsCollection } from "../base-types/rawIndex";
export { TripsCollection as BimoTripsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoTrip, TripProps } from "./Trip";

export interface TripsCollectionProps
  extends ExtendedCollectionProps<BimoTrip, TripProps> {}

export function TripsCollectionClassFactory({
  Trip,
}: EntityConstructorByEntityClassKey): typeof BimoTripsCollection {
  const childClasses: any[] = [Trip];

  class TripsCollection extends Collection<BimoTrip, TripProps> {
    constructor(props: TripsCollectionProps = {}) {
      super({
        itemName: "Trip",
        ItemConstructor: Trip,
        idPropName: `bimoId`,
        businessIdPropName: `trpIntNumber`,
        labelPropName: `shortLoggingOutput`,
        ...props,
      });
    }

    /**
     * Groups all the trips of the collection by trip number
     * @returns {Map<String, Trip[]>} a map of trips arrays, indexed by trip number
     */
    get tripsByTripNumber() {
      return this.groupByProp(`trpNumber`);
    }

    get mediumLoggingOutput() {
      return this.map((trip) => trip.shortLoggingOutput).join("\n");
    }
  }

  TripsCollection.allChildClasses = getAllChildClasses(childClasses);

  return TripsCollection;
}

export default TripsCollectionClassFactory;
