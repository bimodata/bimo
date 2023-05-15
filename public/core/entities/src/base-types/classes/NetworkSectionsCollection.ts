import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { NetworkSection, NetworkSectionProps } from "./NetworkSection";
export interface NetworkSectionsCollectionProps
  extends ExtendedCollectionProps<NetworkSection, NetworkSectionProps> {}
export declare class NetworkSectionsCollection extends Collection<
  NetworkSection,
  NetworkSectionProps
> {
  constructor(props?: NetworkSectionsCollectionProps);
}
