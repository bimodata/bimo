import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { SchedulingUnitRoute, SchedulingUnitRouteProps } from "./SchedulingUnitRoute";

const childClasses = [SchedulingUnitRoute];



export interface SchedulingUnitRoutesCollectionProps extends ExtendedCollectionProps<SchedulingUnitRoute, SchedulingUnitRouteProps> {
}

export class SchedulingUnitRoutesCollection extends Collection<SchedulingUnitRoute, SchedulingUnitRouteProps> {
  constructor(props: SchedulingUnitRoutesCollectionProps) {
    super({
      itemName: 'SchedulingUnitRoute',
      ItemConstructor: SchedulingUnitRoute,
      associationType: 'aggregation',
      businessIdPropName: 'rteIdentifier',
      ...props,
    });
  }
}

SchedulingUnitRoutesCollection.allChildClasses = getAllChildClasses(childClasses);



export default SchedulingUnitRoutesCollection;
