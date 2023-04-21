/* Linked Classes */
const { Collection } = require('@bimo/core-utils-collection');
const BlockSection = require('./BlockSection');

/* Class definition */
/** @extends {Collection<BlockSection>} */
class BlockSectionsCollection extends Collection {
  constructor(props = {}) {
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

module.exports = BlockSectionsCollection;
