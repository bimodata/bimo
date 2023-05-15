import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { SdefSchedulingUnitsCollection } from "./SdefSchedulingUnitsCollection";
export interface ServiceDefinitionProps extends ExtendedItemProps {
    sdefIdentifier?: string;
    sdefDescription?: string;
    sdefOwner?: string;
    sdefDataGroup?: string;
    sdefPublicAccess?: string;
    schedulingUnits?: string;
}
export declare class ServiceDefinition extends Item<ServiceDefinition> {
    sdefIdentifier?: string;
    sdefDescription?: string;
    sdefOwner?: string;
    sdefDataGroup?: string;
    sdefPublicAccess?: string;
    schedulingUnits: SdefSchedulingUnitsCollection;
    constructor(props: ServiceDefinitionProps);
    get shortLoggingOutput(): string;
}
export default ServiceDefinition;
