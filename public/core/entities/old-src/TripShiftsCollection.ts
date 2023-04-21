/* Linked Classes */
const TripShift = require('./TripShift');

/* Serialization utilities dependencies */
const childClasses = [TripShift];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

/* Class definition */
/** @extends {Collection<TripShift>} */
class TripShiftsCollection extends Collection {
  constructor(props = {}) {
    super({ itemName: 'TripShift', ItemConstructor: TripShift, items: props.items, parent: props.parent });
  }
}

/* Serialization utilities */
TripShiftsCollection.allChildClasses = getAllChildClasses(childClasses);
TripShiftsCollection.prototype.serializeModel = serializeThis;
TripShiftsCollection.parseModel = parseThis;

module.exports = TripShiftsCollection;
