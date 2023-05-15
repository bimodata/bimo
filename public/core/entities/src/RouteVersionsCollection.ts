import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { RouteVersionsCollection as BimoRouteVersionsCollection } from "../base-types/rawIndex";
export { RouteVersionsCollection as BimoRouteVersionsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
/* eslint-disable no-param-reassign */
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoRouteVersion, RouteVersionProps } from "./RouteVersion";
import { BimoRoutesCollection, RoutesCollectionProps } from "./RoutesCollection";
import { BimoVariantsCollection, VariantsCollectionProps } from "./VariantsCollection";
import { BimoRoute, RouteProps } from "./Route";
import { BimoVariant, VariantProps } from "./Variant";

export interface RouteVersionsCollectionProps
  extends ExtendedCollectionProps<BimoRouteVersion, RouteVersionProps> {}

export function RouteVersionsCollectionClassFactory({
  RouteVersion,
  RoutesCollection,
  VariantsCollection,
}: EntityConstructorByEntityClassKey): typeof BimoRouteVersionsCollection {
  const childClasses: (typeof Entity)[] = [RouteVersion, RoutesCollection];

  class RouteVersionsCollection extends Collection<BimoRouteVersion, RouteVersionProps> {
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
      let routes: BimoRoute[] = [];
      const routeVersions: BimoRouteVersion[] = [];
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

    getRouteVersionByIdentifier(rtevIdentifier: string) {
      return this.getByPropName(`rtevIdentifier`, rtevIdentifier);
    }

    get variantsCollectionOfAllVariantsOfAllRoutes() {
      return this._getAndSetCachedValue(
        "variantsCollectionOfAllVariantsOfAllRoutes",
        () => {
          let allVariants: BimoVariant[] = [];
          this.forEach((routeVersion) => {
            const variantsCollOfThisRouteVersion =
              routeVersion.variantsCollectionOfAllVariantsOfAllRoutes;
            if (variantsCollOfThisRouteVersion) {
              allVariants = allVariants.concat(variantsCollOfThisRouteVersion.items);
            }
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

  return RouteVersionsCollection;
}

export default RouteVersionsCollectionClassFactory;
