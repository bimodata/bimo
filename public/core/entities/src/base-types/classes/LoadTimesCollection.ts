import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { LoadTime, LoadTimeProps } from "./LoadTime";
export interface LoadTimesCollectionProps extends ExtendedCollectionProps<LoadTime, LoadTimeProps> {
}
export declare class LoadTimesCollection extends Collection<LoadTime, LoadTimeProps> {
    constructor(props?: LoadTimesCollectionProps);
}
export default LoadTimesCollection;
