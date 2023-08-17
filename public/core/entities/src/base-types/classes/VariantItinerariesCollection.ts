import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { VariantItinerary, VariantItineraryProps } from "./VariantItinerary";
export interface VariantItinerariesCollectionProps
  extends ExtendedCollectionProps<VariantItinerary, VariantItineraryProps> {}
export declare class VariantItinerariesCollection extends Collection<
  VariantItinerary,
  VariantItineraryProps
> {
  constructor(props?: VariantItinerariesCollectionProps);
  get mediumLoggingOutput(): string;
  get longLoggingOutput(): string;
}
