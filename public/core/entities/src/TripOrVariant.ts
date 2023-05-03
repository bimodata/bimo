/* eslint-disable no-unused-vars */
import { Item, ExtendedItemProps, ExtendedItem } from "@bimo/core-utils-collection";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { get } from "lodash";
import {
  TripOrVariantSectionsCollection,
  TripOrVariantSectionsCollectionProps,
} from "./TripOrVariantSectionsCollection";
import computeTripOrVariantSectionsOfTripOrVariant from "./subs/computeTripOrVariantSectionsOfTripOrVariant";
import { BimoContext } from "@bimo/core-global-types";
import { Place } from "./Place";
import TripOrVariantPoint from "./TripOrVariantPoint";

const pathByTripOrVariantPropNameByTripOrVariantType = {
  trip: {
    points: "tripPoints",
    productive: "productive",
    direction: "trpDirection",
    routeId: "trpRoute",
    variantId: "trpViaVariant",
  },
  variant: {
    points: "variantPoints",
    productive: "varProductive",
    direction: "varDirection",
    routeId: "routeId",
    indiceCompo: "varIndiceCompo",
    variantId: "varIdentifier",
  },
  scheduledTrip: {
    points: "tripPoints",
    productive: "productive",
    direction: "trpDirection",
    routeId: "trpRoute",
    variantId: "trpViaVariant",
  },
  trainPathVariant: {
    points: "trainPathVariantPoints",
    // TODO: complete
  },
};

export interface TripOrVariantProps extends ExtendedItemProps {
  _abstract?: string;
}

export type TripOrVariantTypeEnum =
  | "trip"
  | "variant"
  | "scheduledTrip"
  | "trainPathVariant";

export class TripOrVariant<
  TripOrVariantType extends ExtendedItem<TripOrVariantType>,
  TripOrVariantProps extends ExtendedItemProps,
  PointType extends TripOrVariantPoint<PointType, PointProps>,
  PointProps extends ExtendedItemProps
> extends Item<TripOrVariantType> {
  _abstract?: any;
  constructor(
    props: TripOrVariantProps,
    context: BimoContext,
    tripOrVariantType: TripOrVariantTypeEnum
  ) {
    super(props, context);
    this._abstract = {
      /* Not sure about the "abstract" name ... the idea is just to easily tell serialieModel to ignore these keys */
      tripOrVariantType,
      pathByPropName: pathByTripOrVariantPropNameByTripOrVariantType[tripOrVariantType],
    };
  }

  get tripOrVariantType() {
    return this._abstract.tripOrVariantType;
  }

  get veryShortOdRefPlaceLabel() {
    return `${this.firstPoint.place.referencePlace?.veryShortLabel}>${this.lastPoint.place.referencePlace?.veryShortLabel}`;
  }

  get shortOdRefPlaceLabel() {
    return `${this.firstPoint.place.referencePlace?.shortLabel}->${this.lastPoint.place.referencePlace?.shortLabel}`;
  }

  get shortOdTrackPlaceLabel() {
    return `${this.firstPoint.place.shortLabel} -> ${this.lastPoint.place.shortLabel}`;
  }

  get sortedOdPlaceIdsString() {
    if (this.firstPoint.placeId < this.lastPoint.placeId) {
      return `${this.firstPoint.placeId}${this.lastPoint.placeId}`;
    }
    return `${this.lastPoint.placeId}${this.firstPoint.placeId}`;
  }

  get sections(): TripOrVariantSectionsCollection<
    PointType,
    PointProps,
    TripOrVariantType,
    TripOrVariantProps
  > {
    return computeTripOrVariantSectionsOfTripOrVariant<
      TripOrVariantType,
      TripOrVariantProps,
      PointType,
      PointProps
    >(this);
  }

  get points(): Collection<PointType, PointProps> {
    return get(this, this._abstract.pathByPropName.points);
  }

  get setOfAllPlaceIdentifiers() {
    return new Set(this.points.map((point) => point.placeId));
  }

  get startPlaceId(): string {
    return this.firstPoint.placeId;
  }

  get endPlaceId(): string {
    return this.lastPoint.placeId;
  }

  get firstPoint(): PointType {
    return this.points.first;
  }

  get lastPoint(): PointType {
    return this.points.last;
  }

  get productive(): string {
    return get(this, this._abstract.pathByPropName.productive);
  }

  get pointsWithStopping(): PointType[] {
    return this.points.pick((point) => point.noStopping === "0");
  }

  get pointsThatAreTimingPoints(): PointType[] {
    return this.points.pick((point) => point.isTimingPoint === "1");
  }

  get routeId(): string | undefined {
    return get(this, this._abstract.pathByPropName.routeId);
  }

  get variantId(): string {
    return get(this, this._abstract.pathByPropName.variantId);
  }

  get direction(): string {
    return get(this, this._abstract.pathByPropName.direction);
  }

  get indiceCompo(): string {
    return get(this, this._abstract.pathByPropName.indiceCompo);
  }

  changeStartPlace(newStartPlace: Place | string) {
    throw new Error(
      `changeStartPlace method should be implemented in ${this.tripOrVariantType}`
    );
  }

  changeEndPlace(newEndPlace: Place | string) {
    throw new Error(
      `changeEndPlace method should be implemented in ${this.tripOrVariantType}`
    );
  }
}

export default TripOrVariant;
