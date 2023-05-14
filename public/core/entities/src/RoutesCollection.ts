import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { RoutesCollection as BimoRoutesCollection } from "../base-types/rawIndex";
export { RoutesCollection as BimoRoutesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { BimoRoute, RouteProps } from "./Route";

import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

export interface RoutesCollectionProps
  extends ExtendedCollectionProps<BimoRoute, RouteProps> {}

export function RoutesCollectionClassFactory({
  Route,
}: EntityConstructorByEntityClassKey): typeof BimoRoutesCollection {
  const childClasses: (typeof Entity)[] = [Route];

  class RoutesCollection extends Collection<BimoRoute, RouteProps> {
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

  return RoutesCollection;
}

export default RoutesCollectionClassFactory;
