import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { VariantItinerariesCollection as BimoVariantItinerariesCollection } from "../base-types/rawIndex";
export { VariantItinerariesCollection as BimoVariantItinerariesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoVariantItinerary, VariantItineraryProps } from "./VariantItinerary";
export interface VariantItinerariesCollectionProps
  extends ExtendedCollectionProps<BimoVariantItinerary, VariantItineraryProps> {}

export function VariantItinerariesCollectionClassFactory({
  VariantItinerary,
}: EntityConstructorByEntityClassKey): typeof BimoVariantItinerariesCollection {
  const childClasses: (typeof Entity)[] = [VariantItinerary];

  class VariantItinerariesCollection extends Collection<
    BimoVariantItinerary,
    VariantItineraryProps
  > {
    constructor(props: VariantItinerariesCollectionProps = {}) {
      super({
        itemName: "VariantItinerary",
        ItemConstructor: VariantItinerary,
        items: props.items,
        parent: props.parent,
        associationType: props.associationType,
      });
    }
  }

  VariantItinerariesCollection.allChildClasses = getAllChildClasses(childClasses);

  return VariantItinerariesCollection;
}

export default VariantItinerariesCollectionClassFactory;
