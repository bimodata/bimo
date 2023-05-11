import { ExtendedItemProps } from "@bimo/core-utils-collection";
import { RoutesCollection } from "./RoutesCollection";
import { VariantsCollection } from "./VariantsCollection";
import { Variant } from "./Variant";
import { VariantPoint, VariantPointProps } from "./VariantPoint";
import { VariantPointsCollection } from "./VariantPointsCollection";
import { VehicleScheduleOrRouteVersion } from "./VehicleScheduleOrRouteVersion";
import { TripOrVariantSectionsCollection } from "./TripOrVariantSectionsCollection";
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
export declare class RouteVersion extends VehicleScheduleOrRouteVersion<RouteVersion, RouteVersionProps> {
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
    _links: {
        [linkType: string]: any;
    };
    constructor(props: RouteVersionProps);
    addLink(type: string, value: any): void;
    getLink(type: string): any;
    removeLink(type: string): void;
    removeVariant(variant: Variant): void;
    /** Creates a new instance of a routeVersion. All routes are new instances too. */
    copy(newRtevIdentifier?: string): RouteVersion;
    get shortLoggingOutput(): string;
    get mediumLoggingOutput(): string;
    getVariantsThatUseOneOfThesePlaces(listOfPlaces: string | Set<string> | string[]): Variant[];
    getRouteById(routeId: string): import("./Route").Route;
    get variantsCollectionOfAllVariantsOfAllRoutes(): VariantsCollection;
    get variantPointsCollectionOfAllVariantPointsOfAllRoutes(): VariantPointsCollection;
    get variantSectionsCollectionOfAllVariantsOfAllRoutes(): TripOrVariantSectionsCollection<VariantPoint, VariantPointProps, import("@bimo/core-utils-collection").ExtendedItem<unknown>, ExtendedItemProps>;
}
export default RouteVersion;
