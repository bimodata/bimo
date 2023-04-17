/* Linked Classes */
const Route = require('./Route');

/* Serialization utilities dependencies */
const childClasses = [Route];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

/* Class definition */
/** @extends {Collection<Route>} */
class RoutesCollection extends Collection {
  constructor(props = {}) {
    super({ itemName: 'Route', ItemConstructor: Route, items: props.items, parent: props.parent, idPropName: `bimoId` });
  }
}

/* Serialization utilities */
RoutesCollection.allChildClasses = getAllChildClasses(childClasses);
RoutesCollection.prototype.serializeModel = serializeThis;
RoutesCollection.parseModel = parseThis;

module.exports = RoutesCollection;
