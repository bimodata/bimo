import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { Entity } from "@bimo/core-utils-entity";
export interface RunTimeProps extends ExtendedItemProps {
    bimoId?: string;
    rtStartPlaceId?: string;
    rtEndPlaceId?: string;
    rtPeriodStartTime?: string;
    rtPeriodEndTime?: string;
    rtRunTime?: string;
    rtRouteId?: string;
    rtVariantId?: string;
    rtNetworkEventId?: string;
    rtDetourId?: string;
}
export declare class RunTime extends Item<RunTime> {
    bimoId?: string;
    rtStartPlaceId?: string;
    rtEndPlaceId?: string;
    rtPeriodStartTime?: string;
    rtPeriodEndTime?: string;
    rtRunTime?: string;
    rtRouteId?: string;
    rtVariantId?: string;
    rtNetworkEventId?: string;
    rtDetourId?: string;
    constructor(props: RunTimeProps);
    copy(): RunTime;
    get runTimeVersion(): Entity;
    get od(): string;
    /** @type {string} key made of all attributes except the runtime */
    get key(): string;
    /** @type {string} key made of all attributes including the runtime */
    get keyWithTime(): string;
    get shortLoggingOutput(): string;
}
export default RunTime;
