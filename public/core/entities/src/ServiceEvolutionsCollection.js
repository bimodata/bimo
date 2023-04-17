const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');

const { Collection } = require('@bimo/core-utils-collection');
const ServiceEvolution = require('./ServiceEvolution');

const childClasses = [ServiceEvolution];

/** @extends {Collection<ServiceEvolution>} */
class ServiceEvolutionsCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'ServiceEvolution',
      ItemConstructor: ServiceEvolution,
      associationType: 'aggregation',
      ...props,
    });
  }
}

ServiceEvolutionsCollection.allChildClasses = getAllChildClasses(childClasses);
ServiceEvolutionsCollection.prototype.serializeModel = serializeThis;
ServiceEvolutionsCollection.parseModel = parseThis;

module.exports = ServiceEvolutionsCollection;
