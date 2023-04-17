const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');

const { Collection } = require('@bimo/core-utils-collection');
const ServiceContextDay = require('./ServiceContextDay');

const childClasses = [ServiceContextDay];

/** @extends {Collection<ServiceContextDay>} */
class ServiceContextDaysCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'ServiceContextDay',
      ItemConstructor: ServiceContextDay,
      associationType: 'aggregation',
      ...props,
    });
  }
}

ServiceContextDaysCollection.allChildClasses = getAllChildClasses(childClasses);
ServiceContextDaysCollection.prototype.serializeModel = serializeThis;
ServiceContextDaysCollection.parseModel = parseThis;

module.exports = ServiceContextDaysCollection;
