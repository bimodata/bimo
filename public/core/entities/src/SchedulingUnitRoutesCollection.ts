import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { SchedulingUnitRoutesCollection as BimoSchedulingUnitRoutesCollection } from "../base-types/rawIndex";
export { SchedulingUnitRoutesCollection as BimoSchedulingUnitRoutesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BimoSchedulingUnitRoute, SchedulingUnitRouteProps } from "./SchedulingUnitRoute";
export function SchedulingUnitRoutesCollectionClassFactory({
  SchedulingUnitRoute,
}: EntityConstructorByEntityClassKey): typeof BimoSchedulingUnitRoutesCollection{
  
  const childClasses: (typeof Entity)[] = [SchedulingUnitRoute];
  
  export interface SchedulingUnitRoutesCollectionProps
  extends ExtendedCollectionProps<BimoSchedulingUnitRoute, SchedulingUnitRouteProps> {}
  
 class SchedulingUnitRoutesCollection extends Collection<
    SchedulingUnitRoute,
    SchedulingUnitRouteProps
  > {
    constructor(props: SchedulingUnitRoutesCollectionProps) {
      super({
        itemName: "SchedulingUnitRoute",
        ItemConstructor: SchedulingUnitRoute,
        associationType: "aggregation",
        businessIdPropName: "rteIdentifier",
        ...props,
      });
    }
  }
  
  SchedulingUnitRoutesCollection.allChildClasses = getAllChildClasses(childClasses);
  
  return SchedulingUnitRoutesCollection
}

export default SchedulingUnitRoutesCollectionClassFactory