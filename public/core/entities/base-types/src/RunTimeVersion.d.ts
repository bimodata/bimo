import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { RunTimesCollection } from "./RunTimesCollection";
import { LoadTimesCollection } from "./LoadTimesCollection";
export interface RunTimeVersionProps extends ExtendedItemProps {
    bimoId?: string;
    rtvIdentifier?: string;
    rtvDescription?: string;
    rtvScheduleType?: string;
    rtvSchedulingUnit?: string;
    rtvEffectiveDate?: string;
    rtvOwner?: string;
    rtvPublicAccess?: string;
    rtvDataGroup?: string;
    rtvAllowsMapBasedRunTimes?: string;
    rtvMapBasedRunTimeFactor?: string;
    runTimes?: RunTimesCollection;
    loadTimes?: LoadTimesCollection;
}
export declare class RunTimeVersion extends Item<RunTimeVersion> {
    bimoId?: string;
    rtvIdentifier?: string;
    rtvDescription?: string;
    rtvScheduleType?: string;
    rtvSchedulingUnit?: string;
    rtvEffectiveDate?: string;
    rtvOwner?: string;
    rtvPublicAccess?: string;
    rtvDataGroup?: string;
    rtvAllowsMapBasedRunTimes?: string;
    rtvMapBasedRunTimeFactor?: string;
    runTimes: RunTimesCollection;
    loadTimes: LoadTimesCollection;
    constructor(props: RunTimeVersionProps);
    /** Creates a new instance of a runTimeVersion. All runtimes are new instances too. */
    copy(newRtvIdentifier: string | undefined): RunTimeVersion;
    get shortLoggingOutput(): string;
}
export default RunTimeVersion;
