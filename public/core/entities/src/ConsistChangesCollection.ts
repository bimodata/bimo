const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const ConsistChange = require('./ConsistChange');

const childClasses = [ConsistChange];

/** @extends {Collection<ConsistChange>} */
class ConsistChangesCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'ConsistChange',
      ItemConstructor: ConsistChange,
      idPropName: `cchgInternalNumber`,
      businessIdPropName: `cchgInternalNumber`,
      labelPropName: ``,
      ...props,
    });
  }
}

ConsistChangesCollection.allChildClasses = getAllChildClasses(childClasses);
ConsistChangesCollection.prototype.serializeModel = serializeThis;
ConsistChangesCollection.parseModel = parseThis;

module.exports = ConsistChangesCollection;
