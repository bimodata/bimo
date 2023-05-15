import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BlockSection, BlockSectionProps } from "./BlockSection";
export interface BlockSectionsCollectionProps
  extends ExtendedCollectionProps<BlockSection, BlockSectionProps> {}
export declare class BlockSectionsCollection extends Collection<
  BlockSection,
  BlockSectionProps
> {
  constructor(props?: BlockSectionsCollectionProps);
  sortByTime(): void;
}
