import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { RouteVersion as BimoRouteVersion } from "../base-types/rawIndex";
export { RouteVersion as BimoRouteVersion } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { ExtendedItemProps } from "@bimo/core-utils-collection";

import { BimoRoutesCollection, RoutesCollectionProps } from "./RoutesCollection";
import { BimoVariantsCollection, VariantsCollectionProps } from "./VariantsCollection";
import { BimoVariant, VariantProps } from "./Variant";
import { BimoVariantPoint, VariantPointProps } from "./VariantPoint";
import { BimoVariantPointsCollection, VariantPointsCollectionProps } from "./VariantPointsCollection";
import { BimoVehicleScheduleOrRouteVersion, VehicleScheduleOrRouteVersionProps } from "./VehicleScheduleOrRouteVersion";
import { BimoTripOrVariantSectionsCollection, TripOrVariantSectionsCollectionProps } from "./TripOrVariantSectionsCollection";
import { BimoTripOrVariantSection, TripOrVariantSectionProps } from "./TripOrVariantSection";
export function RouteVersionClassFactory({
  RoutesCollection,
  VariantsCollection,
  Variant,
  VariantPoint,
  VariantPointsCollection,
  VehicleScheduleOrRouteVersion,
  TripOrVariantSectionsCollection,
  TripOrVariantSection,
}: EntityConstructorByEntityClassKey): typeof BimoRouteVersion{
  
  const childClasses: (typeof Entity)[] = [RoutesCollection];
  
  export interface RouteVersionProps extends ExtendedItemProps {
    bimoId?: string;
    rtevIdentifier?: string;
    rtevDescription?: string;
    rtevSchedulingUnit?: string;
    rtevEffectiveDate?: string;
    rtevRailInfra?: string;
    rtevRoutesBasedOnRailLinks?: string;
    rtevOwner?: string;
    rtevPublicAccess?: string;
    rtevDataGroup?: string;
    routes?: RoutesCollection;
  }
  
 class RouteVersion extends VehicleScheduleOrRouteVersion<
    RouteVersion,
    RouteVersionProps
  > {
    bimoId?: string;
    rtevIdentifier?: string;
    rtevDescription?: string;
    rtevSchedulingUnit?: string;
    rtevEffectiveDate?: string;
    rtevRailInfra?: string;
    rtevRoutesBasedOnRailLinks?: string;
    rtevOwner?: string;
    rtevPublicAccess?: string;
    rtevDataGroup?: string;
    routes: RoutesCollection;
    _links: { [linkType: string]: any } = {};
    constructor(props: RouteVersionProps) {
      super(props, "variant");
  
      this.bimoId = gavpfp("bimoId", props);
      this.rtevIdentifier = gavpfp("rtevIdentifier", props);
      this.rtevDescription = gavpfp("rtevDescription", props);
      this.rtevSchedulingUnit = gavpfp("rtevSchedulingUnit", props);
      this.rtevEffectiveDate = gavpfp("rtevEffectiveDate", props);
      this.rtevRailInfra = gavpfp("rtevRailInfra", props, "string", "0");
      this.rtevRoutesBasedOnRailLinks = gavpfp(
        "rtevRoutesBasedOnRailLinks",
        props,
        "string",
        "0"
      );
      this.rtevOwner = gavpfp("rtevOwner", props, "string", "ADMIN");
      this.rtevPublicAccess = gavpfp("rtevPublicAccess", props, "string", "0");
      this.rtevDataGroup = gavpfp("rtevDataGroup", props);
  
      this.routes = gavpfp("routes", props, RoutesCollection, new RoutesCollection(), {
        parent: this,
      });
    }
  
    addLink(type: string, value: any) {
      this._links[type] = value;
    }
  
    getLink(type: string) {
      return this._links[type];
    }
  
    removeLink(type: string) {
      delete this._links[type];
    }
  
    removeVariant(variant: Variant) {
      this.variantsCollectionOfAllVariantsOfAllRoutes.remove(variant);
      this.getRouteById(variant.routeId as string)?.variants.remove(variant);
    }
  
    /** Creates a new instance of a routeVersion. All routes are new instances too. */
    copy(newRtevIdentifier?: string) {
      const copiedRouteVersion = new RouteVersion(this);
      copiedRouteVersion.rtevIdentifier = newRtevIdentifier;
      copiedRouteVersion.routes = new RoutesCollection({
        items: this.routes.map((route) => route.copy()),
      });
      copiedRouteVersion.routes.parent = copiedRouteVersion;
      copiedRouteVersion.addLink("copiedFrom", this);
      return copiedRouteVersion;
    }
  
    get shortLoggingOutput() {
      return `${this.rtevIdentifier} - ${this.rtevDescription}`;
    }
  
    get mediumLoggingOutput() {
      return `${this.slo} (${this.routes.length} lignes et ${this.variantsCollectionOfAllVariantsOfAllRoutes?.length} variantes)`;
    }
  
    getVariantsThatUseOneOfThesePlaces(listOfPlaces: string | Set<string> | string[]) {
      if (!listOfPlaces) {
        return undefined;
      }
      let variants: Variant[] = [];
      this.routes.forEach((route) => {
        const variantsOfThisRoute = route.getVariantsThatUseOneOfThesePlaces(listOfPlaces);
        if (!variantsOfThisRoute) return;
        variants = variants.concat(variantsOfThisRoute);
      });
      // variants.forEach(variant => {
      //     console.log(`${variant.varIdentifier} ${variant.parent.parent.rteIdentifier}`)
      // })
      return variants;
    }
  
    getRouteById(routeId: string) {
      return this.routes.getByPropName(`rteIdentifier`, routeId);
    }
  
    get variantsCollectionOfAllVariantsOfAllRoutes() {
      return this._getAndSetCachedValue(
        "variantsCollectionOfAllVariantsOfAllRoutes",
        () => {
          let allVariants: Variant[] = [];
          this.routes.forEach((route) => {
            allVariants = allVariants.concat(route.variants.items);
          });
          return new VariantsCollection({
            items: allVariants,
            associationType: `aggregation`,
          });
        }
      );
    }
  
    get variantPointsCollectionOfAllVariantPointsOfAllRoutes() {
      return this._getAndSetCachedValue("", () => {
        let allPoints: VariantPoint[] = [];
        this.variantsCollectionOfAllVariantsOfAllRoutes.forEach((variant) => {
          allPoints = allPoints.concat(variant.points.items);
        });
        return new VariantPointsCollection({
          items: allPoints,
          associationType: `aggregation`,
        });
      });
    }
  
    get variantSectionsCollectionOfAllVariantsOfAllRoutes() {
      let allVariantSections: TripOrVariantSection<
        VariantPoint,
        VariantPointProps,
        Variant,
        VariantProps
      >[] = [];
      this.variantsCollectionOfAllVariantsOfAllRoutes.forEach((variant) => {
        allVariantSections = allVariantSections.concat(variant.sections.items);
      });
  
      return new TripOrVariantSectionsCollection({
        items: allVariantSections,
        associationType: `aggregation`,
      });
    }
  }
  
  RouteVersion.hastusKeywords = ["route_version"];
  RouteVersion.hastusObject = "route_version";
  
  RouteVersion.allChildClasses = getAllChildClasses(childClasses);
  
  return RouteVersion
}

export default RouteVersionClassFactory