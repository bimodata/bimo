import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { BlocksCollection as BimoBlocksCollection, Block as BimoBlock} from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BlockProps } from "./Block";

export interface BlocksCollectionProps
  extends ExtendedCollectionProps<BimoBlock, BlockProps> {}

export function BlocksCollectionClassFactory({
  Block,
}: EntityConstructorByEntityClassKey): typeof BimoBlocksCollection {
  const childClasses: (typeof Entity)[] = [Block];

  class BlocksCollection extends Collection<BimoBlock, BlockProps> {
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

  return BlocksCollection;
}

export default BlocksCollectionClassFactory;
