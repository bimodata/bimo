import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { SchedulingUnitRoutesCollection } from "./SchedulingUnitRoutesCollection";
export interface SchedulingUnitProps extends ExtendedItemProps {
  scuIdentifier?: string;
  scuType?: string;
  scuDescription?: string;
  scuOwner?: string;
  scuDataGroup?: string;
  scuPublicAccess?: string;
  schedulingUnitRoutes?: SchedulingUnitRoutesCollection;
}
export declare class SchedulingUnit extends Item<SchedulingUnit> {
  scuIdentifier?: string;
  scuType?: string;
  scuDescription?: string;
  scuOwner?: string;
  scuDataGroup?: string;
  scuPublicAccess?: string;
  schedulingUnitRoutes?: SchedulingUnitRoutesCollection;
  constructor(props: SchedulingUnitProps);
  get shortLoggingOutput(): string;
}
