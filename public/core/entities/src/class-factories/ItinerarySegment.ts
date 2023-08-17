import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ItinerarySegment as BimoItinerarySegment } from "../base-types/rawIndex";
export { ItinerarySegment as BimoItinerarySegment } from "../base-types/rawIndex";
import { Item } from "@bimo/core-utils-collection";
import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { ExtendedItemProps } from "@bimo/core-utils-collection";

import { BimoVariantItinerary } from "./VariantItinerary";

export interface ItinerarySegmentProps extends ExtendedItemProps {
  isegSegmentExternalId?: string;
  isegSide?: string;
  isegDirection?: string;
}
export function ItinerarySegmentClassFactory({}: EntityConstructorByEntityClassKey): typeof BimoItinerarySegment {
  class ItinerarySegment extends Item<ItinerarySegment> {
    isegSegmentExternalId?: string;
    isegSide?: string;
    isegDirection?: string;
    constructor(props: ItinerarySegmentProps) {
      super(props);
      this.isegSegmentExternalId = gavpfp("isegSegmentExternalId", props);
      this.isegSide = gavpfp("isegSide", props);
      this.isegDirection = gavpfp("isegDirection", props);
    }

    get itinerary() {
      return this.parent && (this.parent.parent as BimoVariantItinerary);
    }
  }

  ItinerarySegment.allChildClasses = getAllChildClasses(childClasses);

  return ItinerarySegment;
}

export default ItinerarySegmentClassFactory;
