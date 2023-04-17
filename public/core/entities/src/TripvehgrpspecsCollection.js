/* Linked Classes */
const Tripvehgrpspec = require('./Tripvehgrpspec');

/* Serialization utilities dependencies */
const childClasses = [Tripvehgrpspec];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

/* Class definition */
/** @extends {Collection<Tripvehgrpspec>} */
class TripvehgrpspecsCollection extends Collection {
  constructor(props = {}) {
    super({ itemName: 'Tripvehgrpspec', ItemConstructor: Tripvehgrpspec, items: props.items, parent: props.parent });
  }
}

/* Serialization utilities */
TripvehgrpspecsCollection.allChildClasses = getAllChildClasses(childClasses);
TripvehgrpspecsCollection.prototype.serializeModel = serializeThis;
TripvehgrpspecsCollection.parseModel = parseThis;

module.exports = TripvehgrpspecsCollection;
