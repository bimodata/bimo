import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { VariantItinerary as BimoVariantItinerary } from "../base-types/rawIndex";
export { VariantItinerary as BimoVariantItinerary } from "../base-types/rawIndex";
import { Item } from "@bimo/core-utils-collection";
import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { ExtendedItemProps } from "@bimo/core-utils-collection";

import { BimoVariant } from "./Variant";
import { BimoItinerarySegmentsCollection } from "./ItinerarySegmentsCollection";

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
  itinerarySegments: BimoItinerarySegmentsCollection;
}
export function VariantItineraryClassFactory({
  ItinerarySegmentsCollection,
}: EntityConstructorByEntityClassKey): typeof BimoVariantItinerary {
  const childClasses: (typeof Entity)[] = [ItinerarySegmentsCollection];
  class VariantItinerary extends Item<VariantItinerary> {
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
    itinerarySegments: BimoItinerarySegmentsCollection;
    constructor(props: VariantItineraryProps) {
      super(props);
      this.itnStopStart = gavpfp("itnStopStart", props);
      this.itnStartPlace = gavpfp("itnStartPlace", props);
      this.itnStopEnd = gavpfp("itnStopEnd", props);
      this.itnEndPlace = gavpfp("itnEndPlace", props);
      this.itnCalcDistance = gavpfp("itnCalcDistance", props);
      this.itnEditedDistance = gavpfp("itnEditedDistance", props);
      this.itnType = gavpfp("itnType", props);
      this.varitnSpecificRouteVersionId = gavpfp("varitnSpecificRouteVersionId", props);
      this.varitnSpecificRoute = gavpfp("varitnSpecificRoute", props);
      this.varitnSpecificVariant = gavpfp("varitnSpecificVariant", props);
      this.varitnSpecificDirection = gavpfp("varitnSpecificDirection", props);
      this.varitnBaseInService = gavpfp("varitnBaseInService", props);
      this.itnVerified = gavpfp("itnVerified", props);
      this.itnVerifiedNetworkDistance = gavpfp("itnVerifiedNetworkDistance", props);
      this.itnIgnoreCircAndTurnRestriction = gavpfp(
        "itnIgnoreCircAndTurnRestriction",
        props
      );
      this.itnRoutingInstructionsSpecified = gavpfp(
        "itnRoutingInstructionsSpecified",
        props
      );
      this.itinerarySegments = gavpfp(
        "itinerarySegments",
        props,
        ItinerarySegmentsCollection,
        new ItinerarySegmentsCollection(),
        { altPropName: "itinerary_segment", parent: this }
      );
    }

    get variant() {
      return this.parent && (this.parent.parent as BimoVariant);
    }
  }

  VariantItinerary.allChildClasses = getAllChildClasses(childClasses);

  return VariantItinerary;
}

export default VariantItineraryClassFactory;
