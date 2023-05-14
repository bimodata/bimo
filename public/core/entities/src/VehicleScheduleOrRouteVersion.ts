import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { VehicleScheduleOrRouteVersion as BimoVehicleScheduleOrRouteVersion } from "../base-types/rawIndex";
export { VehicleScheduleOrRouteVersion as BimoVehicleScheduleOrRouteVersion } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
/* eslint-disable no-unused-vars */
import { Item, ExtendedItemProps, ExtendedItem } from "@bimo/core-utils-collection";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { get } from "lodash";
import mapsAndSets from "@bimo/core-utils-maps-and-sets";
import { BimoTripOrVariant, TripOrVariantProps } from "./TripOrVariant";
export function VehicleScheduleOrRouteVersionClassFactory({
  TripOrVariant,
}: EntityConstructorByEntityClassKey): typeof BimoVehicleScheduleOrRouteVersion{
  
  const pathByTripOrVariantPropNameByTripOrVariantType = {
    trip: { tripsOrVariants: "trips", removeTripOrVariant: "removeTrip" },
    scheduledTrip: { tripsOrVariants: "trips", removeTripOrVariant: "removeTrip" },
    variant: {
      allPoints: "variantPointsCollectionOfAllVariantPointsOfAllRoutes",
      tripsOrVariants: "variantsCollectionOfAllVariantsOfAllRoutes",
      removeTripOrVariant: "removeVariant",
    },
  };
  
  export interface VehicleScheduleOrRouteVersionProps extends ExtendedItemProps {}
  
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
  
    get allPoints() {
      return get(this, this._abstract.pathByPropName.allPoints);
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
  
  return VehicleScheduleOrRouteVersion
}

export default VehicleScheduleOrRouteVersionClassFactory