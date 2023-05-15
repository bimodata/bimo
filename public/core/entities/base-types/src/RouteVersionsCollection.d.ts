import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { RouteVersion, RouteVersionProps } from "./RouteVersion";
import { VariantsCollection } from "./VariantsCollection";
import { Route } from "./Route";
export interface RouteVersionsCollectionProps
  extends ExtendedCollectionProps<RouteVersion, RouteVersionProps> {}
export declare class RouteVersionsCollection extends Collection<
  RouteVersion,
  RouteVersionProps
> {
  constructor(props?: RouteVersionsCollectionProps);
  /**
   * @param - données en "style" oir, telles qu'obtenues de OIG-OIR-to-JSON
   */
  static createFromOirStyleData(oirStyleData: any): RouteVersionsCollection | undefined;
  generateOirStyleData(): {
    route_version: RouteVersion[];
    route: Route[];
  };
  getRouteVersionByIdentifier(rtevIdentifier: string): RouteVersion | undefined;
  get variantsCollectionOfAllVariantsOfAllRoutes(): VariantsCollection;
}
export default RouteVersionsCollection;
