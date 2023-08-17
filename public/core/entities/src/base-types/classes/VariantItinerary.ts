import { ExtendedItemProps } from "@bimo/core-utils-collection";
import { Item } from "@bimo/core-utils-collection";
import { ItinerarySegmentsCollection } from "./ItinerarySegmentsCollection";
import { Variant } from "./Variant";

export interface VariantItineraryProps extends ExtendedItemProps {
  itnStopStart?: string;
  itnStartPlace?: string;
  itnStopEnd?: string;
  itnEndPlace?: string;
  itnCalcDistance?: string;
  itnEditedDistance?: string;
  itnType?: string;
  varitnSpecificRouteVersionId?: string;
  varitnSpecificRoute?: string;
  varitnSpecificVariant?: string;
  varitnSpecificDirection?: string;
  varitnBaseInService?: string;
  itnVerified?: string;
  itnVerifiedNetworkDistance?: string;
  itnIgnoreCircAndTurnRestriction?: string;
  itnRoutingInstructionsSpecified?: string;
  itinerarySegments: ItinerarySegmentsCollection;
}

export declare class VariantItinerary extends Item<VariantItinerary> {
  itnStopStart?: string;
  itnStartPlace?: string;
  itnStopEnd?: string;
  itnEndPlace?: string;
  itnCalcDistance?: string;
  itnEditedDistance?: string;
  itnType?: string;
  varitnSpecificRouteVersionId?: string;
  varitnSpecificRoute?: string;
  varitnSpecificVariant?: string;
  varitnSpecificDirection?: string;
  varitnBaseInService?: string;
  itnVerified?: string;
  itnVerifiedNetworkDistance?: string;
  itnIgnoreCircAndTurnRestriction?: string;
  itnRoutingInstructionsSpecified?: string;
  itinerarySegments: ItinerarySegmentsCollection;
  constructor(props: VariantItineraryProps);
  get variant(): Variant | undefined;
}
