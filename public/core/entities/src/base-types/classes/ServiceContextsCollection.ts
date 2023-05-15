import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { ServiceContext, ServiceContextProps } from "./ServiceContext";
export interface ServiceContextsCollectionProps
  extends ExtendedCollectionProps<ServiceContext, ServiceContextProps> {}
export declare class ServiceContextsCollection extends Collection<
  ServiceContext,
  ServiceContextProps
> {
  constructor(props?: ServiceContextsCollectionProps);
}
