const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const NetworkEdgesCollectionClassFactory = ({ NetworkEdge }) => {
  const childClasses = [NetworkEdge];

  /** @extends {Collection<NetworkEdge>} */
  class NetworkEdgesCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'NetworkEdge',
        ItemConstructor: NetworkEdge,
        idPropName: 'bimoId',
        businessIdPropName: 'businessId',
        labelPropName: 'businessId',
        associationType: 'composition',
        ...props,
      });
    }
  }

  NetworkEdgesCollection.allChildClasses = getAllChildClasses(childClasses);
  NetworkEdgesCollection.prototype.serializeModel = serializeThis;
  NetworkEdgesCollection.parseModel = parseThis;

  return NetworkEdgesCollection;
};

module.exports = NetworkEdgesCollectionClassFactory;
