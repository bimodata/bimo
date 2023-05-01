/* eslint-disable no-unused-vars */
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { get } from "lodash";
import mapsAndSets from "@bimo/core-utils-maps-and-sets";

const pathByTripOrVariantPropNameByTripOrVariantType = {
  trip: { tripsOrVariants: "trips", removeTripOrVariant: "removeTrip" },
  scheduledTrip: { tripsOrVariants: "trips", removeTripOrVariant: "removeTrip" },
  variant: {
    allPoints: "variantPointsCollectionOfAllVariantPointsOfAllRoutes",
    tripsOrVariants: "variantsCollectionOfAllVariantsOfAllRoutes",
    removeTripOrVariant: "removeVariant",
  },
};

/** @template TripOrVariantType */
export interface VehicleScheduleOrRouteVersionProps extends ExtendedItemProps {
  _abstract?: any;
}

export class VehicleScheduleOrRouteVersion<ItemType, ItemProps> extends Item<ItemType> {
  /**
   * @param {Object} props
   * @param {'variant'|'trip'|'scheduledTrip'} tripOrVariantType
   */
  _abstract?: any;
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

  get tripsOrVariants(): Collection<ItemType, ItemProps> {
    return get(this, this._abstract.pathByPropName.tripsOrVariants);
  }

  get allPoints() {
    return get(this, this._abstract.pathByPropName.allPoints);
  }

  get setOfAllPlaceIdentifiers(): Set<string> {
    const allSets = this.tripsOrVariants.map(
      (tripOrVariant) => tripOrVariant.setOfAllPlaceIdentifiers
    );
    return mapsAndSets.mergeSets(...allSets);
  }

  removeTripOrVariant(tripOrVariant) {
    const removeFunction = get(
      this,
      this._abstract.pathByPropName.removeTripOrVariant
    ).bind(this);
    return removeFunction(tripOrVariant);
  }
}

export default VehicleScheduleOrRouteVersion;
