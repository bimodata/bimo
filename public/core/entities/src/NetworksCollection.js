const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const Network = require('./Network');

const childClasses = [Network];

/** @extends {Collection<Network>} */
class NetworksCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'Network',
      ItemConstructor: Network,
      idPropName: 'bimoId',
      businessIdPropName: 'businessId',
      labelPropName: 'label',
      associationType: 'aggregation',
      ...props,
    });
  }
}

NetworksCollection.allChildClasses = getAllChildClasses(childClasses);
NetworksCollection.prototype.serializeModel = serializeThis;
NetworksCollection.parseModel = parseThis;

module.exports = NetworksCollection;
