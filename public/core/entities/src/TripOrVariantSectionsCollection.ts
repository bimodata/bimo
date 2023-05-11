import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { Item, ExtendedItemProps, ExtendedItem } from "@bimo/core-utils-collection";
import { TripOrVariantSection, TripOrVariantSectionProps } from "./TripOrVariantSection";
import { TripOrVariantPoint } from "./TripOrVariantPoint";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [TripOrVariantSection];

export interface TripOrVariantSectionsCollectionProps<
  PointType extends TripOrVariantPoint<PointType, PointProps>,
  PointProps extends ExtendedItemProps,
  TripOrVariantType extends ExtendedItem<TripOrVariantType>,
  TripOrVariantProps extends ExtendedItemProps
> extends ExtendedCollectionProps<
    TripOrVariantSection<PointType, PointProps, TripOrVariantType, TripOrVariantProps>,
    TripOrVariantSectionProps<PointType, PointProps>
  > {}

export class TripOrVariantSectionsCollection<
  PointType extends TripOrVariantPoint<PointType, PointProps>,
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