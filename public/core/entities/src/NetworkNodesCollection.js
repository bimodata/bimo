const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const NetworkNode = require('./NetworkNode');

const childClasses = [NetworkNode];

/** @extends {Collection<NetworkNode>} */
class NetworkNodesCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'NetworkNode',
      ItemConstructor: NetworkNode,
      idPropName: 'bimoId',
      businessIdPropName: 'businessId',
      labelPropName: 'businessId',
      associationType: 'composition',
      ...props,
    });
  }
}

NetworkNodesCollection.allChildClasses = getAllChildClasses(childClasses);
NetworkNodesCollection.prototype.serializeModel = serializeThis;
NetworkNodesCollection.parseModel = parseThis;

module.exports = NetworkNodesCollection;
