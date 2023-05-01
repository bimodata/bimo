/* eslint-disable no-param-reassign */
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { RouteVersion, RouteVersionProps } from "./RouteVersion";
import { RoutesCollection, RoutesCollectionProps } from "./RoutesCollection";
import { VariantsCollection, VariantsCollectionProps } from "./VariantsCollection";
import { Route } from "./Route";
import { Variant } from "./Variant";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [RouteVersion, RoutesCollection];

export interface RouteVersionsCollectionProps
  extends ExtendedCollectionProps<RouteVersion, RouteVersionProps> {}

export class RouteVersionsCollection extends Collection<RouteVersion, RouteVersionProps> {
  constructor(props: RouteVersionsCollectionProps = {}) {
    super({
      itemName: "RouteVersion",
      ItemConstructor: RouteVersion,
      idPropName: "bimoId",
      businessIdPropName: "rtevIdentifier",
      labelPropName: `rtevDescription`,
      associationType: `aggregation`,
      ...props,
    });
  }

  /**
   * @param - données en "style" oir, telles qu'obtenues de OIG-OIR-to-JSON
   */
  static createFromOirStyleData(oirStyleData: any) {
    const rawRouteVersions = oirStyleData.route_version;
    const rawRoutes = oirStyleData.route;

    if (!rawRouteVersions) {
      throw new Error(`Bad oirStyleData: could not find "route_version" key`);
    }
    const newRouteVersionsCollection = new RouteVersionsCollection({
      items: rawRouteVersions,
    });

    if (!rawRoutes) {
      throw new Error(`Bad oirStyleData: could not find "route" key`);
    }
    const temporaryRoutesCollection = new RoutesCollection({ items: rawRoutes });
    temporaryRoutesCollection.forEach((newRoute) => {
      const routeVersion = newRouteVersionsCollection.getByPropName(
        `rtevIdentifier`,
        newRoute.rteVersion
      );
      if (!routeVersion) throw new Error(`Could not find ${newRoute.rteVersion}`);
      routeVersion.routes.add(newRoute);
    });
    return newRouteVersionsCollection;
  }

  generateOirStyleData() {
    let routes: Route[] = [];
    const routeVersions: RouteVersion[] = [];
    this.forEach((routeVersion) => {
      routeVersions.push(routeVersion);
      routes = routes.concat(
        routeVersion.routes.map((route) => {
          // @ts-ignore
          route.rvariant = route.variants.map((variant) => {
            // @ts-ignore
            variant.rvpoint = variant.variantPoints.items;
            return variant;
          });
          return route;
        })
      );
    });
    return { route_version: routeVersions, route: routes };
  }

  getRouteVersionByIdentifier(rtevIdentifier) {
    return this.getByPropName(`rtevIdentifier`, rtevIdentifier);
  }

  /** @type {VariantsCollection} */
  get variantsCollectionOfAllVariantsOfAllRoutes() {
    return this._getAndSetCachedValue(
      "variantsCollectionOfAllVariantsOfAllRoutes",
      () => {
        let allVariants: Variant[] = [];
        this.forEach((routeVersion) => {
          allVariants = allVariants.concat(
            routeVersion.variantsCollectionOfAllVariantsOfAllRoutes.items
          );
        });
        return new VariantsCollection({
          items: allVariants,
          associationType: `aggregation`,
        });
      }
    );
  }
}

RouteVersionsCollection.allChildClasses = getAllChildClasses(childClasses);

/* I/O info */
RouteVersionsCollection.defaultExportedDataDataName = `output_rtever`;
RouteVersionsCollection.defaultImportDataDataName = `input_rtever`;

export default RouteVersionsCollection;
