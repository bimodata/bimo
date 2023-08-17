import { ExtendedItemProps } from "@bimo/core-utils-collection";
import { Item } from "@bimo/core-utils-collection";
import { VariantItinerary } from "./VariantItinerary";

export interface ItinerarySegmentProps extends ExtendedItemProps {
  isegSegmentExternalId?: string;
  isegSide?: string;
  isegDirection?: string;
}

export declare class ItinerarySegment extends Item<ItinerarySegment> {
  isegSegmentExternalId?: string;
  isegSide?: string;
  isegDirection?: string;
  constructor(props: ItinerarySegmentProps);
  get itinerary(): VariantItinerary | undefined;
}
