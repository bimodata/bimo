import { Item, ExtendedItemProps, ExtendedItem } from "@bimo/core-utils-collection";
import { Collection } from "@bimo/core-utils-collection";
import { TripOrVariantSectionsCollection } from "./TripOrVariantSectionsCollection";
import { BimoContext } from "@bimo/core-global-types";
import { Place } from "./Place";
import TripOrVariantPoint from "./TripOrVariantPoint";
export interface TripOrVariantProps extends ExtendedItemProps {
    _abstract?: string;
}
export type TripOrVariantTypeEnum = "trip" | "variant" | "scheduledTrip" | "trainPathVariant";
export declare class TripOrVariant<TripOrVariantType extends ExtendedItem<TripOrVariantType>, TripOrVariantProps extends ExtendedItemProps, PointType extends TripOrVariantPoint<PointType, PointProps>, PointProps extends ExtendedItemProps> extends Item<TripOrVariantType> {
    _abstract?: any;
    constructor(props: TripOrVariantProps, context: BimoContext, tripOrVariantType: TripOrVariantTypeEnum);
    get tripOrVariantType(): any;
    get veryShortOdRefPlaceLabel(): string;
    get shortOdRefPlaceLabel(): string;
    get shortOdTrackPlaceLabel(): string;
    get sortedOdPlaceIdsString(): string;
    get sections(): TripOrVariantSectionsCollection<PointType, PointProps, TripOrVariantType, TripOrVariantProps>;
    get points(): Collection<PointType, PointProps>;
    get setOfAllPlaceIdentifiers(): Set<any>;
    get startPlaceId(): string;
    get endPlaceId(): string;
    get firstPoint(): PointType;
    get lastPoint(): PointType;
    get productive(): string;
    get pointsWithStopping(): PointType[];
    get pointsThatAreTimingPoints(): PointType[];
    get routeId(): string | undefined;
    get variantId(): string;
    get direction(): string;
    get indiceCompo(): string;
    changeStartPlace(newStartPlace: Place | string): void;
    changeEndPlace(newEndPlace: Place | string): void;
}
export default TripOrVariant;
