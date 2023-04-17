const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const ServiceEvolutionPeriod = require('./ServiceEvolutionPeriod');

const childClasses = [ServiceEvolutionPeriod];

/** @extends {Collection<ServiceEvolutionPeriod>} */
class ServiceEvolutionPeriodsCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'ServiceEvolutionPeriod',
      ItemConstructor: ServiceEvolutionPeriod,
      associationType: 'aggregation',
      ...props,
    });
  }
}

ServiceEvolutionPeriodsCollection.allChildClasses = getAllChildClasses(childClasses);
ServiceEvolutionPeriodsCollection.prototype.serializeModel = serializeThis;
ServiceEvolutionPeriodsCollection.parseModel = parseThis;

module.exports = ServiceEvolutionPeriodsCollection;
