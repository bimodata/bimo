import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface ServiceContextParentProps extends ExtendedItemProps {
  sctxName?: string;
}
export declare class ServiceContextParent extends Item<ServiceContextParent> {
  sctxName?: string;
  constructor(props: ServiceContextParentProps);
}
