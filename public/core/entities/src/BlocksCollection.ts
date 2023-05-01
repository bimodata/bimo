import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { Block, BlockProps } from "./Block";

const childClasses = [Block];

export interface BlocksCollectionProps
  extends ExtendedCollectionProps<Block, BlockProps> {}

export class BlocksCollection extends Collection<Block, BlockProps> {
  constructor(props: BlocksCollectionProps = {}) {
    super({
      itemName: "Block",
      ItemConstructor: Block,
      items: props.items,
      parent: props.parent,
      idPropName: `blkIntNumber`,
      labelPropName: `blkNumber`,
      associationType: props.associationType,
    });
  }
}

BlocksCollection.allChildClasses = getAllChildClasses(childClasses);

export default BlocksCollection;
