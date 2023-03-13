const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');

const { Collection } = require('@bimo/core-utils-collection');

const ServiceContextParentsCollectionClassFactory = ({ ServiceContextParent }) => {
  const childClasses = [ServiceContextParent];

  /** @extends {Collection<ServiceContextParent>} */
  class ServiceContextParentsCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'ServiceContextParent',
        ItemConstructor: ServiceContextParent,
        associationType: 'aggregation',
        ...props,
      });
    }
  }

  ServiceContextParentsCollection.allChildClasses = getAllChildClasses(childClasses);
  ServiceContextParentsCollection.prototype.serializeModel = serializeThis;
  ServiceContextParentsCollection.parseModel = parseThis;

  return ServiceContextParentsCollection;
};

module.exports = ServiceContextParentsCollectionClassFactory;
