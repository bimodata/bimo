
import { TripTp, TripTpProps } from "./TripTp";


const childClasses = [TripTp];
import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";



export interface TripTpsCollectionProps extends ExtendedCollectionProps<TripTp, TripTpProps> {
}

export class TripTpsCollection extends Collection<TripTp, TripTpProps> {
  constructor(props: TripTpsCollectionProps = {}) {
    super({ itemName: 'TripTp', ItemConstructor: TripTp, items: props.items, parent: props.parent });
  }
}


TripTpsCollection.allChildClasses = getAllChildClasses(childClasses);



export default TripTpsCollection;
