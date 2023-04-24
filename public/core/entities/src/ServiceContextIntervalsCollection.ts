const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');

const { Collection } = require('@bimo/core-utils-collection');
const ServiceContextInterval = require('./ServiceContextInterval');

const childClasses = [ServiceContextInterval];

/** @extends {Collection<ServiceContextInterval>} */
class ServiceContextIntervalsCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'ServiceContextInterval',
      ItemConstructor: ServiceContextInterval,
      associationType: 'aggregation',
      ...props,
    });
  }
}

ServiceContextIntervalsCollection.allChildClasses = getAllChildClasses(childClasses);
ServiceContextIntervalsCollection.prototype.serializeModel = serializeThis;
ServiceContextIntervalsCollection.parseModel = parseThis;

module.exports = ServiceContextIntervalsCollection;
