import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TripShiftsCollection as BimoTripShiftsCollection } from "../base-types/rawIndex";
export { TripShiftsCollection as BimoTripShiftsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { BimoTripShift, TripShiftProps } from "./TripShift";
export function TripShiftsCollectionClassFactory({
  TripShift,
}: EntityConstructorByEntityClassKey): typeof BimoTripShiftsCollection{
  
  const childClasses: (typeof Entity)[] = [TripShift];
  import { getAllChildClasses } from "@bimo/core-utils-serialization";
  import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
  
  export interface TripShiftsCollectionProps
  extends ExtendedCollectionProps<BimoTripShift, TripShiftProps> {}
  
 class TripShiftsCollection extends Collection<BimoTripShift, TripShiftProps> {
    constructor(props: TripShiftsCollectionProps = {}) {
      super({
        itemName: "TripShift",
        ItemConstructor: TripShift,
        items: props.items,
        parent: props.parent,
      });
    }
  }
  
  TripShiftsCollection.allChildClasses = getAllChildClasses(childClasses);
  
  return TripShiftsCollection
}

export default TripShiftsCollectionClassFactory