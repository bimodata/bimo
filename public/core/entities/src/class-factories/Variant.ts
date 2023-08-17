import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { Variant as BimoVariant } from "../base-types/rawIndex";
export { Variant as BimoVariant } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { ExtendedItemProps } from "@bimo/core-utils-collection";
import { BimoContext } from "@bimo/core-global-types";

import { BimoVariantPointsCollection } from "./VariantPointsCollection";
import { BimoVariantPoint, VariantPointProps } from "./VariantPoint";
import { BimoRoute } from "./Route";
import { BimoPlace } from "./Place";
import { BimoVariantItinerariesCollection } from "./VariantItinerariesCollection";

export interface VariantProps extends ExtendedItemProps {
  bimoId?: string;
  varIdentifier?: string;
  varDescription?: string;
  varDirection?: string;
  varReversible?: string;
  varUsualTermin?: string;
  varDestinationNote?: string;
  varProductive?: string;
  varPriority?: string;
  varAllowDeviationFromTrackNetwork?: string;
  variantPoints: BimoVariantPointsCollection;
  variantItineraries: BimoVariantItinerariesCollection;
}
export function VariantClassFactory({
  TripOrVariant,
  VariantPointsCollection,
  VariantItinerariesCollection,
}: EntityConstructorByEntityClassKey): typeof BimoVariant {
  const childClasses: (typeof Entity)[] = [
    VariantPointsCollection,
    VariantItinerariesCollection,
  ];

  class Variant extends TripOrVariant<
    Variant,
    VariantProps,
    BimoVariantPoint,
    VariantPointProps
  > {
    bimoId?: string;
    varIdentifier: string;
    varDescription?: string;
    varDirection?: string;
    varReversible?: string;
    varUsualTermin?: string;
    varDestinationNote?: string;
    varProductive?: string;
    varPriority: string;
    varAllowDeviationFromTrackNetwork?: string;
    variantPoints: BimoVariantPointsCollection;
    variantItineraries: BimoVariantItinerariesCollection;
    _links: { [linkType: string]: any } = {};
    constructor(props: VariantProps, context: BimoContext) {
      super(props, context, "variant");
      this.bimoId = gavpfp("bimoId", props);
      this.varIdentifier = gavpfp("varIdentifier", props);
      this.varDescription = gavpfp("varDescription", props);
      this.varDirection = gavpfp("varDirection", props);
      this.varReversible = gavpfp("varReversible", props);
      this.varUsualTermin = gavpfp("varUsualTermin", props);
      this.varDestinationNote = gavpfp("varDestinationNote", props);
      this.varProductive = gavpfp("varProductive", props);
      this.varPriority = gavpfp("varPriority", props);
      this.varAllowDeviationFromTrackNetwork = gavpfp(
        "varAllowDeviationFromTrackNetwork",
        props,
        "string",
        "0"
      );

      this.variantPoints = gavpfp(
        "variantPoints",
        props,
        VariantPointsCollection,
        new VariantPointsCollection(),
        { altPropName: "variant_point", parent: this }
      );

      this.variantItineraries = gavpfp(
        "variantItineraries",
        props,
        VariantItinerariesCollection,
        new VariantItinerariesCollection(),
        { altPropName: "variant_itinerary", parent: this }
      );
    }

    addLink(type: string, value: any) {
      this._links[type] = value;
    }

    getLink(type: string) {
      return this._links[type];
    }

    removeLink(type: string) {
      delete this._links[type];
    }

    removeFromCurrentRoute() {
      if (!this.route) return;
      this.route.variants.remove(this);
    }

    /** Creates a new instance of a variant. All variantPoints are new instances too. */
    copy(newVarIdentifier = this.varIdentifier) {
      // @ts-ignore
      const copiedVariant = new this.constructor(this, this.context);
      copiedVariant.varIdentifier = newVarIdentifier;
      const copiedVariantPoints = this.variantPoints.map((varPt) => varPt.copy());
      copiedVariant.variantPoints = new VariantPointsCollection({
        items: copiedVariantPoints,
      });
      copiedVariant.addLink("copiedFrom", this);
      return copiedVariant;
    }

    get route() {
      return this.parent && (this.parent.parent as BimoRoute);
    }

    get routeId() {
      return this.route?.rteIdentifier;
    }

    /** key of the form '${route.rteIdentifier}|${varIdentifier}' or null if either is null    */
    get routeAndVariantKey() {
      if (!this.route || !this.route.rteIdentifier || !this.varIdentifier) return null;
      return `${this.route.rteIdentifier}|${this.varIdentifier}`;
    }

    get routeVersion() {
      return this.route?.routeVersion;
    }

    get shortLoggingOutput() {
      return `${this.varIdentifier} (${this.varDescription}) {${this.varDirection}}`;
    }

    get mediumLoggingOutput() {
      return `${this.shortLoggingOutput} [${this.variantPoints.length}] route: ${
        this.route && this.route.shortLoggingOutput
      }`;
    }

    get longLoggingOutput() {
      return `${this.mediumLoggingOutput} ${this.variantPoints.mediumLoggingOutput}`;
    }

    get veryLongLoggingOutput() {
      return `${this.mediumLoggingOutput}\n${this.variantPoints.longLoggingOutput}`;
    }

    get varIdRouteIdAndVersionId() {
      return `${this.varIdentifier} / ${this.routeId} / ${
        this.routeVersion?.rtevIdentifier ?? "no routeVersion"
      }`;
    }

    get isProductive() {
      return this.varProductive === "1";
    }

    changeStartPlace(newStartPlace: BimoPlace | string) {
      const placeIdentifier =
        typeof newStartPlace === `string` ? newStartPlace : newStartPlace.plcIdentifier;
      this.firstPoint.varptPlace = placeIdentifier;
    }

    changeEndPlace(newEndPlace: BimoPlace | string) {
      const placeIdentifier =
        typeof newEndPlace === `string` ? newEndPlace : newEndPlace.plcIdentifier;
      this.lastPoint.varptPlace = placeIdentifier;
    }

    /* eslint-disable no-param-reassign */
    usesOneOfThesePlaces(listOfPlaces: string | Set<string> | string[]) {
      if (!listOfPlaces) {
        return undefined;
      }
      if (listOfPlaces.constructor.name !== "Set") {
        if (!Array.isArray(listOfPlaces)) {
          listOfPlaces = [listOfPlaces as string];
        }
        listOfPlaces = new Set(listOfPlaces);
      }
      return this.variantPoints.some((variantPoint) =>
        (listOfPlaces as Set<string>).has(variantPoint.varptPlace)
      );
    }

    updatePlacesAndReturnListOfChanges(newPlaceIdByOldPlaceId: {
      [oldPlaceId: string]: string;
    }) {
      if (!newPlaceIdByOldPlaceId || typeof newPlaceIdByOldPlaceId !== "object") {
        return undefined;
      }
      const listOfChanges: { old: string; new: string }[] = [];
      this.variantPoints.forEach((variantPoint) => {
        const newPlaceId = newPlaceIdByOldPlaceId[variantPoint.varptPlace];
        if (newPlaceId) {
          listOfChanges.push({ old: variantPoint.varptPlace, new: newPlaceId });
          variantPoint.varptPlace = newPlaceId;
        }
      });
      return listOfChanges;
    }
    /* eslint-enable no-param-reassign */
  }

  Variant.hastusKeywords = ["rvariant"];
  Variant.hastusObject = "variant";

  Variant.allChildClasses = getAllChildClasses(childClasses);

  return Variant;
}

export default VariantClassFactory;
