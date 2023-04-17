/* Linked Classes */
const TripTp = require('./TripTp');

/* Serialization utilities dependencies */
const childClasses = [TripTp];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

/* Class definition */
/** @extends {Collection<TripTp>} */
class TripTpsCollection extends Collection {
  constructor(props = {}) {
    super({ itemName: 'TripTp', ItemConstructor: TripTp, items: props.items, parent: props.parent });
  }
}

/* Serialization utilities */
TripTpsCollection.allChildClasses = getAllChildClasses(childClasses);
TripTpsCollection.prototype.serializeModel = serializeThis;
TripTpsCollection.parseModel = parseThis;

module.exports = TripTpsCollection;
