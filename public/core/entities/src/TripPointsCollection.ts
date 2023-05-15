import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TripPointsCollection as BimoTripPointsCollection } from "../base-types/rawIndex";
export { TripPointsCollection as BimoTripPointsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BimoTripPoint, TripPointProps } from "./TripPoint";
export interface TripPointsCollectionProps
  extends ExtendedCollectionProps<BimoTripPoint, TripPointProps> {}

export function TripPointsCollectionClassFactory({
  TripPoint,
}: EntityConstructorByEntityClassKey): typeof BimoTripPointsCollection {
  const childClasses: (typeof Entity)[] = [TripPoint];

  class TripPointsCollection extends Collection<BimoTripPoint, TripPointProps> {
    constructor(props: TripPointsCollectionProps = {}) {
      super({
        itemName: "TripPoint",
        ItemConstructor: TripPoint,
        ...props,
      });
    }

    sortByTime() {
      try {
        this.items.sort(
          (trpptA, trpptB) =>
            trpptA.getTimeAsDuration().as("second") -
            trpptB.getTimeAsDuration().as("second")
        );
      } catch (error) {
        const newError = new Error(
          `Error while sorting these trip points:\n${this.longLoggingOutput}\n${error.message}`
        );
        throw newError;
      }
    }

    get mediumLoggingOutput() {
      return this.map((pt) => `${pt.placeId}${pt.noStopping === "1" ? "~" : "|"}`).join(
        ""
      );
    }

    get longLoggingOutput() {
      return this.map((pt) => pt.shortLoggingOutput).join("\n");
    }
  }

  TripPointsCollection.allChildClasses = getAllChildClasses(childClasses);

  return TripPointsCollection;
}

export default TripPointsCollectionClassFactory;
