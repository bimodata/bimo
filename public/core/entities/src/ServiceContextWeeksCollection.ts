const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');

const { Collection } = require('@bimo/core-utils-collection');
const ServiceContextWeek = require('./ServiceContextWeek');

const childClasses = [ServiceContextWeek];

/** @extends {Collection<ServiceContextWeek>} */
class ServiceContextWeeksCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'ServiceContextWeek',
      businessIdPropName: 'scwkSchedUnitId',
      ItemConstructor: ServiceContextWeek,
      associationType: 'aggregation',
      ...props,
    });
  }
}

ServiceContextWeeksCollection.allChildClasses = getAllChildClasses(childClasses);
ServiceContextWeeksCollection.prototype.serializeModel = serializeThis;
ServiceContextWeeksCollection.parseModel = parseThis;

module.exports = ServiceContextWeeksCollection;
