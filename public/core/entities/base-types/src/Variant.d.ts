import { ExtendedItemProps } from "@bimo/core-utils-collection";
import { TripOrVariant } from "./TripOrVariant";
import { VariantPointsCollection } from "./VariantPointsCollection";
import { VariantPoint, VariantPointProps } from "./VariantPoint";
import { Route } from "./Route";
import { Place } from "./Place";
import { BimoContext } from "@bimo/core-global-types";
export interface VariantProps extends ExtendedItemProps {
    bimoId?: string;
    varIdentifier?: string;
    varDescription?: string;
    varDirection?: string;
    varReversible?: string;
    varUsualTermin?: string;
    varDestinationNote?: string;
    varProductive?: string;
    varPriority?: string;
    varAllowDeviationFromTrackNetwork?: string;
    varNatureMouvementTechnique?: string;
    varIndiceCompo?: string;
    variantPoints: VariantPointsCollection;
}
export declare class Variant extends TripOrVariant<Variant, VariantProps, VariantPoint, VariantPointProps> {
    bimoId?: string;
    varIdentifier: string;
    varDescription?: string;
    varDirection?: string;
    varReversible?: string;
    varUsualTermin?: string;
    varDestinationNote?: string;
    varProductive?: string;
    varPriority: string;
    varAllowDeviationFromTrackNetwork?: string;
    varNatureMouvementTechnique?: string;
    varIndiceCompo?: string;
    variantPoints: VariantPointsCollection;
    _links: {
        [linkType: string]: any;
    };
    constructor(props: VariantProps, context: BimoContext);
    addLink(type: string, value: any): void;
    getLink(type: string): any;
    removeLink(type: string): void;
    removeFromCurrentRoute(): void;
    /** Creates a new instance of a variant. All variantPoints are new instances too. */
    copy(newVarIdentifier?: string): Variant;
    get route(): Route;
    get routeId(): string;
    /** key of the form '${route.rteIdentifier}|${varIdentifier}' or null if either is null    */
    get routeAndVariantKey(): string;
    get routeVersion(): import("./RouteVersion").RouteVersion;
    get shortLoggingOutput(): string;
    get mediumLoggingOutput(): string;
    get longLoggingOutput(): string;
    get veryLongLoggingOutput(): string;
    get varIdRouteIdAndVersionId(): string;
    get isProductive(): boolean;
    changeStartPlace(newStartPlace: Place | string): void;
    changeEndPlace(newEndPlace: Place | string): void;
    usesOneOfThesePlaces(listOfPlaces: string | Set<string> | string[]): boolean;
    updatePlacesAndReturnListOfChanges(newPlaceIdByOldPlaceId: {
        [oldPlaceId: string]: string;
    }): {
        old: string;
        new: string;
    }[];
}
export default Variant;
