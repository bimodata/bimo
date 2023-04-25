
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BlockSection, BlockSectionProps } from "./BlockSection";



export interface BlockSectionsCollectionProps extends ExtendedCollectionProps<BlockSection, BlockSectionProps> {
}

export class BlockSectionsCollection extends Collection<BlockSection, BlockSectionProps> {
  constructor(props: BlockSectionsCollectionProps = {}) {
    super({
      itemName: 'BlockSection',
      ItemConstructor: BlockSection,
      idPropName: `id`,
      labelPropName: `label`,
      ...props,
    });
  }

  sortByTime() {
    try {
      this.items.sort(
        (sectionA, sectionB) => sectionA.firstBlockActivity.startTimeAsDuration.as('second')
          - sectionB.firstBlockActivity.startTimeAsDuration.as('second'),
      );
    }
    catch (error) {
      const newError = new Error(`Error while sorting these block sections:\n${this.longLoggingOutput}\n${error.message}`);
      throw newError;
    }
  }
}

export default BlockSectionsCollection;
