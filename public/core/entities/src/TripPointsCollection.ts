import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { TripPoint, TripPointProps } from "./TripPoint";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [TripPoint];

export interface TripPointsCollectionProps
  extends ExtendedCollectionProps<TripPoint, TripPointProps> {}

export class TripPointsCollection extends Collection<TripPoint, TripPointProps> {
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
    return this.map((pt) => `${pt.placeId}${pt.noStopping === "1" ? "~" : "|"}`).join("");
  }

  get longLoggingOutput() {
    return this.map((pt) => pt.shortLoggingOutput).join("\n");
  }
}

TripPointsCollection.allChildClasses = getAllChildClasses(childClasses);

export default TripPointsCollection;
