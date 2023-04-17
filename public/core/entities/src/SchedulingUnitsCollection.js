const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const SchedulingUnit = require('./SchedulingUnit');

const childClasses = [SchedulingUnit];

/** @extends {Collection<SchedulingUnit>} */
class SchedulingUnitsCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'SchedulingUnit',
      ItemConstructor: SchedulingUnit,
      // idPropName: 'scuIdentifier',
      businessIdPropName: 'scuIdentifier',
      labelPropName: 'slo',
      ...props,
    });
  }
}

SchedulingUnitsCollection.ItemConstructor = SchedulingUnit;

SchedulingUnitsCollection.allChildClasses = getAllChildClasses(childClasses);
SchedulingUnitsCollection.prototype.serializeModel = serializeThis;
SchedulingUnitsCollection.parseModel = parseThis;

module.exports = SchedulingUnitsCollection;
