/* Linked Classes */
const NetworkEvent = require('./NetworkEvent');

/* Serialization utilities dependencies */
const childClasses = [NetworkEvent];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

/* Class definition */
/** @extends {Collection<NetworkEvent>} */
class NetworkEventsCollection extends Collection {
  constructor(props = {}) {
    super({ itemName: 'NetworkEvent', ItemConstructor: NetworkEvent, items: props.items, parent: props.parent });
  }
}

/* Serialization utilities */
NetworkEventsCollection.allChildClasses = getAllChildClasses(childClasses);
NetworkEventsCollection.prototype.serializeModel = serializeThis;
NetworkEventsCollection.parseModel = parseThis;

module.exports = NetworkEventsCollection;
