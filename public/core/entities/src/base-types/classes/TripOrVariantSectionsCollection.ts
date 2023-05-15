import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ExtendedItemProps, ExtendedItem } from "@bimo/core-utils-collection";
import { TripOrVariantSection, TripOrVariantSectionProps } from "./TripOrVariantSection";
import { TripOrVariantPoint } from "./TripOrVariantPoint";
export interface TripOrVariantSectionsCollectionProps<
  PointType extends TripOrVariantPoint<PointType, PointProps>,
  PointProps extends ExtendedItemProps,
  TripOrVariantType extends ExtendedItem<TripOrVariantType>,
  TripOrVariantProps extends ExtendedItemProps
> extends ExtendedCollectionProps<
    TripOrVariantSection<PointType, PointProps, TripOrVariantType, TripOrVariantProps>,
    TripOrVariantSectionProps<PointType, PointProps>
  > {}
export declare class TripOrVariantSectionsCollection<
  PointType extends TripOrVariantPoint<PointType, PointProps>,
  PointProps extends ExtendedItemProps,
  TripOrVariantType extends ExtendedItem<TripOrVariantType>,
  TripOrVariantProps extends ExtendedItemProps
> extends Collection<
  TripOrVariantSection<PointType, PointProps, TripOrVariantType, TripOrVariantProps>,
  TripOrVariantSectionProps<PointType, PointProps>
> {
  constructor(
    props?: TripOrVariantSectionsCollectionProps<
      PointType,
      PointProps,
      TripOrVariantType,
      TripOrVariantProps
    >
  );
}
export default TripOrVariantSectionsCollection;
