/* eslint-disable no-unused-vars */
const { Item } = require('@bimo/core-utils-collection');
const Collection = require('@bimo/core-utils-collection/src/Collection');
const { get } = require('lodash');
const computeTripOrVariantSectionsOfTripOrVariant = require('./subs/computeTripOrVariantSectionsOfTripOrVariant');

const TripOrVariantClassFactory = ({ TripOrVariantSectionsCollection }) => {
  const pathByTripOrVariantPropNameByTripOrVariantType = {
    trip: {
      points: 'tripPoints',
      productive: 'productive',
      direction: 'trpDirection',
      routeId: 'trpRoute',
      variantId: 'trpViaVariant',
    },
    variant: {
      points: 'variantPoints',
      productive: 'varProductive',
      direction: 'varDirection',
      routeId: 'routeId',
      indiceCompo: 'varIndiceCompo',
      variantId: 'varIdentifier',
    },
    scheduledTrip: {
      points: 'tripPoints',
      productive: 'productive',
      direction: 'trpDirection',
      routeId: 'trpRoute',
      variantId: 'trpViaVariant',
    },
  };

  /** @template PointType */
  class TripOrVariant extends Item {
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

    get tripOrVariantType() {
      return this._abstract.tripOrVariantType;
    }

    get veryShortOdRefPlaceLabel() {
      return `${this.firstPoint.place.referencePlace.veryShortLabel}>${this.lastPoint.place.referencePlace.veryShortLabel}`;
    }

    get shortOdRefPlaceLabel() {
      return `${this.firstPoint.place.referencePlace.shortLabel}->${this.lastPoint.place.referencePlace.shortLabel}`;
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

    /** @type {TripOrVariantSectionsCollection} */
    get sections() {
      return computeTripOrVariantSectionsOfTripOrVariant(this);
    }

    /** @type {Collection<PointType>} */
    get points() {
      return get(this, this._abstract.pathByPropName.points);
    }

    get setOfAllPlaceIdentifiers() {
      return new Set(this.points.map((point) => point.placeId));
    }

    /** @type {String} */
    get startPlaceId() {
      return this.firstPoint.placeId;
    }

    /** @type {String} */
    get endPlaceId() {
      return this.lastPoint.placeId;
    }

    /** @type {PointType} */
    get firstPoint() {
      return this.points.first;
    }

    /** @type {PointType} */
    get lastPoint() {
      return this.points.last;
    }

    /** @type {String} */
    get productive() {
      return get(this, this._abstract.pathByPropName.productive);
    }

    /** @type {PointType[]} */
    get pointsWithStopping() {
      return this.points.pick((point) => point.noStopping === '0');
    }

    /** @type {PointType[]} */
    get pointsThatAreTimingPoints() {
      return this.points.pick((point) => point.isTimingPoint === '1');
    }

    /** @type {string} */
    get routeId() {
      return get(this, this._abstract.pathByPropName.routeId);
    }

    /** @type {string} */
    get variantId() {
      return get(this, this._abstract.pathByPropName.variantId);
    }

    /** @type {String} */
    get direction() {
      return get(this, this._abstract.pathByPropName.direction);
    }

    /** @type {String} */
    get indiceCompo() {
      return get(this, this._abstract.pathByPropName.indiceCompo);
    }

    /**
     *
     * @param {import ('./Place')|string} newStartPlace
     */
    changeStartPlace(newStartPlace) {
      throw new Error(`changeStartPlace method should be implemented in ${this.tripOrVariantType}`);
    }

    /**
     *
     * @param {import ('./Place')|string} newEndPlace
     */
    changeEndPlace(newEndPlace) {
      throw new Error(`changeEndPlace method should be implemented in ${this.tripOrVariantType}`);
    }

    copy() {
      throw new Error(`copy method should be implemented in ${this.tripOrVariantType}`);
    }
  }

  return TripOrVariant;
};

module.exports = TripOrVariantClassFactory;
