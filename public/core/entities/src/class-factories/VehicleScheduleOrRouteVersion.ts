import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import {
  VariantItinerariesCollection,
  VariantPointsCollection,
  VehicleScheduleOrRouteVersion as BimoVehicleScheduleOrRouteVersion,
} from "../base-types/rawIndex";
export { VehicleScheduleOrRouteVersion as BimoVehicleScheduleOrRouteVersion } from "../base-types/rawIndex";
import { Item, ExtendedItemProps, ExtendedItem } from "@bimo/core-utils-collection";
import { Collection } from "@bimo/core-utils-collection";
import { get } from "lodash";
import mapsAndSets from "@bimo/core-utils-maps-and-sets";

export interface VehicleScheduleOrRouteVersionProps extends ExtendedItemProps {}

export function VehicleScheduleOrRouteVersionClassFactory({}: EntityConstructorByEntityClassKey): typeof BimoVehicleScheduleOrRouteVersion {
  const pathByTripOrVariantPropNameByTripOrVariantType = {
    trip: { tripsOrVariants: "trips", removeTripOrVariant: "removeTrip" },
    scheduledTrip: { tripsOrVariants: "trips", removeTripOrVariant: "removeTrip" },
    variant: {
      allPoints: "variantPointsCollectionOfAllVariantPointsOfAllRoutes",
      tripsOrVariants: "variantsCollectionOfAllVariantsOfAllRoutes",
      removeTripOrVariant: "removeVariant",
      allItineraries: "variantItinerariesCollectionOfAllItinerariesOfAllRoutes",
    },
  };

  class VehicleScheduleOrRouteVersion<
    ItemType extends ExtendedItem<ItemType>,
    ItemProps extends ExtendedItemProps
  > extends Item<ItemType> {
    _abstract?: any;
    constructor(
      props: VehicleScheduleOrRouteVersionProps,
      tripOrVariantType: "variant" | "trip" | "scheduledTrip"
    ) {
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

    get allPoints(): VariantPointsCollection {
      return get(this, this._abstract.pathByPropName.allPoints);
    }

    get allItineraries(): VariantItinerariesCollection {
      return get(this, this._abstract.pathByPropName.allItineraries);
    }

    get setOfAllPlaceIdentifiers(): Set<string> {
      const allSets = this.tripsOrVariants.map(
        (tripOrVariant) => tripOrVariant.setOfAllPlaceIdentifiers
      );
      return mapsAndSets.mergeSets(...allSets);
    }

    removeTripOrVariant(tripOrVariant: ItemType) {
      const removeFunction = get(
        this,
        this._abstract.pathByPropName.removeTripOrVariant
      ).bind(this);
      return removeFunction(tripOrVariant);
    }
  }

  return VehicleScheduleOrRouteVersion;
}

export default VehicleScheduleOrRouteVersionClassFactory;
