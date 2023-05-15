import { Item, ExtendedItemProps, ExtendedItem } from "@bimo/core-utils-collection";
import { TripOrVariantPoint } from "./TripOrVariantPoint";
import { TripOrVariant } from "./TripOrVariant";
/**
 * Bimo specific class that represents a sub section of a trip or variant
 * A tripOrVariant that does A|B|C|D will have 6 sections:
 * A>D (full tripOrVariant)
 * A>C
 * A>B
 * B>D
 * B>C
 * C>D
 * For x trip points, the number of sections is
 * ((x-1)(x)/2)
 *
 * Initial use case: comparing the distances we have in Hastus with external distances
 * Potential future use cases: combining trips or variants to create longer itineraries
 */
export interface TripOrVariantSectionProps<
  PointType extends ExtendedItem<PointType>,
  PointProps extends ExtendedItemProps
> extends ExtendedItemProps {
  points: TripOrVariantPoint<PointType, PointProps>[];
}
export declare class TripOrVariantSection<
  PointType extends TripOrVariantPoint<PointType, PointProps>,
  PointProps extends ExtendedItemProps,
  TripOrVariantType extends ExtendedItem<TripOrVariantType>,
  TripOrVariantProps extends ExtendedItemProps
> extends Item<
  TripOrVariantSection<PointType, PointProps, TripOrVariantType, TripOrVariantProps>
> {
  points: TripOrVariantPoint<PointType, PointProps>[];
  constructor(props: TripOrVariantSectionProps<PointType, PointProps>);
  get startPoint(): TripOrVariantPoint<PointType, PointProps>;
  get endPoint(): TripOrVariantPoint<PointType, PointProps>;
  get totalDistance(): number;
  get totalDistanceAsString(): string;
  get tripOrVariant():
    | TripOrVariant<TripOrVariantType, TripOrVariantProps, PointType, PointProps>
    | undefined;
  get shortLoggingOutput(): string;
  get mediumLoggingOutput(): string;
  get longLoggingOutput(): string;
}
