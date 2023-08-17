import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ItinerarySegmentsCollection as BimoItinerarySegmentsCollection } from "../base-types/rawIndex";
export { ItinerarySegmentsCollection as BimoItinerarySegmentsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoItinerarySegment, ItinerarySegmentProps } from "./ItinerarySegment";
export interface ItinerarySegmentsCollectionProps
  extends ExtendedCollectionProps<BimoItinerarySegment, ItinerarySegmentProps> {}

export function ItinerarySegmentsCollectionClassFactory({
  ItinerarySegment,
}: EntityConstructorByEntityClassKey): typeof BimoItinerarySegmentsCollection {
  const childClasses: (typeof Entity)[] = [ItinerarySegment];

  class ItinerarySegmentsCollection extends Collection<
    BimoItinerarySegment,
    ItinerarySegmentProps
  > {
    constructor(props: ItinerarySegmentsCollectionProps = {}) {
      super({
        itemName: "ItinerarySegment",
        ItemConstructor: ItinerarySegment,
        items: props.items,
        parent: props.parent,
        associationType: props.associationType,
      });
    }
  }

  ItinerarySegmentsCollection.allChildClasses = getAllChildClasses(childClasses);

  return ItinerarySegmentsCollection;
}

export default ItinerarySegmentsCollectionClassFactory;
