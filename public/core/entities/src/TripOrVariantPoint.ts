/* eslint-disable class-methods-use-this */

import {
  Item,
  ExtendedItem,
  ExtendedItemProps,
  Collection,
} from "@bimo/core-utils-collection";

import { get, set } from "lodash";

import { Place } from "./Place";

const pathByTripOrVariantPropNameByTripOrVariantType = {
  trip: {
    isTimingPoint: "trpptIsTimingPoint",
    placeId: "placeId",
    originalPlaceId: "trpptInternalOriginalPlaceId",
    variantId: "trpptVariantId",
    noStopping: "trpptNoStopping",
    allowLoadTime: "trpptInternalAllowLoadTime",
    tpDistance: "trpptTpDistance",
    distance: "trpptDistance",
    arrivalTime: "trpptInternalArrivalTime",
    departureTime: "trpptInternalDepartureTime",

    // Todo: move this to a SNCF specific TripOrVariant
    codeCs: "trpptCodeCs",
  },
  variant: {
    isTimingPoint: "varptIsTimingPoint",
    placeId: "varptPlace",
    originalPlaceId: "originalPlaceId",
    variantId: "variantId",
    noStopping: "varptNoStopping",
    allowLoadTime: "varptAllowLoadTime",
    tpDistance: "varptTpDistance",
    distance: "varptDistance",
    // arrivalTime: null,
    // departureTime: null,

    // Todo: move this to a SNCF specific TripOrVariant
    codeCs: "varptCodeCs",
  },
};

export class TripOrVariantPoint<
  PointType extends ExtendedItem<PointType>,
  PointProps extends ExtendedItemProps
> extends Item<PointType> {
  _abstract?: any;
  declare parent?: Collection<PointType, PointProps>;
  constructor(props: PointProps, tripOrVariantType: "variant" | "trip") {
    super(props);
    this._abstract = {
      /* Not sure about the "abstract" name ... the idea is just to easily tell serialieModel to ignore these keys */
      tripOrVariantType,
      pathByPropName: pathByTripOrVariantPropNameByTripOrVariantType[tripOrVariantType],
    };
  }

  get isTimingPoint(): string {
    return get(this, this._abstract.pathByPropName.isTimingPoint);
  }

  set isTimingPoint(v) {
    set(this, this._abstract.pathByPropName.isTimingPoint, v);
  }

  get placeId(): string {
    return get(this, this._abstract.pathByPropName.placeId);
  }

  set placeId(v) {
    set(this, this._abstract.pathByPropName.placeId, v);
  }

  get place(): Place {
    if (!this.context?.placesCollection)
      throw new Error(
        `context.placesCollection must be set to get place on tripOrVariantPoint`
      );
    const place = this.context.placesCollection.getByBusinessId(this.placeId);
    if (!place)
      throw new Error(
        `${this.placeId} not found in ${this.context.placesCollection.slo}`
      );
    return place;
  }

  get originalPlaceId(): string | undefined {
    return get(this, this._abstract.pathByPropName.originalPlaceId);
  }

  set originalPlaceId(v) {
    set(this, this._abstract.pathByPropName.originalPlaceId, v);
  }

  get variantId(): string | undefined {
    return get(this, this._abstract.pathByPropName.variantId);
  }

  set variantId(v) {
    set(this, this._abstract.pathByPropName.variantId, v);
  }

  get noStopping(): string {
    return get(this, this._abstract.pathByPropName.noStopping);
  }

  set noStopping(v) {
    set(this, this._abstract.pathByPropName.noStopping, v);
  }

  get allowLoadTime(): string {
    return get(this, this._abstract.pathByPropName.allowLoadTime);
  }

  set allowLoadTime(v) {
    set(this, this._abstract.pathByPropName.allowLoadTime, v);
  }

  get tpDistance(): string {
    return get(this, this._abstract.pathByPropName.tpDistance);
  }

  set tpDistance(v) {
    set(this, this._abstract.pathByPropName.tpDistance, v);
  }

  get distance(): string {
    return get(this, this._abstract.pathByPropName.distance);
  }

  set distance(v) {
    set(this, this._abstract.pathByPropName.distance, v);
  }

  get arrivalTime(): string {
    return get(this, this._abstract.pathByPropName.arrivalTime);
  }

  set arrivalTime(v) {
    const path = this._abstract.pathByPropName.arrivalTime;
    if (!path) return;
    set(this, this._abstract.pathByPropName.arrivalTime, v);
  }

  get departureTime(): string {
    return get(this, this._abstract.pathByPropName.departureTime);
  }

  set departureTime(v) {
    const path = this._abstract.pathByPropName.departureTime;
    if (!path) return;
    set(this, this._abstract.pathByPropName.departureTime, v);
  }

  // Todo: move this to a SNCF specific TripOrVariant
  get codeCs(): string {
    return get(this, this._abstract.pathByPropName.codeCs);
  }

  // Todo: move this to a SNCF specific TripOrVariant
  set codeCs(v) {
    set(this, this._abstract.pathByPropName.codeCs, v);
  }

  get rank() {
    //@ts-ignore
    return this.parent.items.indexOf(this) + 1;
  }

  get isFirst() {
    //@ts-ignore
    return this.parent.first === this;
  }

  get isLast() {
    //@ts-ignore
    return this.parent.last === this;
  }

  get isFirstOrLast() {
    return this.isFirst || this.isLast;
  }
}

export default TripOrVariantPoint;
