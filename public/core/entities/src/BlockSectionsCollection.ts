import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { BlockSectionsCollection as BimoBlockSectionsCollection } from "../base-types/rawIndex";
export { BlockSectionsCollection as BimoBlockSectionsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BimoBlockSection, BlockSectionProps } from "./BlockSection";
export function BlockSectionsCollectionClassFactory({
  BlockSection,
}: EntityConstructorByEntityClassKey): typeof BimoBlockSectionsCollection{
  
  export interface BlockSectionsCollectionProps
  extends ExtendedCollectionProps<BimoBlockSection, BlockSectionProps> {}
  
 class BlockSectionsCollection extends Collection<BimoBlockSection, BlockSectionProps> {
    constructor(props: BlockSectionsCollectionProps = {}) {
      super({
        itemName: "BlockSection",
        ItemConstructor: BlockSection,
        idPropName: `id`,
        labelPropName: `label`,
        ...props,
      });
    }
  
    sortByTime() {
      try {
        this.items.sort(
          (sectionA, sectionB) =>
            sectionA.firstBlockActivity.startTimeAsDuration.as("second") -
            sectionB.firstBlockActivity.startTimeAsDuration.as("second")
        );
      } catch (error) {
        const newError = new Error(
          `Error while sorting these block sections:\n${this.longLoggingOutput}\n${error.message}`
        );
        throw newError;
      }
    }
  }
  
  return BlockSectionsCollection
}

export default BlockSectionsCollectionClassFactory