import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TripOrVariantSectionsCollection as BimoTripOrVariantSectionsCollection } from "../base-types/rawIndex";
export { TripOrVariantSectionsCollection as BimoTripOrVariantSectionsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { Item, ExtendedItemProps, ExtendedItem } from "@bimo/core-utils-collection";
import { BimoTripOrVariantSection, TripOrVariantSectionProps } from "./TripOrVariantSection";
import { BimoTripOrVariantPoint, TripOrVariantPointProps } from "./TripOrVariantPoint";
export function TripOrVariantSectionsCollectionClassFactory({
  TripOrVariantSection,
  TripOrVariantPoint,
}: EntityConstructorByEntityClassKey): typeof BimoTripOrVariantSectionsCollection{
  
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
  
 class TripOrVariantSectionsCollection<
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
  
  return TripOrVariantSectionsCollection
}

export default TripOrVariantSectionsCollectionClassFactory