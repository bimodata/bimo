import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { BlocksCollection as BimoBlocksCollection } from "../base-types/rawIndex";
export { BlocksCollection as BimoBlocksCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoBlock, BlockProps } from "./Block";
export function BlocksCollectionClassFactory({
  Block,
}: EntityConstructorByEntityClassKey): typeof BimoBlocksCollection{
  
  const childClasses: (typeof Entity)[] = [Block];
  
  export interface BlocksCollectionProps
  extends ExtendedCollectionProps<BimoBlock, BlockProps> {}
  
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
  
  return BlocksCollection
}

export default BlocksCollectionClassFactory