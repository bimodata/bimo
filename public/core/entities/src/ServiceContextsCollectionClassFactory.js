const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');

const { Collection } = require('@bimo/core-utils-collection');

const ServiceContextsCollectionClassFactory = ({ ServiceContext }) => {
  const childClasses = [ServiceContext];

  /** @extends {Collection<ServiceContext>} */
  class ServiceContextsCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'ServiceContext',
        ItemConstructor: ServiceContext,
        associationType: 'aggregation',
        ...props,
      });
    }
  }

  ServiceContextsCollection.allChildClasses = getAllChildClasses(childClasses);
  ServiceContextsCollection.prototype.serializeModel = serializeThis;
  ServiceContextsCollection.parseModel = parseThis;

  return ServiceContextsCollection;
};

module.exports = ServiceContextsCollectionClassFactory;
