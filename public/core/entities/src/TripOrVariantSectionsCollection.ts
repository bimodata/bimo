import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { TripOrVariantSection, TripOrVariantSectionProps } from "./TripOrVariantSection";

const childClasses = [TripOrVariantSection];



export interface TripOrVariantSectionsCollectionProps extends ExtendedCollectionProps<TripOrVariantSection, TripOrVariantSectionProps> {
}

export class TripOrVariantSectionsCollection extends Collection<TripOrVariantSection, TripOrVariantSectionProps> {
  constructor(props: TripOrVariantSectionsCollectionProps = {}) {
    super({
      itemName: 'TripOrVariantSection',
      ItemConstructor: TripOrVariantSection,
      ...props,
    });
  }
}


TripOrVariantSectionsCollection.allChildClasses = getAllChildClasses(childClasses);



export default TripOrVariantSectionsCollection;
