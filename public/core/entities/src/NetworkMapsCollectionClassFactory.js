const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const NetworkMapsCollectionClassFactory = ({ NetworkMap }) => {
  const childClasses = [NetworkMap];

  /** @extends {Collection<NetworkMap>} */
  class NetworkMapsCollection extends Collection {
    /**
     *
     * @param {Object} props
     * @param {string} props.label
     */
    constructor(props = {}) {
      super({
        itemName: 'NetworkMap',
        ItemConstructor: NetworkMap,
        idPropName: 'bimoId',
        businessIdPropName: 'businessId',
        labelPropName: 'label',
        associationType: 'aggregation',
        ...props,
      });
    }
  }

  NetworkMapsCollection.allChildClasses = getAllChildClasses(childClasses);
  NetworkMapsCollection.prototype.serializeModel = serializeThis;
  NetworkMapsCollection.parseModel = parseThis;

  return NetworkMapsCollection;
};

module.exports = NetworkMapsCollectionClassFactory;
