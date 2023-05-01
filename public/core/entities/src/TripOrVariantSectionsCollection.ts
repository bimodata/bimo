import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { Item, ExtendedItemProps, ExtendedItem } from "@bimo/core-utils-collection";
import { TripOrVariantSection, TripOrVariantSectionProps } from "./TripOrVariantSection";

const childClasses = [TripOrVariantSection];

export interface TripOrVariantSectionsCollectionProps<
  PointType extends ExtendedItem<PointType>,
  PointProps extends ExtendedItemProps,
  TripOrVariantType extends ExtendedItem<TripOrVariantType>,
  TripOrVariantProps extends ExtendedItemProps
> extends ExtendedCollectionProps<
    TripOrVariantSection<PointType, PointProps, TripOrVariantType, TripOrVariantProps>,
    TripOrVariantSectionProps<PointType, PointProps>
  > {}

export class TripOrVariantSectionsCollection<
  PointType extends ExtendedItem<PointType>,
  PointProps extends ExtendedItemProps,
  TripOrVariantType extends ExtendedItem<TripOrVariantType>,
  TripOrVariantProps extends ExtendedItemProps
> extends Collection<
  TripOrVariantSection<PointType, PointProps, TripOrVariantType, TripOrVariantProps>,
  TripOrVariantSectionProps<PointType, PointProps>
> {
  constructor(
    props: TripOrVariantSectionsCollectionProps<
      PointType,
      PointProps,
      TripOrVariantType,
      TripOrVariantProps
    > = {}
  ) {
    super({
      itemName: "TripOrVariantSection",
      ItemConstructor: TripOrVariantSection,
      ...props,
    });
  }
}

TripOrVariantSectionsCollection.allChildClasses = getAllChildClasses(childClasses);

export default TripOrVariantSectionsCollection;
