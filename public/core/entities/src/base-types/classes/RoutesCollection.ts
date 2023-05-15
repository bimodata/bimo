import { Route, RouteProps } from "./Route";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
export interface RoutesCollectionProps extends ExtendedCollectionProps<Route, RouteProps> {
}
export declare class RoutesCollection extends Collection<Route, RouteProps> {
    constructor(props?: RoutesCollectionProps);
}
export default RoutesCollection;
