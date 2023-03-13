/* eslint-disable no-unused-vars */
const Item = require('@bimo/core-utils-item');
const Collection = require('@bimo/core-utils-collection/src/Collection');
const { get } = require('lodash');
const mapsAndSets = require('@bimo/core-utils-maps-and-sets');

const pathByTripOrVariantPropNameByTripOrVariantType = {
  trip: { tripsOrVariants: 'trips', removeTripOrVariant: 'removeTrip' },
  scheduledTrip: { tripsOrVariants: 'trips', removeTripOrVariant: 'removeTrip' },
  variant: {
    allPoints: 'variantPointsCollectionOfAllVariantPointsOfAllRoutes',
    tripsOrVariants: 'variantsCollectionOfAllVariantsOfAllRoutes',
    removeTripOrVariant: 'removeVariant',
  },
};

/** @template TripOrVariantType */
const VehicleScheduleOrRouteVersionClassFactory = () => {
  class VehicleScheduleOrRouteVersion extends Item {
    /**
     * @param {Object} props
     * @param {'variant'|'trip'|'scheduledTrip'} tripOrVariantType
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

    /** @type {Collection<TripOrVariantType>} */
    get tripsOrVariants() {
      return get(this, this._abstract.pathByPropName.tripsOrVariants);
    }

    get allPoints() {
      return get(this, this._abstract.pathByPropName.allPoints);
    }

    /**
     * @returns {Set<string>}
     */
    get setOfAllPlaceIdentifiers() {
      const allSets = this.tripsOrVariants.map((tripOrVariant) => tripOrVariant.setOfAllPlaceIdentifiers);
      return mapsAndSets.mergeSets(...allSets);
    }

    removeTripOrVariant(tripOrVariant) {
      const removeFunction = get(this, this._abstract.pathByPropName.removeTripOrVariant).bind(this);
      return removeFunction(tripOrVariant);
    }
  }

  return VehicleScheduleOrRouteVersion;
};

module.exports = VehicleScheduleOrRouteVersionClassFactory;
