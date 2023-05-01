import { Route, RouteProps } from "./Route";

const childClasses = [Route];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

export interface RoutesCollectionProps
  extends ExtendedCollectionProps<Route, RouteProps> {}

export class RoutesCollection extends Collection<Route, RouteProps> {
  constructor(props: RoutesCollectionProps = {}) {
    super({
      itemName: "Route",
      ItemConstructor: Route,
      items: props.items,
      parent: props.parent,
      idPropName: `bimoId`,
    });
  }
}

RoutesCollection.allChildClasses = getAllChildClasses(childClasses);

export default RoutesCollection;
