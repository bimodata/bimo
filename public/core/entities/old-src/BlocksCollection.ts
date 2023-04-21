const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const Block = require('./Block');

const childClasses = [Block];

/* Class definition */
/** @extends {Collection<Block>} */
class BlocksCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'Block',
      ItemConstructor: Block,
      items: props.items,
      parent: props.parent,
      idPropName: `blkIntNumber`,
      labelPropName: `blkNumber`,
      associationType: props.associationType,
    });
  }
}

/* Serialization utilities */
BlocksCollection.allChildClasses = getAllChildClasses(childClasses);
BlocksCollection.prototype.serializeModel = serializeThis;
BlocksCollection.parseModel = parseThis;

module.exports = BlocksCollection;
