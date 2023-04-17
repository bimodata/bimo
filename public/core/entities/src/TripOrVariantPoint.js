/* eslint-disable class-methods-use-this */

const { Item } = require('@bimo/core-utils-collection');

const { get, set } = require('lodash');

const pathByTripOrVariantPropNameByTripOrVariantType = {
  trip: {
    isTimingPoint: 'trpptIsTimingPoint',
    placeId: 'placeId',
    originalPlaceId: 'trpptInternalOriginalPlaceId',
    variantId: 'trpptVariantId',
    noStopping: 'trpptNoStopping',
    allowLoadTime: 'trpptInternalAllowLoadTime',
    tpDistance: 'trpptTpDistance',
    distance: 'trpptDistance',
    arrivalTime: 'trpptInternalArrivalTime',
    departureTime: 'trpptInternalDepartureTime',

    // Todo: move this to a SNCF specific TripOrVariant
    codeCs: 'trpptCodeCs',
  },
  variant: {
    isTimingPoint: 'varptIsTimingPoint',
    placeId: 'varptPlace',
    originalPlaceId: 'originalPlaceId',
    variantId: 'variantId',
    noStopping: 'varptNoStopping',
    allowLoadTime: 'varptAllowLoadTime',
    tpDistance: 'varptTpDistance',
    distance: 'varptDistance',
    arrivalTime: undefined,
    departureTime: undefined,

    // Todo: move this to a SNCF specific TripOrVariant
    codeCs: 'varptCodeCs',
  },
};

class TripOrVariantPoint extends Item {
  /**
   * @param {Object} props
   * @param {'variant'|'trip'} tripOrVariantType
   */
  constructor(props, tripOrVariantType) {
    super(props);
    this._abstract = {
      /* Not sure about the "abstract" name ... the idea is just to easily tell serialieModel to ignore these keys */
      tripOrVariantType,
      pathByPropName: pathByTripOrVariantPropNameByTripOrVariantType[tripOrVariantType],
    };
  }

  /** @type {string} */
  get isTimingPoint() {
    return get(this, this._abstract.pathByPropName.isTimingPoint);
  }

  set isTimingPoint(v) {
    set(this, this._abstract.pathByPropName.isTimingPoint, v);
  }

  /** @type {string} */
  get placeId() {
    return get(this, this._abstract.pathByPropName.placeId);
  }

  set placeId(v) {
    set(this, this._abstract.pathByPropName.placeId, v);
  }

  /** @type {import ('./Place')} */
  get place() {
    if (!this.context?.placesCollection) throw new Error(`context.placesCollection must be set to get place on tripOrVariantPoint`);
    const place = this.context.placesCollection.getByBusinessId(this.placeId);
    if (!place) throw new Error(`${this.placeId} not found in ${this.context.placesCollection.slo}`);
    return place;
  }

  /** @type {string} */
  get originalPlaceId() {
    return get(this, this._abstract.pathByPropName.originalPlaceId);
  }

  set originalPlaceId(v) {
    set(this, this._abstract.pathByPropName.originalPlaceId, v);
  }

  /** @type {string} */
  get variantId() {
    return get(this, this._abstract.pathByPropName.variantId);
  }

  set variantId(v) {
    set(this, this._abstract.pathByPropName.variantId, v);
  }

  /** @type {string} */
  get noStopping() {
    return get(this, this._abstract.pathByPropName.noStopping);
  }

  set noStopping(v) {
    set(this, this._abstract.pathByPropName.noStopping, v);
  }

  /** @type {string} */
  get allowLoadTime() {
    return get(this, this._abstract.pathByPropName.allowLoadTime);
  }

  set allowLoadTime(v) {
    set(this, this._abstract.pathByPropName.allowLoadTime, v);
  }

  /** @type {string} */
  get tpDistance() {
    return get(this, this._abstract.pathByPropName.tpDistance);
  }

  set tpDistance(v) {
    set(this, this._abstract.pathByPropName.tpDistance, v);
  }

  /** @type {string} */
  get distance() {
    return get(this, this._abstract.pathByPropName.distance);
  }

  set distance(v) {
    set(this, this._abstract.pathByPropName.distance, v);
  }

  /** @type {string} */
  get arrivalTime() {
    return get(this, this._abstract.pathByPropName.arrivalTime);
  }

  set arrivalTime(v) {
    const path = this._abstract.pathByPropName.arrivalTime;
    if (!path) return;
    set(this, this._abstract.pathByPropName.arrivalTime, v);
  }

  /** @type {string} */
  get departureTime() {
    return get(this, this._abstract.pathByPropName.departureTime);
  }

  set departureTime(v) {
    const path = this._abstract.pathByPropName.departureTime;
    if (!path) return;
    set(this, this._abstract.pathByPropName.departureTime, v);
  }

  // Todo: move this to a SNCF specific TripOrVariant
  /** @type {string} */
  get codeCs() {
    return get(this, this._abstract.pathByPropName.codeCs);
  }

  // Todo: move this to a SNCF specific TripOrVariant
  set codeCs(v) {
    set(this, this._abstract.pathByPropName.codeCs, v);
  }

  /** @type {number} */
  get rank() {
    return this.parent.items.indexOf(this) + 1;
  }

  /** @type {boolean} */
  get isFirst() {
    return this.parent.first === this;
  }

  /** @type {boolean} */
  get isLast() {
    return this.parent.last === this;
  }

  /** @type {boolean} */
  get isFirstOrLast() {
    return this.isFirst || this.isLast;
  }
}

module.exports = TripOrVariantPoint;
