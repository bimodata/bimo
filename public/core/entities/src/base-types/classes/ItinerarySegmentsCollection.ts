import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ItinerarySegment, ItinerarySegmentProps } from "./ItinerarySegment";
export interface ItinerarySegmentsCollectionProps
  extends ExtendedCollectionProps<ItinerarySegment, ItinerarySegmentProps> {}
export declare class ItinerarySegmentsCollection extends Collection<
  ItinerarySegment,
  ItinerarySegmentProps
> {
  constructor(props?: ItinerarySegmentsCollectionProps);
  get mediumLoggingOutput(): string;
  get longLoggingOutput(): string;
}
