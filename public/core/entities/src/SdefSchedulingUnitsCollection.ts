const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const SdefSchedulingUnit = require('./SdefSchedulingUnit');

const childClasses = [SdefSchedulingUnit];

/** @extends {Collection<SdefSchedulingUnit>} */
class SdefSchedulingUnitsCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'SdefSchedulingUnit',
      ItemConstructor: SdefSchedulingUnit,
      // idPropName: 'sdscuIdentifier',
      businessIdPropName: 'sdscuIdentifier',
      labelPropName: 'sdscuIdentifier',
      ...props,
    });
  }
}

SdefSchedulingUnitsCollection.ItemConstructor = SdefSchedulingUnit;

SdefSchedulingUnitsCollection.allChildClasses = getAllChildClasses(childClasses);
SdefSchedulingUnitsCollection.prototype.serializeModel = serializeThis;
SdefSchedulingUnitsCollection.parseModel = parseThis;

module.exports = SdefSchedulingUnitsCollection;
