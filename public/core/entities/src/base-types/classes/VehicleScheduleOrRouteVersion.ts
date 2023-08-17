import { Item, ExtendedItemProps, ExtendedItem } from "@bimo/core-utils-collection";
import { Collection } from "@bimo/core-utils-collection";
import { VariantItinerariesCollection } from "./VariantItinerariesCollection";
import { VariantPointsCollection } from "./VariantPointsCollection";
export interface VehicleScheduleOrRouteVersionProps extends ExtendedItemProps {}
export declare class VehicleScheduleOrRouteVersion<
  ItemType extends ExtendedItem<ItemType>,
  ItemProps extends ExtendedItemProps
> extends Item<ItemType> {
  _abstract?: any;
  constructor(
    props: VehicleScheduleOrRouteVersionProps,
    tripOrVariantType: "variant" | "trip" | "scheduledTrip"
  );
  get tripOrVariantType(): any;
  get tripsOrVariants(): Collection<ItemType, ItemProps>;
  get allPoints(): VariantPointsCollection;
  get allItineraries(): VariantItinerariesCollection;
  get setOfAllPlaceIdentifiers(): Set<string>;
  removeTripOrVariant(tripOrVariant: ItemType): any;
}
