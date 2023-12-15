import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { PortionWorkingsCollection } from "./PortionWorkingsCollection";
export interface PortionWorkingVersionProps extends ExtendedItemProps {
  bimoId?: string;
  pwrkvIdentifier?: string;
  pwrkvDescription?: string;
  pwrkvOwner?: string;
  pwrkvPublicAccess?: string;
  portionWorkings?: PortionWorkingsCollection;
}
export declare class PortionWorkingVersion extends Item<PortionWorkingVersion> {
  bimoId?: string;
  pwrkvIdentifier?: string;
  pwrkvDescription?: string;
  pwrkvOwner?: string;
  pwrkvPublicAccess?: string;
  portionWorkings?: PortionWorkingsCollection;
  constructor(props: PortionWorkingVersionProps);
  get shortLoggingOutput(): string;
}
