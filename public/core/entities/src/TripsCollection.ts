import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { Trip, TripProps } from "./Trip";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [Trip];

export interface TripsCollectionProps extends ExtendedCollectionProps<Trip, TripProps> {}

export class TripsCollection extends Collection<Trip, TripProps> {
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

export default TripsCollection;