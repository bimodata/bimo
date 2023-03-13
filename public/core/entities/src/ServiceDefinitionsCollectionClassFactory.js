const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const ServiceDefinitionsCollectionClassFactory = ({ ServiceDefinition }) => {
  const childClasses = [ServiceDefinition];

  /** @extends {Collection<ServiceDefinition>} */
  class ServiceDefinitionsCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'ServiceDefinition',
        ItemConstructor: ServiceDefinition,
        // idPropName: 'sdefIdentifier',
        businessIdPropName: 'sdefIdentifier',
        labelPropName: 'sdefDescription',
        ...props,
      });
    }
  }

  ServiceDefinitionsCollection.ItemConstructor = ServiceDefinition;

  ServiceDefinitionsCollection.allChildClasses = getAllChildClasses(childClasses);
  ServiceDefinitionsCollection.prototype.serializeModel = serializeThis;
  ServiceDefinitionsCollection.parseModel = parseThis;

  return ServiceDefinitionsCollection;
};

module.exports = ServiceDefinitionsCollectionClassFactory;
